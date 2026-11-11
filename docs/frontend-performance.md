# Focused frontend performance changes

Implemented on top of `f60b18c`: lazy preparation of saved-setting details and frame-coalesced pan/zoom. Dependency versions, Python behavior, metadata normalization, and image-transfer settings are unchanged.

## Saved settings

Native `details` elements hide content but do not prevent Vue from preparing it. `LazyDetails` renders the body only while expanded. Node matching controls, individual saved values, and original JSON are prepared when opened and released when closed. The difference summary remains immediate; raw JSON copy preserves saved numeric text. Open sections react to image or manual-match changes.

In a deterministic jsdom fixture with 100 nodes and two fields per node, the closed single-image settings panel changed from 201 JSON-display formatting calls to zero, 201 `pre` elements to zero, and 1010 DOM elements to 207. These are operation/element counts, not browser latency measurements. Reopening a section prepares it again rather than retaining all hidden DOM.

## Pan and zoom

Pointer and wheel transforms accumulate locally and publish at most once per animation frame during continuous input. Wheel deltas and cursor anchors are retained, and geometry is read once per wheel frame. Pointer release flushes the final position immediately; pointer cancellation/capture loss retains the last valid move. Reset, original-pixel mode, image navigation, and unmount discard obsolete pending updates.

Deterministic single-frame input tests reduced 100 pointer-move transform notifications to one, and 20 wheel notifications plus 20 geometry reads to one each. Real devices can spread events across multiple frames, so these figures are not a claim of 100×/20× user-visible speedup. Linked/individual transforms and final coordinates are covered by regression tests.

## Verification

- Tests were added before implementation and failed against the original behavior.
- Full unit suite, typecheck, production build, and distribution-bundle smoke are required.
- Production-browser tests cover lazy details and linked final pan position/reset, in addition to existing preview/navigation behavior.
- Local Chromium could not start due to environment restrictions; GitHub Actions is the browser validation environment.
- Paperspace end-to-end latency and generation-load effects have not been measured for this change.
