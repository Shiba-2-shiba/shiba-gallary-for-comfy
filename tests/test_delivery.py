"""Read-only bootstrap, display derivative and source-download contracts."""
import asyncio
import io
import os

import pytest
from aiohttp.test_utils import TestClient, TestServer
from PIL import Image, ImageCms, PngImagePlugin

from gallery_backend.routes import create_app
from gallery_backend.store import GalleryError, GalleryStore


def save_png(path, size=(1280, 640), mode='RGB', color='red', **kwargs):
    path.parent.mkdir(parents=True, exist_ok=True)
    Image.new(mode, size, color).save(path, **kwargs)
    return path


def test_bootstrap_returns_first_page_without_recursive_folder_scan(tmp_path, monkeypatch):
    save_png(tmp_path / 'a.png')
    save_png(tmp_path / 'nested' / 'b.png')
    with GalleryStore(tmp_path, scan_interval=0) as store:
        monkeypatch.setattr(store, 'list_folders', lambda: pytest.fail('bootstrap must not scan all folders'))
        result = store.bootstrap(limit=1)
        assert result['folder'] == {'id': store._id('f_', ''), 'name': 'output'}
        assert [x['name'] for x in result['page']['images']] == ['a.png']
        assert result['page']['next_cursor'] is None
        assert store.bootstrap('stale')['folder'] == result['folder']


def test_bootstrap_restores_known_folder_and_falls_back_after_deletion(tmp_path):
    save_png(tmp_path / 'a.png')
    child = save_png(tmp_path / 'nested' / 'b.png')
    with GalleryStore(tmp_path, scan_interval=999) as store:
        folder = next(f for f in store.list_folders()['folders'] if f['name'] == 'nested')
        result = store.bootstrap(folder['id'])
        assert result['folder'] == folder
        assert result['page']['images'][0]['name'] == 'b.png'
        child_id = result['page']['images'][0]['id']
        child.unlink()
        child.parent.rmdir()
        result = store.bootstrap(folder['id'])
        assert result['folder']['name'] == 'output'
        assert result['page']['images'][0]['name'] == 'a.png'
        assert child_id not in store._records


@pytest.mark.parametrize('size, expected', [((1280, 640), (1024, 512)), ((64, 96), (64, 96)), ((832, 1248), (683, 1024))])
def test_display_is_high_quality_webp_without_upscaling_or_source_modification(tmp_path, size, expected):
    path = save_png(tmp_path / 'a.png', size=size)
    original = path.read_bytes()
    with GalleryStore(tmp_path, scan_interval=0) as store:
        row = store.bootstrap()['page']['images'][0]
        data, revision = store.display(row['id'], row['revision'])
        assert revision == row['revision']
        with Image.open(io.BytesIO(data)) as result:
            assert result.format == 'WEBP' and result.size == expected
            r, g, b = result.convert('RGB').getpixel((0, 0))
            assert r > 245 and g < 10 and b < 10
        assert path.read_bytes() == original
        assert store.display(row['id'], row['revision'])[0] == data
        with pytest.raises(GalleryError) as error:
            store.display(row['id'], 'stale')
        assert error.value.status == 409


def test_display_preserves_alpha_profile_and_applies_orientation(tmp_path):
    profile = ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes()
    exif = Image.Exif()
    exif[274] = 6
    path = save_png(tmp_path / 'alpha.png', size=(80, 40), mode='RGBA', color=(20, 80, 180, 73),
                    exif=exif, icc_profile=profile)
    with GalleryStore(tmp_path) as store:
        row = store.bootstrap()['page']['images'][0]
        data, _ = store.display(row['id'])
        with Image.open(io.BytesIO(data)) as result:
            assert result.size == (40, 80)
            assert result.mode == 'RGBA'
            assert result.getpixel((0, 0))[3] == 73
            assert result.info['icc_profile'] == profile
            assert result.getexif().get(274, 1) == 1


def test_display_cache_is_bounded_and_invalidates_after_overwrite(tmp_path):
    path = save_png(tmp_path / 'a.png')
    with GalleryStore(tmp_path, scan_interval=0, cache_bytes=1024) as store:
        row = store.bootstrap()['page']['images'][0]
        old, _ = store.display(row['id'])
        save_png(path, color='blue')
        row2 = store.bootstrap()['page']['images'][0]
        new, _ = store.display(row2['id'])
        assert new != old
        assert store._thumbnail_bytes <= 1024


def test_display_pixel_safety_limit_remains_enforced(tmp_path):
    save_png(tmp_path / 'a.png', size=(100, 100))
    with GalleryStore(tmp_path, max_pixels=9999) as store:
        row = store.bootstrap()['page']['images'][0]
        with pytest.raises(GalleryError) as error:
            store.display(row['id'])
        assert error.value.status == 413


def test_delivery_http_bootstrap_display_download_and_revision(tmp_path):
    info = PngImagePlugin.PngInfo()
    info.add_text('prompt', '{"preserved":true}')
    path = save_png(tmp_path / '画像 original.png', pnginfo=info)
    original = path.read_bytes()

    async def exercise():
        async with TestClient(TestServer(create_app(tmp_path, scan_interval=0))) as client:
            initial = await client.get('/shiba-gallery/bootstrap', params={'limit': 60})
            assert initial.status == 200
            assert initial.headers['Cache-Control'] == 'no-store'
            body = await initial.json()
            row = body['page']['images'][0]
            base = '/shiba-gallery/image/' + row['id']
            display = await client.get(base + '/display', params={'revision': row['revision']})
            assert display.status == 200 and display.headers['Content-Type'] == 'image/webp'
            assert 'immutable' in display.headers['Cache-Control']
            assert display.headers['ETag'] != '"' + row['revision'] + '"'
            cached = await client.get(base + '/display', params={'revision': row['revision']},
                                      headers={'If-None-Match': display.headers['ETag']})
            assert cached.status == 304
            download = await client.get(base + '/download', params={'revision': row['revision']})
            assert download.status == 200 and download.headers['Content-Type'] == 'image/png'
            assert download.headers['Content-Disposition'].startswith('attachment;')
            assert download.content_disposition.filename == path.name
            assert '.png' in download.headers['Content-Disposition']
            assert await download.read() == original
            assert (await client.get(base + '/download', params={'revision': 'stale'})).status == 409
            assert (await client.get('/shiba-gallery/bootstrap', params={'limit': 'no'})).status == 400
            assert (await client.get('/shiba-gallery/bootstrap', params={'limit': 201})).status == 400
            assert (await client.delete(base + '/display')).status == 405
            assert (await client.get('/shiba-gallery/image/unknown/download')).status == 404
    asyncio.run(exercise())


def test_bootstrap_never_follows_replaced_folder_symlink(tmp_path):
    output = tmp_path / 'output'
    target = output / 'nested'
    save_png(target / 'visible.png')
    external = tmp_path / 'external'
    save_png(external / 'private.png')
    with GalleryStore(output, scan_interval=0) as store:
        folder = next(f for f in store.list_folders()['folders'] if f['name'] == 'nested')
        (target / 'visible.png').unlink()
        target.rmdir()
        try:
            target.symlink_to(external, target_is_directory=True)
        except OSError as error:
            if os.name == 'nt' and getattr(error, 'winerror', None) == 1314:
                pytest.skip('Windows symlink privilege unavailable')
            raise
        result = store.bootstrap(folder['id'])
        assert result['folder']['name'] == 'output'
        assert result['page']['images'] == []


def test_display_and_thumbnail_cache_keys_remain_separate(tmp_path):
    save_png(tmp_path / 'a.png')
    with GalleryStore(tmp_path) as store:
        row = store.bootstrap()['page']['images'][0]
        display, _ = store.display(row['id'])
        thumb, _ = store.thumbnail(row['id'], 512)
        assert display != thumb
        assert len(store._thumbnail_entries) == 2
        with Image.open(io.BytesIO(display)) as image:
            assert image.size == (1024, 512)
        with Image.open(io.BytesIO(thumb)) as image:
            assert image.size == (512, 256)


def test_concurrent_display_requests_share_conversion(tmp_path, monkeypatch):
    from concurrent.futures import ThreadPoolExecutor
    import threading
    save_png(tmp_path / 'a.png')
    with GalleryStore(tmp_path) as store:
        row = store.bootstrap()['page']['images'][0]
        original = store._encode_thumbnail
        entered, release = threading.Event(), threading.Event()
        calls = []
        def blocked(*args, **kwargs):
            calls.append(kwargs)
            entered.set()
            assert release.wait(3)
            return original(*args, **kwargs)
        monkeypatch.setattr(store, '_encode_thumbnail', blocked)
        with ThreadPoolExecutor(max_workers=2) as pool:
            first = pool.submit(store.display, row['id'])
            assert entered.wait(2)
            second = pool.submit(store.display, row['id'])
            release.set()
            assert first.result(timeout=3) == second.result(timeout=3)
        assert calls == [{'display': True}]


def test_download_keeps_original_non_png_format_and_safe_disposition(tmp_path):
    path = tmp_path / 'name with spaces.webp'
    Image.new('RGBA', (10, 10), (2, 3, 4, 5)).save(path)
    async def exercise():
        async with TestClient(TestServer(create_app(tmp_path))) as client:
            row = (await (await client.get('/shiba-gallery/bootstrap')).json())['page']['images'][0]
            response = await client.get('/shiba-gallery/image/' + row['id'] + '/download')
            assert response.status == 200
            assert response.headers['Content-Type'] == 'image/webp'
            assert '.webp' in response.headers['Content-Disposition']
            assert await response.read() == path.read_bytes()
    asyncio.run(exercise())


def test_display_does_not_attach_incompatible_profile_after_mode_conversion(tmp_path):
    # A CMYK source cannot carry its ICC profile unchanged after conversion to
    # RGB WebP. Refuse this derivative rather than silently mislabel colors.
    profile = ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes()
    path = tmp_path / 'cmyk.jpg'
    Image.new('CMYK', (20, 30), (20, 40, 60, 0)).save(path, icc_profile=profile)
    with GalleryStore(tmp_path) as store:
        row = store.bootstrap()['page']['images'][0]
        with pytest.raises(GalleryError) as error:
            store.display(row['id'])
        assert error.value.code == 'unsupported_color_profile'
        source, _, _, _ = store.open_original(row['id'])
        with source:
            assert source.read() == path.read_bytes()


def test_bootstrap_rescan_removes_deleted_record_mappings(tmp_path):
    old = save_png(tmp_path / 'a.png')
    with GalleryStore(tmp_path, scan_interval=999) as store:
        first = store.bootstrap()['page']['images'][0]
        old.unlink()
        save_png(tmp_path / 'b.png')
        second = store.bootstrap()['page']['images'][0]
        assert first['id'] not in store._records
        assert set(store._records) == {second['id']}
