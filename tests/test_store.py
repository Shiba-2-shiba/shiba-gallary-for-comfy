"""Behavioral tests use generated PNGs only; no user content is required."""
import io
import json
import os
import time
from pathlib import Path

import pytest
from PIL import Image, PngImagePlugin

from gallery_backend.store import GalleryError, GalleryStore


def png(path, *, color='red', size=(96, 64), metadata=None, mtime=None):
    path.parent.mkdir(parents=True, exist_ok=True)
    info = PngImagePlugin.PngInfo()
    for key, value in (metadata or {}).items():
        info.add_text(key, value if isinstance(value, str) else json.dumps(value))
    Image.new('RGB', size, color).save(path, pnginfo=info)
    if mtime is not None:
        # Millisecond-spaced fixture timestamps survive Windows' 100 ns clock.
        mtime *= 1_000_000
        os.utime(path, ns=(mtime, mtime))
    return path


@pytest.fixture
def store(tmp_path):
    output = tmp_path / 'output'
    output.mkdir()
    with GalleryStore(output, scan_interval=0) as value:
        yield value


def symlink_or_skip(link, target, *, directory=False):
    try:
        link.symlink_to(target, target_is_directory=directory)
    except OSError as error:
        if os.name == 'nt' and getattr(error, 'winerror', None) == 1314:
            pytest.skip('Windows symlink privilege is unavailable')
        raise


def root_id(store):
    return next(x['id'] for x in store.list_folders()['folders'] if x['name'] == 'output')


def test_folders_do_not_mix_parent_and_child_images(store):
    png(store.root / 'root.png')
    png(store.root / 'nested' / 'child.png')
    folders = {x['name']: x['id'] for x in store.list_folders()['folders']}
    assert set(folders) == {'output', 'nested'}
    assert [x['name'] for x in store.list_images(folders['output'])['images']] == ['root.png']
    assert [x['name'] for x in store.list_images(folders['nested'])['images']] == ['child.png']


def test_newest_first_has_stable_path_tiebreaker(store):
    png(store.root / 'b.png', mtime=20)
    png(store.root / 'a.png', mtime=20)
    png(store.root / 'new.png', mtime=30)
    assert [x['name'] for x in store.list_images(root_id(store))['images']] == ['new.png', 'a.png', 'b.png']


def test_cursor_snapshot_is_stable_when_new_images_arrive(store):
    for number in range(5):
        png(store.root / f'{number}.png', mtime=number + 1)
    folder = root_id(store)
    first = store.list_images(folder, limit=2)
    png(store.root / 'new.png', mtime=100)
    fresh = store.list_images(folder, limit=2)
    second = store.list_images(folder, cursor=first['next_cursor'], limit=2)
    third = store.list_images(folder, cursor=second['next_cursor'], limit=2)
    assert [x['name'] for x in first['images'] + second['images'] + third['images']] == ['4.png', '3.png', '2.png', '1.png', '0.png']
    assert first['version'] == second['version'] == third['version']
    assert fresh['version'] != first['version']
    assert fresh['images'][0]['name'] == 'new.png'
    assert third['next_cursor'] is None


def test_overwrite_preserves_id_but_changes_revision_even_with_preserved_mtime(store):
    path = png(store.root / 'same.png', mtime=50)
    before = store.list_images(root_id(store))['images'][0]
    time.sleep(0.002)
    png(path, color='blue', mtime=50)
    after = store.list_images(root_id(store))['images'][0]
    assert before['id'] == after['id']
    assert before['revision'] != after['revision']
    assert after['width'] == 96 and after['height'] == 64


def test_ids_survive_restart_but_revisions_do_not(store):
    png(store.root / 'safe name.png')
    before = store.list_images(root_id(store))['images'][0]
    with GalleryStore(store.root, scan_interval=0) as restarted:
        after = restarted.list_images(root_id(restarted))['images'][0]
    assert after['id'] == before['id']
    assert after['revision'] != before['revision']
    assert 'safe name' not in after['id']


def test_symlink_files_and_directories_are_not_catalogued(store, tmp_path):
    external = png(tmp_path / 'private' / 'secret.png')
    symlink_or_skip(store.root / 'escape.png', external)
    symlink_or_skip(store.root / 'escape', external.parent, directory=True)
    assert store.list_folders()['folders'] == [{'id': root_id(store), 'name': 'output'}]
    assert store.list_images(root_id(store))['images'] == []


@pytest.mark.parametrize('value', ['../secret', '/etc/passwd', '', 'made-up'])
def test_unknown_or_traversal_folder_is_rejected(store, value):
    with pytest.raises(GalleryError) as error:
        store.list_images(value)
    assert error.value.status == 404


def test_cursor_cannot_be_used_for_another_folder_or_tampered(store):
    for number in range(2):
        png(store.root / f'{number}.png')
    (store.root / 'nested').mkdir()
    folders = {x['name']: x['id'] for x in store.list_folders()['folders']}
    cursor = store.list_images(folders['output'], limit=1)['next_cursor']
    for folder, token in [(folders['nested'], cursor), (folders['output'], cursor + 'x')]:
        with pytest.raises(GalleryError) as error:
            store.list_images(folder, cursor=token)
        assert error.value.status == 400


def test_incomplete_png_is_not_published_but_later_completion_appears(store):
    path = png(store.root / 'pending.png')
    data = path.read_bytes()
    path.write_bytes(data[:-12])
    folder = root_id(store)
    assert store.list_images(folder)['images'] == []
    path.write_bytes(data)
    assert store.list_images(folder)['images'][0]['name'] == 'pending.png'


def test_removed_folder_is_not_reported_as_empty(store):
    child = store.root / 'child'
    child.mkdir()
    folder = next(x['id'] for x in store.list_folders()['folders'] if x['name'] == 'child')
    child.rmdir()
    with pytest.raises(GalleryError) as error:
        store.list_images(folder)
    assert error.value.status == 404


def test_original_read_rechecks_symlink_after_cataloguing(store, tmp_path):
    path = png(store.root / 'image.png')
    row = store.list_images(root_id(store))['images'][0]
    external = png(tmp_path / 'private.png', color='blue')
    path.unlink()
    symlink_or_skip(path, external)
    with pytest.raises(GalleryError) as error:
        store.open_original(row['id'], row['revision'])
    assert error.value.status == 404


def test_original_rejects_old_revision_and_streams_current_bytes(store):
    path = png(store.root / 'image.png')
    row = store.list_images(root_id(store))['images'][0]
    png(path, color='blue')
    with pytest.raises(GalleryError) as error:
        store.open_original(row['id'], row['revision'])
    assert error.value.status == 409
    source, current, mime, length = store.open_original(row['id'])
    with source:
        assert source.read() == path.read_bytes()
    assert current != row['revision'] and mime == 'image/png' and length == path.stat().st_size


def test_thumbnail_is_small_preserves_aspect_and_does_not_modify_original(store):
    path = png(store.root / 'large.png', size=(1200, 600))
    original = path.read_bytes()
    row = store.list_images(root_id(store))['images'][0]
    data, revision = store.thumbnail(row['id'], 256, row['revision'])
    with Image.open(io.BytesIO(data)) as preview:
        assert preview.size == (256, 128)
    assert revision == row['revision']
    assert path.read_bytes() == original
    assert len(list(store.cache_dir.glob('*.webp'))) == 1
    assert store.thumbnail(row['id'], 256, row['revision'])[0] == data


def test_thumbnail_preserves_transparency(store):
    path = store.root / 'alpha.png'
    Image.new('RGBA', (300, 300), (255, 0, 0, 100)).save(path)
    row = store.list_images(root_id(store))['images'][0]
    data, _ = store.thumbnail(row['id'], 256)
    with Image.open(io.BytesIO(data)) as image:
        assert image.mode == 'RGBA'
        assert image.getpixel((10, 10))[3] == 100


def test_thumbnail_size_and_decode_resource_limits_are_enforced(store):
    png(store.root / 'image.png', size=(200, 200))
    row = store.list_images(root_id(store))['images'][0]
    with pytest.raises(GalleryError) as error:
        store.thumbnail(row['id'], 10000)
    assert error.value.status == 400
    store.max_pixels = 100
    with pytest.raises(GalleryError) as error:
        store.thumbnail(row['id'], 256)
    assert error.value.status == 413


def test_thumbnail_cache_never_exceeds_budget_and_is_removed_on_close(store):
    store.cache_bytes = 300
    for i in range(4):
        png(store.root / f'{i}.png', color=(50 * i, 20, 100), size=(512, 512))
    for row in store.list_images(root_id(store))['images']:
        store.thumbnail(row['id'], 256)
    assert sum(path.stat().st_size for path in store.cache_dir.iterdir()) <= 300
    cache = store.cache_dir
    store.close()
    assert not cache.exists()


def test_saved_prompt_and_workflow_are_returned_as_original_objects(store):
    prompt = {'1': {'class_type': 'KSampler', 'inputs': {'seed': 123, 'cfg': 7.5}}}
    workflow = {'nodes': [{'id': 1, 'type': 'KSampler', 'widgets_values': [123, 'fixed']}]}
    png(store.root / 'meta.png', metadata={'prompt': prompt, 'workflow': workflow})
    row = store.list_images(root_id(store))['images'][0]
    result = store.metadata(row['id'])
    assert result['status'] == 'ok' and result['prompt'] == prompt and result['workflow'] == workflow
    assert result['warnings'] == []
    assert json.loads(result['raw_prompt']) == prompt


@pytest.mark.parametrize('metadata,status,prompt', [
    ({}, 'absent', None),
    ({'prompt': {'1': {'inputs': {}}}}, 'ok', {'1': {'inputs': {}}}),
    ({'prompt': '{broken'}, 'invalid', None),
    ({'prompt': '[]'}, 'invalid', None),
    ({'prompt': '{"value": NaN}'}, 'invalid', None),
])
def test_metadata_absence_and_invalid_values_are_distinct(store, metadata, status, prompt):
    png(store.root / 'meta.png', metadata=metadata)
    row = store.list_images(root_id(store))['images'][0]
    result = store.metadata(row['id'])
    assert result['status'] == status
    assert result['prompt'] == prompt
    assert result['workflow'] is None
    assert bool(result['warnings']) == (status == 'invalid')


def test_invalid_prompt_does_not_hide_valid_workflow(store):
    workflow = {'nodes': []}
    png(store.root / 'meta.png', metadata={'prompt': 'broken', 'workflow': workflow})
    row = store.list_images(root_id(store))['images'][0]
    result = store.metadata(row['id'])
    assert result['status'] == 'partial'
    assert result['prompt'] is None and result['workflow'] == workflow
    assert result['warnings']


def test_compressed_metadata_is_bounded_before_json_decoding(store):
    info = PngImagePlugin.PngInfo()
    info.add_text('prompt', json.dumps({'huge': 'x' * 10000}), zip=True)
    Image.new('RGB', (32, 32)).save(store.root / 'compressed.png', pnginfo=info)
    row = store.list_images(root_id(store))['images'][0]
    store.max_metadata_bytes = 100
    result = store.metadata(row['id'])
    assert result['status'] == 'invalid' and result['prompt'] is None
    assert result['warnings']


def test_metadata_cache_changes_after_overwrite(store):
    path = png(store.root / 'meta.png', metadata={'prompt': {'value': 1}})
    row = store.list_images(root_id(store))['images'][0]
    assert store.metadata(row['id'])['prompt'] == {'value': 1}
    png(path, metadata={'prompt': {'value': 2}})
    assert store.metadata(row['id'])['prompt'] == {'value': 2}


def test_non_png_images_are_viewable_with_explicit_unsupported_metadata(store):
    Image.new('RGB', (300, 150), 'red').save(store.root / 'photo.jpg')
    row = store.list_images(root_id(store))['images'][0]
    assert row['width'] == 300
    assert store.metadata(row['id'])['status'] == 'unsupported'
    data, _ = store.thumbnail(row['id'], 256)
    with Image.open(io.BytesIO(data)) as preview:
        assert preview.size == (256, 128)


def test_oversized_file_is_not_parsed_during_indexing(store):
    png(store.root / 'small.png', size=(32, 32))
    Image.new('RGB', (400, 400)).save(store.root / 'large.jpg')
    store.max_file_bytes = 200
    rows = store.list_images(root_id(store))['images']
    assert [row['name'] for row in rows] == ['small.png']


def test_symlink_swap_to_fifo_is_rejected_without_blocking(store):
    if not hasattr(os, 'mkfifo'):
        pytest.skip('POSIX FIFO test')
    path = png(store.root / 'image.png')
    row = store.list_images(root_id(store))['images'][0]
    path.unlink()
    os.mkfifo(path)
    import subprocess
    import sys
    # A child process makes an accidental blocking open fail safely, rather
    # than leave pytest or a web worker permanently hung.
    code = '''import sys
from gallery_backend.store import GalleryStore, GalleryError
with GalleryStore(sys.argv[1]) as store:
    store._records['image'] = {'_path':'image.png'}
    try:
        store.open_original('image')
    except GalleryError as error:
        assert error.status == 404
    else:
        raise AssertionError('FIFO must not be served')
'''
    result = subprocess.run([sys.executable, '-c', code, str(store.root)], timeout=2, capture_output=True)
    assert result.returncode == 0, result.stderr.decode()


def test_large_integer_values_remain_exact_for_browser_and_raw_copy(store):
    raw = '{"seed": 9007199254740993, "small": 3}'
    png(store.root / 'meta.png', metadata={'prompt': raw})
    row = store.list_images(root_id(store))['images'][0]
    result = store.metadata(row['id'])
    assert result['prompt'] == {'seed': {'__shiba_number__': '9007199254740993'}, 'small': 3}
    assert result['raw_prompt'] == raw and result['raw_workflow'] is None
    assert result['status'] == 'ok'


def test_exponent_overflow_is_invalid_metadata_not_server_error(store):
    png(store.root / 'meta.png', metadata={'prompt': '{"huge": 1e999}'})
    row = store.list_images(root_id(store))['images'][0]
    result = store.metadata(row['id'])
    assert result['status'] == 'invalid' and result['prompt'] is None


def test_platform_without_secure_descriptor_opens_fails_closed(store):
    if os.name == 'nt':
        pytest.skip('Windows uses the native handle helper instead')
    os.close(store._root_fd)
    store._root_fd = None
    with pytest.raises(GalleryError) as error:
        store.list_folders()
    assert error.value.status == 503 and error.value.code == 'platform_unsupported'


def test_deleted_root_is_unavailable_not_an_empty_folder(store):
    store.root.rmdir()
    with pytest.raises(GalleryError) as error:
        store.list_folders()
    assert error.value.status == 503 and error.value.code == 'root_unavailable'


def test_literal_reserved_number_tag_is_not_confused_with_an_integer(store):
    raw = '{"value": {"__shiba_number__": "9007199254740993"}}'
    png(store.root / 'meta.png', metadata={'prompt': raw})
    row = store.list_images(root_id(store))['images'][0]
    result = store.metadata(row['id'])
    assert result['status'] == 'invalid' and result['prompt'] is None
    assert result['raw_prompt'] == raw and result['warnings']



def test_metadata_cache_does_not_trust_colliding_filesystem_timestamps(store, monkeypatch):
    """Some filesystems can report the same identity/times for fast rewrites."""
    path = png(store.root / 'meta-collision.png', metadata={'prompt': {'value': 1}})
    row = store.list_images(root_id(store))['images'][0]
    monkeypatch.setattr(store, '_revision', lambda *_: 'same-timestamp-revision')
    assert store.metadata(row['id'])['prompt'] == {'value': 1}
    png(path, metadata={'prompt': {'value': 2}})
    assert store.metadata(row['id'])['prompt'] == {'value': 2}


def test_unchanged_metadata_reuses_parse_cache_after_content_check(store, monkeypatch):
    from gallery_backend import png_metadata
    png(store.root / 'meta-cached.png', metadata={'prompt': {'value': 1}})
    row = store.list_images(root_id(store))['images'][0]
    parse = png_metadata.parse_saved_metadata
    calls = []
    def tracked(*args):
        calls.append(1)
        return parse(*args)
    monkeypatch.setattr(png_metadata, 'parse_saved_metadata', tracked)
    assert store.metadata(row['id']) == store.metadata(row['id'])
    assert len(calls) == 1
