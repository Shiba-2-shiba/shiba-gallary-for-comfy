"""Reproducible synthetic benchmark; not an end-to-end ComfyUI speed claim.

Run with Python 3.14+. --repo selects an unchanged baseline checkout.
No user images, filenames, metadata or filesystem paths are included in output.
"""
import argparse
import hashlib
import json
import os
from pathlib import Path
import random
import statistics
import sys
import tempfile
import time
from concurrent.futures import ThreadPoolExecutor


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--images', type=int, default=50)
    parser.add_argument('--workers', type=int, default=2)
    parser.add_argument('--rounds', type=int, default=3)
    args = parser.parse_args()
    if args.images < 1 or args.workers < 1 or args.rounds < 1:
        parser.error('counts must be positive')
    sys.path.insert(0, str(args.repo.resolve()))
    from PIL import Image, __version__ as pillow_version
    import aiohttp
    from gallery_backend.store import GalleryStore

    results = []
    with tempfile.TemporaryDirectory(prefix='gallery-benchmark-') as directory:
        root = Path(directory)
        rng = random.Random(1729)
        # Reproducible noisy 1 MP source: avoids misleading solid-color timings.
        pixels = rng.randbytes(1024 * 1024 * 3)
        image = Image.frombytes('RGB', (1024, 1024), pixels)
        source = root / '00000.png'
        image.save(source)
        encoded = source.read_bytes()
        for index in range(args.images):
            path = root / f'{index:05d}.png'
            path.write_bytes(encoded)
            os.utime(path, ns=((index + 1) * 10**9,) * 2)
        for _ in range(args.rounds):
            with GalleryStore(root) as store:
                folder = store.list_folders()['folders'][0]['id']
                page = store.list_images(folder, limit=min(200, args.images))
                rows = page['images']
                while page['next_cursor']:
                    page = store.list_images(folder, cursor=page['next_cursor'], limit=200)
                    rows.extend(page['images'])
                phases = {}
                for name in ('cold_cache', 'warm_cache'):
                    def render(row):
                        started = time.perf_counter()
                        data, revision = store.thumbnail(row['id'], 512, row['revision'])
                        assert revision == row['revision']
                        return time.perf_counter() - started, hashlib.sha256(data).hexdigest()
                    started = time.perf_counter()
                    with ThreadPoolExecutor(max_workers=args.workers) as pool:
                        # 3.14's bounded map keeps the benchmark from queuing N jobs.
                        samples = list(pool.map(render, rows, buffersize=args.workers * 2))
                    elapsed = time.perf_counter() - started
                    timings = sorted(sample[0] * 1000 for sample in samples)
                    phases[name] = {'seconds': elapsed, 'p50_ms': statistics.median(timings),
                                    'p95_ms': timings[min(len(timings) - 1, int(len(timings) * .95))],
                                    'sha256': sorted(set(sample[1] for sample in samples))}
                results.append(phases)
        # Isolate private disk-cache bookkeeping as the cache grows.
        with GalleryStore(root, cache_bytes=16 * 1024 * 1024) as store:
            started = time.perf_counter()
            for index in range(1000):
                store._write_thumbnail(f'{index:064x}.webp', b'x' * 1024)
            cache_seconds = time.perf_counter() - started
    print(json.dumps({'python': sys.version.split()[0], 'pillow': pillow_version,
                      'aiohttp': aiohttp.__version__, 'images': args.images,
                      'dimensions': [1024, 1024], 'thumbnail': 512, 'workers': args.workers,
                      'rounds': results, 'cache_bookkeeping_1000_seconds': cache_seconds}, indent=2))


if __name__ == '__main__':
    main()
