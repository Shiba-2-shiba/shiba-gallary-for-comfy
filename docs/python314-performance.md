# Python 3.14 performance baseline

## Scope

Python 3.14 is the minimum supported runtime. This change improves the existing thumbnail pipeline under ordinary CPython 3.14, without enabling JIT, free-threading, subinterpreters or changing ComfyUI-wide runtime settings. It does not claim that Python 3.14-specific interpreter features caused the measured improvement.

- Different uncached images can convert concurrently, with at most **two** active conversions (matching the existing HTTP worker budget).
- Requests for the same image/revision/size share a per-key generation lock. Idle locks are removed, including on failures.
- Warm-cache reads do not acquire the conversion lock. They can complete while an unrelated image is encoding, provided an HTTP worker is available.
- Disk-cache LRU order and byte usage are maintained in memory. Each write no longer scans, stats and sorts every cached file.
- The original secure file-handle checks, revision checks, pixel/metadata limits, WebP quality 82/method 3, temporary-only storage and cache budget are retained. Image quality is not reduced for speed.
- `_encode_thumbnail` is separated from cache coordination so future execution strategies can be measured without changing the API or safe file-access contract.

## Measurement

Same machine, CPython 3.14.10 (GIL enabled, JIT disabled), Pillow 13.0.0, aiohttp 3.14.5. Linux x86_64 cloud container, 9 logical CPUs reported; CPU scheduling was not isolated. Baseline commit: `24b6c3f0260c081928d377189c5455fbcfcd27e9`.

Synthetic deterministic noisy 1024×1024 RGB PNG, copied to 50 or 100 distinct files, resized to 512px WebP. Two worker threads; three rounds with a fresh cache, then warm-cache repeat. File generation is excluded from the timer. Values below are the median batch wall time, **not user-visible network latency**.

| Workload | Before | After |
| --- | ---: | ---: |
| 50 uncached thumbnails | 3.404 s | 1.797 s |
| 100 uncached thumbnails | 6.865 s | 3.543 s |
| 50 cached thumbnails | 0.00746 s | 0.00841 s |
| 100 cached thumbnails | 0.01494 s | 0.01798 s |

Cold generation was about 47–48% shorter in this synthetic workload. Warm-cache microbenchmarks were slightly slower and noisy; no general warm-cache speedup is claimed. The important contention regression test proves warm hits no longer wait for an unrelated encoder lock.

An isolated 1,000-entry cache-write bookkeeping test (1 KiB entries, no image encoding) took 1.67–1.74 s before and 0.037–0.038 s after. This measures removal of repeated directory scanning, not the whole Gallery speed.

Output WebP SHA-256 was identical before and after for every benchmark image. Tests additionally cover aspect ratio, transparency, overwrite detection, corrupted/oversized input, simultaneous writes, eviction, missing cache files and encoder/disk failures. Raw results: [python314-thumbnail.json](../benchmarks/results/python314-thumbnail.json).

### Reproduce

Use Python 3.14 with the same Pillow/aiohttp versions to avoid confounding dependency changes:

```sh
python benchmarks/thumbnail_pipeline.py --images 50
python benchmarks/thumbnail_pipeline.py --images 100
python benchmarks/thumbnail_pipeline.py --repo /path/to/baseline-checkout --images 100
```

The benchmark uses Python 3.14's `Executor.map(buffersize=...)` to bound submissions. This controls benchmark memory/queueing; it is not the source of the production speedup. The output contains no user image content, prompts or filesystem paths.

## Why not switch to other Python 3.14 execution modes now?

- JIT can benefit some Python-heavy loops, but native Pillow codecs and I/O dominate this operation. It is build/startup dependent, and Gallery must not change the host process's settings.
- Free-threaded Python is a separate runtime choice requiring the whole ComfyUI stack to be compatible. It is not required to run two Pillow conversions; the measured normal-GIL runtime already benefits.
- `InterpreterPoolExecutor` requires isolated interpreters and serializable inputs. Passing this store's locks and confined file handles across that boundary is not a drop-in safe change. Startup, serialization, memory and extension compatibility costs must be measured before considering it.
- `Path.info` is not substituted for opened-handle validation. Cached path metadata is not a safe replacement for protection against path substitution or in-place overwrite.

## Limits and next measurements

Two conversions can now consume CPU/memory simultaneously where they were previously serialized. The active conversion count is bounded, but inference impact and peak memory must still be measured on the user's GPU host. The unchanged 32 MP per-image limit is a safety cap, not the expected workload (usually 1–1.3 MP). No Paperspace, live GPU-generation or user-browser speed claim is made.

CI tests Python 3.14 on Linux and Windows. Later Python versions require their own tests. Compare future runtime/dependency updates with fixed inputs, cold/warm caches, the same concurrency and repeated runs; do not use a shared CI runner's tiny timing fluctuation as a hard SLA.

References: [Python 3.14 executor map](https://docs.python.org/3.14/library/concurrent.futures.html#concurrent.futures.Executor.map), [InterpreterPoolExecutor](https://docs.python.org/3.14/library/concurrent.futures.html#interpreterpoolexecutor), [free-threading](https://docs.python.org/3.14/howto/free-threading-python.html).

## Windows metadata cache correctness

The Python 3.14 Windows CI exposed a stale parsed-metadata result after a rapid same-size overwrite. A deterministic regression reproduces the failure by holding the filesystem revision constant. Metadata requests now read the bounded PNG text chunks (skipping pixel data), check the opened source, and include text plus warnings in the parsed-settings cache key. This trades a small read/hash cost for correctness; unchanged text still reuses parsing results. This is not presented as a Python 3.14 language defect or a general solution to every filesystem timestamp collision in image/HTTP caches.
