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

## Browser CI assertion follow-up — 2026-11-11

The user supplied CI output where one browser case failed the all-request pathname prefix assertion and the second browser case passed. The original failure did not print offending URLs, so its exact request cannot be identified from that output alone.

The assertion incorrectly treated local `blob:` image handles (created after successful proxied thumbnail fetches) as HTTP paths. A regression test reproduced that classifier defect. The test now validates origin and proxy prefix for HTTP(S) transport, ignores non-HTTP local resource URLs, retains complete offending URLs in failure output, and repeats the check after comparison/folder navigation. Missing-prefix and cross-origin HTTP requests still fail. No production application logic changed.

After the fix: 71 frontend tests, typecheck/build and production-bundle smoke pass. Browser CI rerun result is still pending/unverified from this executor.

## Real-use feedback patch — 2026-11-11

The user reported sufficient thumbnail transfer speed but several-second Opening output waits as image counts grow, slow single-image originals, and cumbersome reference selection. Code inspection confirmed that single and comparison views share ImagePane and the same original route; no single-mode-specific cause was proved.

Implemented: Large initial view; 60-record pages; selected reference initially shown on both sides; reference chooser across pinned and checked candidates; cached 512px preview before the original; loading status below rather than over the image; higher original priority and low-priority metadata. The preview cache is bounded at 128 entries/32 MiB and cleared on close.

Backend now postpones PNG header checks to the requested page, separates catalog work from original lookup locks, isolates original-image workers, and reads originals in 1 MiB chunks rather than 64 KiB. Unchanged refreshes preserve loaded pages and their cursor instead of fetching all of them again. Snapshot expiration/eviction regressions are covered.

Synthetic Linux measurements (five runs each, median, generated local files; **not Paperspace/user-network measurements**):

| Case | Before | After |
| --- | ---: | ---: |
| First 10-image page from 1,000 PNGs | 29.20 ms; 1,000 image opens/header reads | 10.63 ms; 10 image opens/header reads |
| Unchanged catalog refresh | 26.76 ms; 1,000 image opens | 8.99 ms; 0 image opens |
| Approx. 3.15 MB original | 16.40 ms; 50 read dispatches | 9.06 ms; 5 read dispatches |
| Original while both general workers held for 200 ms | 216.12 ms | 4.96 ms |

Directory enumeration/stat/sort remains O(N). Windows still needs secure opens to obtain native ChangeTime, so the Linux zero-open refresh count does not apply there. Native Windows and user-visible speed remain unmeasured here.

Final local verification for this patch: Python 97 passed/8 Windows-only skipped; frontend 88 passed; typecheck/build/bundle smoke/Python compilation/diff checks passed. Three browser E2E cases include intentionally delayed original delivery; actual browser execution still requires CI/a supported runtime.

## Single-view navigation follow-up — 2026-11-11

The user confirmed improved listing speed but reported that single-view images remained the same apparent size as comparison images and uncached images appeared slowly after several navigation steps. Inspection found that the single view already occupied full width; square/portrait images were instead constrained by the same available height. Single view now starts with its candidate strip collapsed and uses compact controls to reclaim height, retaining Fit without cropping, navigation, and an optional candidate-strip toggle.

Selected previews now have foreground priority. Background candidate previews/prefetches use at most three of four thumbnail transport slots, leaving capacity for the selected preview; ordinary grid requests retain four-way concurrency. Directional prefetch prepares up to three 512px previews ahead and one behind within the loaded candidates. Requests share in-flight transfers, cancel when no consumer needs them, and retain only the existing bounded cache. Originals are not speculatively downloaded. Obsolete original image sources are removed on navigation/unmount (actual network cancellation remains browser-dependent). Metadata waits 120 ms for burst navigation to settle and obsolete view requests are aborted without cancelling an active same-prompt search that still needs them.

These changes reduce avoidable contention and provide an earlier compressed preview; no user-network latency reduction has been measured. Actual original transfer time still depends on image size, network and server load. Browser regression coverage includes larger square-image single view and navigation through delayed originals. Chromium still aborts before page load with the environment's socket permission error, so those browser assertions and real ComfyUI/Paperspace/Windows behaviour remain unverified locally.

Final local checks for this follow-up: 101 frontend unit/component tests passed; Vue/TypeScript typecheck, production build, production-bundle VM smoke and diff whitespace checks passed. Backend code is unchanged and its suite was not rerun for this frontend-only patch. The independent review's candidate-strip reveal and disposed-search cancellation findings were corrected and regression-tested.


## Cross-realm Blob CI regression — 2026-11-11

Reproduced the reported assertion failure on Node 22.23.4 with the repository's jsdom/Vitest environment. The original test passed on Node 24.22.1. Node Response receiving a jsdom Blob can stringify it to the 13-byte text "[object Blob]" and produce a Blob from a different constructor, so the instanceof assertion was not a valid functional check.

The fixture now supplies a plain response body with an explicit MIME type and checks its seven-byte size, actual text, shared result identity, cache identity, and a cache hit without another fetch. Reading uses Blob.text() where available, otherwise FileReader for jsdom's Blob implementation. Cancellation and late-response cache exclusion remain covered. No production code or distribution assets changed.

Both Node 22.23.4 and Node 24.22.1 passed all 101 frontend tests after the fix. Vue/TypeScript checking, production build and bundle smoke also passed locally. Browser E2E and backend tests were not rerun for this test-only correction.


CI run 43010502540 confirmed the Blob correction: frontend unit tests/build/bundle/distribution checks and both Python jobs passed. Five browser cases passed, including larger single-view portrait/square images. The sixth case attached its request observer after Large grid previews had already loaded; cache reuse then correctly made no new request, causing its preparation predicate to time out. The observer now starts before opening the gallery, retaining the delayed-original and forward/reverse navigation assertions. This browser follow-up was typechecked and the 101-test suite/build/bundle rerun locally; its browser result requires the next CI run.


Run 43010931870 progressed beyond preview observation and exposed a keyboard focus defect: switching from the grid removed the focused View button, so subsequent arrow keys did not reach the dialog handler. An activeElement-based component regression reproduced this. Mode transitions now restore focus inside the gallery when the prior control disappeared, while preserving surviving input/select focus. A labeled viewer region receives focus; returning to the grid focuses a visible thumbnail. The portrait-size assertion also now polls its unchanged >1.1 requirement to allow ResizeObserver's post-transition update, rather than relying on the reused pane's already-Original status. Final local Node 22 suite: 103 passed; typecheck/build/bundle passed. Local browser execution was retried and remains blocked before page load by Chromium socket EPERM; browser confirmation is deferred to CI.
