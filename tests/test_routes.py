import asyncio
import io
import threading
import time

from aiohttp.test_utils import TestClient, TestServer
from PIL import Image

from gallery_backend.routes import GalleryAPI, create_app
from gallery_backend.store import GalleryError, GalleryStore


def test_http_contract_cache_headers_and_read_only_methods(tmp_path):
    Image.new('RGB', (800, 400), 'red').save(tmp_path / 'test.png')

    async def exercise():
        async with TestClient(TestServer(create_app(tmp_path, scan_interval=0))) as client:
            folders = await (await client.get('/shiba-gallery/folders')).json()
            folder = folders['folders'][0]['id']
            response = await client.get('/shiba-gallery/images', params={'folder_id': folder})
            assert response.status == 200
            listing = await response.json()
            row = listing['images'][0]
            assert set(row) == {'id', 'folder_id', 'name', 'revision', 'mtime_ns', 'width', 'height'}
            assert response.headers['Cache-Control'] == 'no-store'
            base = f"/shiba-gallery/image/{row['id']}"
            thumbnail = await client.get(base + '/thumbnail', params={'size': 256, 'revision': row['revision']})
            assert thumbnail.status == 200
            assert thumbnail.headers['Content-Type'] == 'image/webp'
            assert 'immutable' in thumbnail.headers['Cache-Control']
            with Image.open(io.BytesIO(await thumbnail.read())) as image:
                assert image.size == (256, 128)
            cached = await client.get(base + '/thumbnail', params={'size': 256, 'revision': row['revision']},
                                      headers={'If-None-Match': thumbnail.headers['ETag']})
            assert cached.status == 304 and await cached.read() == b''
            original = await client.get(base + '/original', params={'revision': row['revision']})
            assert original.status == 200 and await original.read() == (tmp_path / 'test.png').read_bytes()
            assert original.headers['X-Content-Type-Options'] == 'nosniff'
            metadata = await client.get(base + '/metadata')
            assert (await metadata.json())['status'] == 'absent'
            assert (await client.delete(base + '/original')).status == 405
            assert (await client.post('/shiba-gallery/images')).status == 405
    asyncio.run(exercise())


def test_http_errors_are_explicit_and_do_not_reveal_absolute_paths(tmp_path):
    Image.new('RGB', (32, 32)).save(tmp_path / 'test.png')

    async def exercise():
        async with TestClient(TestServer(create_app(tmp_path, scan_interval=0))) as client:
            folder = (await (await client.get('/shiba-gallery/folders')).json())['folders'][0]['id']
            row = (await (await client.get('/shiba-gallery/images', params={'folder_id': folder})).json())['images'][0]
            bad_requests = [
                ('/shiba-gallery/images', {}, 400),
                ('/shiba-gallery/images', {'folder_id': '../'}, 404),
                ('/shiba-gallery/images', {'folder_id': folder, 'limit': 'wat'}, 400),
                ('/shiba-gallery/images', {'folder_id': folder, 'limit': '201'}, 400),
                ('/shiba-gallery/images', {'folder_id': folder, 'cursor': 'invalid'}, 400),
                (f"/shiba-gallery/image/{row['id']}/thumbnail", {'size': 'huge'}, 400),
                (f"/shiba-gallery/image/{row['id']}/original", {'revision': 'stale'}, 409),
                ('/shiba-gallery/image/unknown/original', {}, 404),
            ]
            for path, params, status in bad_requests:
                response = await client.get(path, params=params)
                assert response.status == status
                body = await response.json()
                assert 'error' in body
                assert str(tmp_path) not in str(body)
    asyncio.run(exercise())


def test_blocking_work_is_offloaded_and_concurrency_is_bounded(tmp_path):
    async def exercise():
        store = GalleryStore(tmp_path)
        api = GalleryAPI(store, workers=2)
        running, peak = 0, 0
        guard = threading.Lock()
        event_loop_thread = threading.get_ident()
        worker_threads = set()

        def slow_work():
            nonlocal running, peak
            with guard:
                running += 1
                peak = max(peak, running)
                worker_threads.add(threading.get_ident())
            time.sleep(0.04)
            with guard:
                running -= 1
            return 'done'

        try:
            results = await asyncio.gather(*(api.run(slow_work) for _ in range(8)))
            assert results == ['done'] * 8
            assert peak == 2 and event_loop_thread not in worker_threads
        finally:
            await api.close()
    asyncio.run(exercise())


def test_timed_out_work_keeps_its_slot_until_complete_and_closes_late_resources(tmp_path):
    async def exercise():
        api = GalleryAPI(GalleryStore(tmp_path), workers=1, timeout=0.01, queue_timeout=0.01)
        opened = []
        (tmp_path / 'file.txt').write_text('test')

        def delayed_open():
            time.sleep(0.1)
            source = (tmp_path / 'file.txt').open('rb')
            opened.append(source)
            return source

        try:
            try:
                await api.run(delayed_open, _discard_result=lambda source: source.close())
            except GalleryError as error:
                assert error.code == 'timeout'
            else:
                assert False, 'Expected timeout'
            try:
                await api.run(lambda: None)
            except GalleryError as error:
                assert error.code == 'busy'
            else:
                assert False, 'A timed-out worker must still consume its slot'
            await asyncio.sleep(0.15)
            assert len(opened) == 1 and opened[0].closed
        finally:
            await api.close()
    asyncio.run(exercise())


def test_resource_close_is_deferred_until_timed_out_read_finishes(tmp_path):
    async def exercise():
        api = GalleryAPI(GalleryStore(tmp_path), workers=1, timeout=0.01)
        events = []

        class Reader:
            def read(self):
                time.sleep(0.1)
                events.append('read-finished')
                return b'bytes'

            def close(self):
                events.append('closed')

        source = Reader()
        try:
            try:
                await api.run(source.read, _resource=source)
            except GalleryError:
                pass
            await api.close_resource(source)
            assert events == []
            await asyncio.sleep(0.15)
            assert events == ['read-finished', 'closed']
        finally:
            await api.close()
    asyncio.run(exercise())
