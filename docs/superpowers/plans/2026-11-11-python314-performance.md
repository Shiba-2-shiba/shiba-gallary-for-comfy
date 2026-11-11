# Python 3.14 thumbnail pipeline plan

Goal: reduce independent-thumbnail and cache bookkeeping waits without changing pixels, metadata limits, secure file access or ComfyUI-wide runtime settings.

- [x] Establish a Python 3.14 baseline, exact dependencies, fixed synthetic images and before/after benchmark.
- [x] Add failing regressions for independent encodes, warm-cache bypass and no repeated cache-directory scans.
- [x] Bound generation to two concurrent images, coordinate identical keys and separate disk-cache locking from conversion.
- [x] Maintain byte-bounded LRU cache accounting with atomic writes; preserve errors, overwrite detection and cleanup.
- [x] Require Python 3.14+ and test that version on Windows/Linux CI.
- [x] Verify failure recovery, cache eviction, unchanged pixel output and concurrent resource limits.
- [ ] Run all tests, review, document measurements/limitations, publish and verify CI.

Python 3.14 Executor.map(buffersize=...) bounds benchmark submissions. JIT, free-threading and InterpreterPoolExecutor are not enabled: this workload includes native Pillow/I/O and shared safe handles, and changing process-wide runtime settings would affect ComfyUI. Existing two-worker limit is retained; improvements remove avoidable serialization, not add unbounded CPU work.
