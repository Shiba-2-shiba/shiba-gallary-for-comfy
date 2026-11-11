"""Operation-count and controlled-contention regressions, not network SLAs."""
import asyncio
import os
import threading
from concurrent.futures import ThreadPoolExecutor

import pytest
from aiohttp import web
from aiohttp.test_utils import TestClient, TestServer
from PIL import Image

from gallery_backend.routes import GalleryAPI
from gallery_backend.store import GalleryStore


def make_images(root, count):
    image = root / '000.png'
    Image.new('RGB', (64, 32), 'red').save(image)
    content = image.read_bytes()
    for index in range(count):
        path = root / f'{index:03d}.png'
        path.write_bytes(content)
        stamp = (index + 1) * 1_000_000
        os.utime(path, ns=(stamp, stamp))


class MeasuredStore(GalleryStore):
    image_opens = 0
    header_reads = 0

    def _open_path(self, relative, **kwargs):
        if not kwargs.get('directory'):
            self.image_opens += 1
        return super()._open_path(relative, **kwargs)

    def _dimensions(self, *args):
        self.header_reads += 1
        return super()._dimensions(*args)


def test_first_page_reads_only_requested_headers_and_cursor_reads_next_page(tmp_path):
    make_images(tmp_path, 50)
    with MeasuredStore(tmp_path, scan_interval=0) as store:
        folder = store.list_folders()['folders'][0]['id']
        page = store.list_images(folder, limit=5)
        assert len(page['images']) == 5 and store.header_reads == 5
        assert [row['name'] for row in page['images']] == ['049.png', '048.png', '047.png', '046.png', '045.png']
        next_page = store.list_images(folder, cursor=page['next_cursor'], limit=5)
        assert len(next_page['images']) == 5 and store.header_reads == 10
        assert next_page['images'][0]['width'] == 64


@pytest.mark.skipif(os.name == 'nt', reason='Windows retains native per-file ChangeTime checks')
def test_unchanged_posix_refresh_does_not_reopen_images(tmp_path):
    make_images(tmp_path, 50)
    with MeasuredStore(tmp_path, scan_interval=0) as store:
        folder = store.list_folders()['folders'][0]['id']
        store.list_images(folder, limit=5)
        store.image_opens = store.header_reads = 0
        page = store.list_images(folder, limit=5)
        assert len(page['images']) == 5
        assert store.image_opens == store.header_reads == 0


def test_pending_image_does_not_short_page_or_break_cursor(tmp_path):
    make_images(tmp_path, 8)
    path = tmp_path / '007.png'
    path.write_bytes(path.read_bytes()[:-12])
    with GalleryStore(tmp_path, scan_interval=0) as store:
        folder = store.list_folders()['folders'][0]['id']
        first = store.list_images(folder, limit=3)
        second = store.list_images(folder, limit=3, cursor=first['next_cursor'])
        third = store.list_images(folder, limit=3, cursor=second['next_cursor'])
        names = [row['name'] for page in (first, second, third) for row in page['images']]
        assert names == ['006.png', '005.png', '004.png', '003.png', '002.png', '001.png', '000.png']
        assert len(first['images']) == len(second['images']) == 3
        assert third['next_cursor'] is None


def test_unchanged_poll_renews_original_continuation_cursor(tmp_path, monkeypatch):
    make_images(tmp_path, 5)
    with GalleryStore(tmp_path, scan_interval=0, snapshot_ttl=10, max_snapshots=2) as store:
        folder = store.list_folders()['folders'][0]['id']
        now = [1.0]
        monkeypatch.setattr('gallery_backend.store.time.monotonic', lambda: now[0])
        first = store.list_images(folder, limit=2)
        for tick in (5.0, 9.0, 13.0, 17.0):
            now[0] = tick
            refresh = store.list_images(folder, limit=2)
            assert refresh['next_cursor'] == first['next_cursor']
        continued = store.list_images(folder, cursor=first['next_cursor'], limit=2)
        assert [row['name'] for row in continued['images']] == ['002.png', '001.png']


def test_original_lookup_does_not_wait_for_directory_scan(tmp_path):
    make_images(tmp_path, 5)
    with GalleryStore(tmp_path, scan_interval=0) as store:
        folder = store.list_folders()['folders'][0]['id']
        row = store.list_images(folder)['images'][0]
        started, release = threading.Event(), threading.Event()
        dimensions = store._dimensions

        def delayed_header(*args):
            started.set()
            assert release.wait(2)
            return dimensions(*args)

        Image.new('RGB', (64, 32), 'blue').save(tmp_path / 'new.png')
        store._dimensions = delayed_header
        with ThreadPoolExecutor(max_workers=2) as pool:
            scanning = pool.submit(store.list_images, folder)
            assert started.wait(1)
            opening = pool.submit(store.open_original, row['id'], row['revision'])
            try:
                source, *_ = opening.result(timeout=0.3)
                source.close()
            finally:
                release.set()
                scanning.result(timeout=2)


def test_original_stream_bypasses_occupied_thumbnail_workers(tmp_path):
    make_images(tmp_path, 1)

    async def exercise():
        store = GalleryStore(tmp_path)
        folder = store.list_folders()['folders'][0]['id']
        row = store.list_images(folder)['images'][0]
        api = GalleryAPI(store)
        routes = web.RouteTableDef()
        api.register(routes)
        app = web.Application()
        app.add_routes(routes)
        app.on_cleanup.append(api.close)
        release = threading.Event()
        started = [threading.Event(), threading.Event()]

        def occupied(index):
            started[index].set()
            assert release.wait(2)

        async with TestClient(TestServer(app)) as client:
            tasks = [asyncio.create_task(api.run(occupied, index)) for index in range(2)]
            while not all(event.is_set() for event in started):
                await asyncio.sleep(0.001)
            try:
                async def fetch():
                    response = await client.get(f"/shiba-gallery/image/{row['id']}/original")
                    assert response.status == 200
                    return await response.read()
                data = await asyncio.wait_for(fetch(), timeout=0.3)
                assert data == (tmp_path / '000.png').read_bytes()
            finally:
                release.set()
                await asyncio.gather(*tasks)
    asyncio.run(exercise())


def test_original_stream_batches_reads_without_changing_bytes(tmp_path):
    path = tmp_path / 'image.png'
    Image.frombytes('RGB', (1024, 1024), os.urandom(3 * 1024 * 1024)).save(path)

    async def exercise():
        store = GalleryStore(tmp_path)
        folder = store.list_folders()['folders'][0]['id']
        row = store.list_images(folder)['images'][0]
        api = GalleryAPI(store)
        read = api._read_original_chunk
        dispatches = []
        def measured(*args):
            dispatches.append(1)
            return read(*args)
        api._read_original_chunk = measured
        routes = web.RouteTableDef()
        api.register(routes)
        app = web.Application()
        app.add_routes(routes)
        app.on_cleanup.append(api.close)
        async with TestClient(TestServer(app)) as client:
            response = await client.get(f"/shiba-gallery/image/{row['id']}/original")
            assert await response.read() == path.read_bytes()
            assert len(dispatches) <= 6
    asyncio.run(exercise())


def test_same_version_poll_restores_expired_cursor_identity(tmp_path, monkeypatch):
    make_images(tmp_path, 5)
    with GalleryStore(tmp_path, scan_interval=0, snapshot_ttl=10) as store:
        folder = store.list_folders()['folders'][0]['id']
        now = [1.0]
        monkeypatch.setattr('gallery_backend.store.time.monotonic', lambda: now[0])
        first = store.list_images(folder, limit=2)
        now[0] = 20.0
        refreshed = store.list_images(folder, limit=2)
        assert refreshed['next_cursor'] == first['next_cursor']
        continued = store.list_images(folder, cursor=first['next_cursor'], limit=2)
        assert continued['images'][0]['name'] == '002.png'


def test_same_version_poll_restores_evicted_cursor_identity(tmp_path):
    for name in ('a', 'b', 'c'):
        child = tmp_path / name
        child.mkdir()
        make_images(child, 5)
    with GalleryStore(tmp_path, scan_interval=0, max_snapshots=2) as store:
        folders = {folder['name']: folder['id'] for folder in store.list_folders()['folders']}
        first = store.list_images(folders['a'], limit=2)
        store.list_images(folders['b'], limit=2)
        store.list_images(folders['c'], limit=2)
        refreshed = store.list_images(folders['a'], limit=2)
        assert refreshed['next_cursor'] == first['next_cursor']
        continued = store.list_images(folders['a'], cursor=first['next_cursor'], limit=2)
        assert continued['images'][0]['name'] == '002.png'


def test_cached_metadata_parsing_does_not_hold_original_lookup_lock(tmp_path, monkeypatch):
    from PIL import PngImagePlugin
    from gallery_backend import store as store_module
    info = PngImagePlugin.PngInfo()
    info.add_text('prompt', '{"1":{"class_type":"KSampler","inputs":{"steps":20}}}')
    Image.new('RGB', (64, 32)).save(tmp_path / 'meta.png', pnginfo=info)
    with GalleryStore(tmp_path) as store:
        folder = store.list_folders()['folders'][0]['id']
        row = store.list_images(folder)['images'][0]
        store.metadata(row['id'])
        started, release = threading.Event(), threading.Event()
        loads = store_module.json.loads
        def delayed_loads(value, *args, **kwargs):
            started.set()
            assert release.wait(2)
            return loads(value, *args, **kwargs)
        monkeypatch.setattr(store_module.json, 'loads', delayed_loads)
        with ThreadPoolExecutor(max_workers=2) as pool:
            parsing = pool.submit(store.metadata, row['id'])
            assert started.wait(1)
            opening = pool.submit(store.open_original, row['id'], row['revision'])
            try:
                source, *_ = opening.result(timeout=0.3)
                source.close()
            finally:
                release.set()
                parsing.result(timeout=2)
