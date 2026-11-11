# Verification and compatibility record

## Target and architecture

- Reference: PanicTitan/ComfyUI-Gallery v2.7.1, commit 74639e68846f64c9f561f3a7745529de76376a97.
- New implementation: Vue 3 + TypeScript, independently mounted overlay. Public `app.registerExtension` boundary; no imported ComfyUI internal Vue store.
- Server: ComfyUI PromptServer aiohttp router, `folder_paths.get_output_directory()` root.
- API namespace: `/shiba-gallery`. No write/delete endpoints.
- Filename order: `mtime_ns` descending, stable path tie-break. This is not proof of generation timestamp.

## Verification levels

Automated synthetic tests are not equivalent to operating against a current ComfyUI install. This document will list actual executed checks after integration. Latest frontend compatibility and Paperspace performance remain unverified until the procedure below is completed.

## Real installation acceptance

Record ComfyUI commit, frontend package version, browser version, OS, proxy URL prefix and enabled extensions. Test A01–A24 from the specification using ordinary PNG, metadata-free PNG, workflow-only PNG, execution-prompt-only PNG and corrupted files. Keep real user PNGs private.

In particular check:
- open/close while generation continues; reopen has no old checks;
- folder changes with requests in flight; selection never jumps to another image;
- extension scripts served below a proxy path prefix;
- left reference stays fixed while new images arrive and candidates change;
- same filename overwritten: new revision is visible, no stale thumbnail;
- missing file yields recoverable unavailable state, not another reference;
- absent metadata is not reported as identical settings;
- multiple same-type custom nodes can be manually rematched;
- prompt-only change disappears from diff, model/LoRA/string parameter changes remain.

## Paperspace performance procedure

Use the same 50-image and 100-image datasets for upstream and new implementation. Compare cold process/cache and warm cache separately. Fix viewport, network throttle, browser zoom and thumbnail size. Record at least five repetitions:

1. Button press to first recognizable preview and to full visible grid.
2. Scroll into uncached rows: preview wait median and p95, longest blank period.
3. Candidate switch to decoded original image.
4. Server CPU/RSS and browser heap during rapid scrolling.
5. Image generation time with and without thumbnail processing.
6. Bytes transferred and number of original image requests during list-only use.

No latency or improvement claim is accepted solely from Vue migration or local loopback timing. Decide numerical acceptance thresholds from real measurements. The initial configuration is tunable, not a guaranteed SLA.

## Local verification — 2026-11-11

- Python synthetic suite: 87 passed, 8 Windows-native tests skipped on Linux.
- Frontend unit/component suite: 67 passed.
- TypeScript/Vue typecheck, production bundle build, Python compilation: passed.
- Production bundle VM smoke: registered/mounted without Node globals; proxy-prefixed app/api/CSS URLs verified.
- Independent security/functional review: no unresolved release-blocking findings in reviewed code.
- Chromium E2E: **not executed**. Browser process aborts before page load with `process_singleton_posix.cc socket() failed: Operation not permitted` in the execution environment. This is not an application test pass.
- Windows server support is implemented with validated native handles and native ChangeTime. Actual Windows integration tests are included in CI but were not run locally.
- Real ComfyUI frontend, Paperspace network/GPU workload and upstream performance comparison: **not run**.

Run a local real-HTTP synthetic demo with `python -m gallery_backend.demo --port 8189 --count 100`. It uses generated fixtures only, not the user's output images. For the production-bundle mock-host browser suite, run `cd web && npm run build && npx playwright install chromium && npm run test:browser`. A system Chromium can be selected with `CHROMIUM_PATH`.
