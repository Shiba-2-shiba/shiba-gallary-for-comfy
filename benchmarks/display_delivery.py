"""Synthetic display derivative measurements, not a Paperspace speed claim.
Run with Python 3.14: python benchmarks/display_delivery.py
No user content is read or logged. Original bytes are verified unchanged.
"""
import hashlib
import io
import json
from pathlib import Path
import random
import statistics
import sys
import tempfile
import time

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from PIL import Image, __version__ as pillow_version
from gallery_backend.store import GalleryStore


def main():
    results = []
    with tempfile.TemporaryDirectory(prefix='gallery-display-benchmark-') as directory:
        root = Path(directory)
        for name, dims in [('square', (1024, 1024)), ('portrait', (832, 1248)), ('small', (320, 240))]:
            rng = random.Random(1729)
            image = Image.frombytes('RGB', dims, rng.randbytes(dims[0] * dims[1] * 3))
            path = root / (name + '.png')
            image.save(path)
            original = path.read_bytes()
            cold, warm = [], []
            for _ in range(3):
                with GalleryStore(root) as store:
                    row = next(r for r in store.bootstrap()['page']['images'] if r['name'] == path.name)
                    start = time.perf_counter()
                    data, revision = store.display(row['id'], row['revision'])
                    cold.append((time.perf_counter() - start) * 1000)
                    start = time.perf_counter()
                    cached, _ = store.display(row['id'], row['revision'])
                    warm.append((time.perf_counter() - start) * 1000)
                    assert cached == data and revision == row['revision']
                    decoded = Image.open(io.BytesIO(data))
                    assert max(decoded.size) <= 1024
            assert path.read_bytes() == original
            results.append({'fixture': name, 'source_dimensions': dims, 'display_dimensions': decoded.size,
                            'png_bytes': len(original), 'display_bytes': len(data),
                            'cold_median_ms': statistics.median(cold), 'warm_median_ms': statistics.median(warm),
                            'original_sha256_unchanged': hashlib.sha256(path.read_bytes()).hexdigest() == hashlib.sha256(original).hexdigest()})
    print(json.dumps({'python': sys.version.split()[0], 'pillow': pillow_version, 'rounds': 3,
                      'note': 'Synthetic random pixels. No network or GPU inference measurement. Lossy derivative is not pixel-identical.',
                      'results': results}, indent=2))


if __name__ == '__main__':
    main()
