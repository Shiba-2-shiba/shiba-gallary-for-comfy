"""aiohttp routes shared by ComfyUI and the local synthetic test harness."""
from __future__ import annotations

import asyncio
import functools
from concurrent.futures import ThreadPoolExecutor

from aiohttp import web
from urllib.parse import quote

from .store import GalleryError, GalleryStore

PREFIX = '/shiba-gallery'


class GalleryAPI:
    def __init__(self, store: GalleryStore, *, workers=2, original_workers=2, timeout=15.0, queue_timeout=3.0):
        self.store = store
        self._pool = ThreadPoolExecutor(max_workers=workers, thread_name_prefix='shiba-gallery')
        self._slots = asyncio.Semaphore(workers)
        # Image selection must not queue behind thumbnail decoding or catalog
        # refreshes. Keep its file I/O separately bounded, not unbounded.
        self._original_pool = ThreadPoolExecutor(max_workers=original_workers, thread_name_prefix='shiba-gallery-original')
        self._original_slots = asyncio.Semaphore(original_workers)
        self._timeout, self._queue_timeout = timeout, queue_timeout
        self._closed = False
        self._resource_work = {}
        self._pending_closes = set()
        self._cleanups = set()

    def _schedule_cleanup(self, function, *args):
        future = asyncio.get_running_loop().run_in_executor(None, functools.partial(function, *args))
        self._cleanups.add(future)
        def finished(done):
            self._cleanups.discard(done)
            if not done.cancelled():
                done.exception()
        future.add_done_callback(finished)

    async def close_resource(self, source):
        pending = self._resource_work.get(source)
        if pending is not None and not pending.done():
            self._pending_closes.add(source)
        else:
            await asyncio.to_thread(source.close)

    async def run(self, function, *args, _discard_result=None, _resource=None, _original=False, **kwargs):
        """Keep worker count AND submitted work bounded, even after timeouts.

        Python cannot kill an executing thread. A timed-out operation retains
        its slot until it really finishes, so retries cannot create an
        unbounded background queue or bypass the CPU/concurrency limit.
        """
        if self._closed:
            raise GalleryError(503, 'unavailable', 'The gallery is shutting down')
        slots = self._original_slots if _original else self._slots
        pool = self._original_pool if _original else self._pool
        try:
            await asyncio.wait_for(slots.acquire(), timeout=self._queue_timeout)
        except asyncio.TimeoutError:
            raise GalleryError(503, 'busy', 'The gallery is busy; try again shortly') from None
        loop = asyncio.get_running_loop()
        try:
            future = loop.run_in_executor(pool, functools.partial(function, *args, **kwargs))
        except BaseException:
            slots.release()
            raise
        abandoned, cleaned = False, False
        if _resource is not None:
            self._resource_work[_resource] = future

        def discard_if_needed(done):
            nonlocal cleaned
            if abandoned and _discard_result is not None and not cleaned and done.done() and not done.cancelled():
                if done.exception() is None:
                    cleaned = True
                    self._schedule_cleanup(_discard_result, done.result())

        def finished(done):
            slots.release()
            if not done.cancelled():
                done.exception()  # Consume late failures after HTTP cancellation.
            if _resource is not None:
                self._resource_work.pop(_resource, None)
                if _resource in self._pending_closes:
                    self._pending_closes.remove(_resource)
                    self._schedule_cleanup(_resource.close)
            discard_if_needed(done)

        future.add_done_callback(finished)
        try:
            return await asyncio.wait_for(asyncio.shield(future), timeout=self._timeout)
        except (asyncio.TimeoutError, asyncio.CancelledError) as error:
            abandoned = True
            discard_if_needed(future)
            if isinstance(error, asyncio.CancelledError):
                raise
            raise GalleryError(503, 'timeout', 'The gallery operation took too long; try again shortly') from None

    async def close(self, _app=None):
        if self._closed:
            return
        self._closed = True
        await asyncio.gather(
            asyncio.to_thread(self._pool.shutdown, wait=True, cancel_futures=True),
            asyncio.to_thread(self._original_pool.shutdown, wait=True, cancel_futures=True),
        )
        if self._cleanups:
            await asyncio.gather(*self._cleanups, return_exceptions=True)
        await asyncio.to_thread(self.store.close)

    @staticmethod
    def _error(error):
        headers = {'Cache-Control': 'no-store'}
        if error.status in (425, 503):
            headers['Retry-After'] = '3'
        return web.json_response({'error': {'code': error.code, 'message': str(error)}}, status=error.status, headers=headers)

    @staticmethod
    def _integer(request, name, default):
        try:
            return int(request.query.get(name, str(default)))
        except (ValueError, TypeError):
            raise GalleryError(400, 'invalid_' + name, name.capitalize() + ' must be an integer') from None

    @staticmethod
    def _image_headers(revision, requested, *, variant=''):
        return {'ETag': '"' + revision + variant + '"',
                'Cache-Control': 'private, max-age=31536000, immutable' if requested else 'no-cache',
                'X-Content-Type-Options': 'nosniff'}

    @staticmethod
    def _not_modified(request, headers):
        candidates = [value.strip() for value in request.headers.get('If-None-Match', '').split(',')]
        return headers['ETag'] in candidates or '*' in candidates

    async def bootstrap(self, request):
        try:
            result = await self.run(self.store.bootstrap, request.query.get('folder_id'),
                                    limit=self._integer(request, 'limit', 60))
            return web.json_response(result, headers={'Cache-Control': 'no-store'})
        except GalleryError as error:
            return self._error(error)

    async def folders(self, request):
        try:
            result = await self.run(self.store.list_folders)
            return web.json_response(result, headers={'Cache-Control': 'no-store'})
        except GalleryError as error:
            return self._error(error)

    async def images(self, request):
        try:
            folder = request.query.get('folder_id')
            if not folder:
                raise GalleryError(400, 'missing_folder', 'Choose an output folder')
            result = await self.run(self.store.list_images, folder,
                                    cursor=request.query.get('cursor'), limit=self._integer(request, 'limit', 100))
            return web.json_response(result, headers={'Cache-Control': 'no-store'})
        except GalleryError as error:
            return self._error(error)

    async def thumbnail(self, request):
        try:
            size = self._integer(request, 'size', 256)
            revision = request.query.get('revision')
            data, current = await self.run(self.store.thumbnail, request.match_info['image_id'], size, revision)
            headers = self._image_headers(current, revision, variant=f'-thumbnail-{size}')
            if self._not_modified(request, headers):
                return web.Response(status=304, headers=headers)
            return web.Response(body=data, content_type='image/webp', headers=headers)
        except GalleryError as error:
            return self._error(error)

    async def display(self, request):
        try:
            revision = request.query.get('revision')
            data, current = await self.run(self.store.display, request.match_info['image_id'], revision)
            headers = self._image_headers(current, revision, variant='-display-1024-q95-icc-v1')
            if self._not_modified(request, headers):
                return web.Response(status=304, headers=headers)
            return web.Response(body=data, content_type='image/webp', headers=headers)
        except GalleryError as error:
            return self._error(error)

    async def metadata(self, request):
        try:
            result = await self.run(self.store.metadata, request.match_info['image_id'], request.query.get('revision'))
            return web.json_response(result, headers={'Cache-Control': 'no-store'})
        except GalleryError as error:
            return self._error(error)

    def _read_original_chunk(self, source, revision):
        self.store._check_unchanged(source, revision)
        chunk = source.read(1024 * 1024)
        self.store._check_unchanged(source, revision)
        return chunk

    async def original(self, request):
        return await self._stream_original(request)

    async def download(self, request):
        return await self._stream_original(request, download=True)

    async def _stream_original(self, request, *, download=False):
        source = None
        response = None
        try:
            revision = request.query.get('revision')
            source, current, mime, length = await self.run(self.store.open_original, request.match_info['image_id'], revision,
                                                        _discard_result=lambda result: result[0].close(), _original=True)
            headers = self._image_headers(current, revision)
            if download:
                filename = self.store.download_name(request.match_info['image_id'])
                # RFC 5987 avoids percent-encoded Japanese filenames being used
                # literally. No filesystem path or unescaped control enters a
                # response header; older clients receive a safe fallback name.
                suffix = filename.rsplit('.', 1)[-1].lower()
                headers['Content-Disposition'] = (
                    f'attachment; filename="image.{suffix}"; '
                    f"filename*=UTF-8''{quote(filename, safe='', errors='replace')}"
                )
            if self._not_modified(request, headers):
                return web.Response(status=304, headers=headers)
            headers['Content-Type'], headers['Content-Length'] = mime, str(length)
            response = web.StreamResponse(headers=headers)
            await response.prepare(request)
            if request.method != 'HEAD':
                while True:
                    data = await self.run(self._read_original_chunk, source, current, _resource=source, _original=True)
                    if not data:
                        break
                    await response.write(data)
            await response.write_eof()
            return response
        except GalleryError as error:
            if response is not None and response.prepared:
                # In-place writes after headers must never produce a successful,
                # cacheable mixed-version body. An interrupted stream is retried
                # by an explicit client action with a refreshed revision.
                if request.transport is not None:
                    request.transport.close()
                return response
            return self._error(error)
        finally:
            if source is not None:
                await self.close_resource(source)

    def register(self, routes):
        routes.get(PREFIX + '/bootstrap')(self.bootstrap)
        routes.get(PREFIX + '/folders')(self.folders)
        routes.get(PREFIX + '/images')(self.images)
        routes.get(PREFIX + '/image/{image_id}/thumbnail')(self.thumbnail)
        routes.get(PREFIX + '/image/{image_id}/display')(self.display)
        routes.get(PREFIX + '/image/{image_id}/download')(self.download)
        routes.get(PREFIX + '/image/{image_id}/original')(self.original)
        routes.get(PREFIX + '/image/{image_id}/metadata')(self.metadata)
        return self


def register_routes(routes, output_root, **store_options):
    return GalleryAPI(GalleryStore(output_root, **store_options)).register(routes)


def create_app(output_root, **store_options):
    """Small standalone API app, also used by tests and synthetic UI demos."""
    app = web.Application()
    routes = web.RouteTableDef()
    api = register_routes(routes, output_root, **store_options)
    app.add_routes(routes)
    app.on_cleanup.append(api.close)
    return app
