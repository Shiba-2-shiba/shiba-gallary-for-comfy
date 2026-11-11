"""Bounded concurrent thumbnail generation and private-cache regressions."""
from concurrent.futures import ThreadPoolExecutor
import hashlib
import io
from pathlib import Path
import threading

from PIL import Image
import pytest

from gallery_backend.store import GalleryStore


def catalog(tmp_path, count=3, **kwargs):
    for index in range(count):
        Image.new('RGB', (512, 512), (index * 70, 40, 100)).save(tmp_path / f'{index}.png')
    store = GalleryStore(tmp_path, **kwargs)
    folder = store.list_folders()['folders'][0]['id']
    return store, store.list_images(folder)['images']


def test_distinct_images_can_encode_together(tmp_path, monkeypatch):
    store, rows = catalog(tmp_path, 2)
    rendezvous = threading.Barrier(2)
    save = Image.Image.save
    def synchronized(image, *args, **kwargs):
        if len(args) > 1 and args[1] == 'WEBP':
            rendezvous.wait(timeout=2)
        return save(image, *args, **kwargs)
    monkeypatch.setattr(Image.Image, 'save', synchronized)
    with store, ThreadPoolExecutor(max_workers=2) as pool:
        results = list(pool.map(lambda row: store.thumbnail(row['id'], 256, row['revision']), rows))
    assert len(results) == 2
    for data, _ in results:
        with Image.open(io.BytesIO(data)) as image:
            assert image.size == (256, 256)


def test_warm_thumbnail_does_not_wait_for_unrelated_conversion(tmp_path, monkeypatch):
    store, rows = catalog(tmp_path, 2)
    cached = store.thumbnail(rows[0]['id'], 256)[0]
    entered, release = threading.Event(), threading.Event()
    save = Image.Image.save
    def blocked(image, *args, **kwargs):
        if len(args) > 1 and args[1] == 'WEBP':
            entered.set()
            assert release.wait(3)
        return save(image, *args, **kwargs)
    monkeypatch.setattr(Image.Image, 'save', blocked)
    with store, ThreadPoolExecutor(max_workers=2) as pool:
        cold = pool.submit(store.thumbnail, rows[1]['id'], 256)
        assert entered.wait(2)
        warm = pool.submit(store.thumbnail, rows[0]['id'], 256)
        try:
            assert warm.result(timeout=.5)[0] == cached
        finally:
            release.set()
            cold.result(timeout=3)


def test_writes_do_not_rescan_the_entire_cache(tmp_path, monkeypatch):
    store, _ = catalog(tmp_path)
    glob = Path.glob
    scans = []
    def measured(path, pattern, *args, **kwargs):
        if path == store.cache_dir:
            scans.append(pattern)
        return glob(path, pattern, *args, **kwargs)
    monkeypatch.setattr(Path, 'glob', measured)
    with store:
        for index in range(20):
            store._write_thumbnail(f'{index}.webp', b'preview')
        assert sum(p.stat().st_size for p in store.cache_dir.iterdir()) == 140
    assert scans == []


def test_same_image_concurrent_requests_encode_once(tmp_path, monkeypatch):
    store, rows = catalog(tmp_path, 1)
    entered, release = threading.Event(), threading.Event()
    save, calls = Image.Image.save, []
    def blocked(image, *args, **kwargs):
        if len(args) > 1 and args[1] == 'WEBP':
            calls.append(1)
            entered.set()
            assert release.wait(3)
        return save(image, *args, **kwargs)
    monkeypatch.setattr(Image.Image, 'save', blocked)
    with store, ThreadPoolExecutor(max_workers=3) as pool:
        tasks = [pool.submit(store.thumbnail, rows[0]['id'], 256) for _ in range(3)]
        assert entered.wait(2)
        release.set()
        results = [task.result(timeout=3) for task in tasks]
    assert len(calls) == 1
    assert all(data == results[0] for data in results)


def test_cache_budget_and_lru_hits_survive_eviction(tmp_path):
    store, rows = catalog(tmp_path)
    with store:
        initial = [store.thumbnail(row['id'], 256)[0] for row in rows]
        # Start with a fresh cache to set an exact two-entry budget.
    with GalleryStore(tmp_path, cache_bytes=max(len(initial[0]) + len(initial[1]),
                                             len(initial[0]) + len(initial[2]))) as store:
        folder = store.list_folders()['folders'][0]['id']
        rows = store.list_images(folder)['images']
        a = store.thumbnail(rows[0]['id'], 256)[0]
        store.thumbnail(rows[1]['id'], 256)
        store.thumbnail(rows[0]['id'], 256)  # Make A most recently used.
        store.thumbnail(rows[2]['id'], 256)
        keys = {path.name for path in store.cache_dir.glob('*.webp')}
        key = hashlib.sha256(f"{rows[0]['id']}:{rows[0]['revision']}:256:webp-v1".encode()).hexdigest() + '.webp'
        assert key in keys
        assert sum(path.stat().st_size for path in store.cache_dir.iterdir()) <= store.cache_bytes
        assert store.thumbnail(rows[0]['id'], 256)[0] == a


def test_conversion_concurrency_is_bounded(tmp_path, monkeypatch):
    store, rows = catalog(tmp_path, 4)
    entered, release = threading.Event(), threading.Event()
    lock = threading.Lock()
    save = Image.Image.save
    state = {'active': 0, 'peak': 0, 'calls': 0}
    def blocked(image, *args, **kwargs):
        if len(args) <= 1 or args[1] != 'WEBP':
            return save(image, *args, **kwargs)
        with lock:
            state['active'] += 1
            state['calls'] += 1
            state['peak'] = max(state['peak'], state['active'])
            if state['active'] == 2:
                entered.set()
        try:
            assert release.wait(3)
            return save(image, *args, **kwargs)
        finally:
            with lock:
                state['active'] -= 1
    monkeypatch.setattr(Image.Image, 'save', blocked)
    with store, ThreadPoolExecutor(max_workers=4) as pool:
        tasks = [pool.submit(store.thumbnail, row['id'], 256) for row in rows]
        try:
            assert entered.wait(1), 'two independent conversions should run'
        finally:
            release.set()
        for task in tasks:
            task.result(timeout=3)
    assert state['peak'] == 2 and state['calls'] == 4


def test_missing_cached_file_is_regenerated_and_failure_does_not_poison_key(tmp_path, monkeypatch):
    store, rows = catalog(tmp_path, 1)
    with store:
        expected = store.thumbnail(rows[0]['id'], 256)[0]
        for path in store.cache_dir.glob('*.webp'):
            path.unlink()
        save = Image.Image.save
        def failed(*args, **kwargs):
            raise OSError('simulated encoder failure')
        monkeypatch.setattr(Image.Image, 'save', failed)
        from gallery_backend.store import GalleryError
        with pytest.raises(GalleryError, match='decoded safely'):
            store.thumbnail(rows[0]['id'], 256)
        monkeypatch.setattr(Image.Image, 'save', save)
        assert store.thumbnail(rows[0]['id'], 256)[0] == expected
        assert sum(path.stat().st_size for path in store.cache_dir.iterdir()) == len(expected)


def test_source_change_during_encode_is_not_cached(tmp_path, monkeypatch):
    store, rows = catalog(tmp_path, 1)
    save = Image.Image.save
    def changed(image, *args, **kwargs):
        result = save(image, *args, **kwargs)
        if len(args) > 1 and args[1] == 'WEBP':
            with (tmp_path / rows[0]['name']).open('ab') as source:
                source.write(b'changed')
        return result
    monkeypatch.setattr(Image.Image, 'save', changed)
    from gallery_backend.store import GalleryError
    with store:
        with pytest.raises(GalleryError) as error:
            store.thumbnail(rows[0]['id'], 256, rows[0]['revision'])
        assert error.value.code == 'revision_changed'
        assert list(store.cache_dir.iterdir()) == []
        assert store._thumbnail_flights == {}


def test_disk_full_returns_thumbnail_without_caching_or_leaking_part(tmp_path, monkeypatch):
    store, rows = catalog(tmp_path, 1)
    def failed_replace(*args):
        raise OSError('simulated disk full')
    monkeypatch.setattr('gallery_backend.store.os.replace', failed_replace)
    with store:
        data, _ = store.thumbnail(rows[0]['id'], 256)
        with Image.open(io.BytesIO(data)) as image:
            assert image.size == (256, 256)
        assert list(store.cache_dir.iterdir()) == []
        assert store._thumbnail_flights == {}
        assert store._thumbnail_bytes == 0


def test_parallel_cache_writes_respect_budget(tmp_path):
    store, rows = catalog(tmp_path, 8, cache_bytes=300)
    with store, ThreadPoolExecutor(max_workers=8) as pool:
        results = list(pool.map(lambda row: store.thumbnail(row['id'], 256), rows))
        assert len(results) == 8
        assert sum(path.stat().st_size for path in store.cache_dir.iterdir()) <= 300
        assert store._thumbnail_bytes == sum(path.stat().st_size for path in store.cache_dir.iterdir())
        assert store._thumbnail_flights == {}
