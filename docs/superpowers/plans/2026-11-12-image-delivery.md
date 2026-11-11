# Responsive image delivery implementation plan

Goal: implement the user-approved bootstrap, settled navigation, and 1024px high-quality WebP viewing, while downloads retain the original bytes.

Architecture: bootstrap returns only the selected folder plus its first image page, avoiding a recursive folders prerequisite. Background folder loading remains separate. Display derivatives reuse bounded server caching and work limits. Thumbnail preview is immediate; navigation defers high-quality display and metadata until settled. Explicit original/1:1 and original download remain available.

Constraints: Python 3.14+, no extra runtime dependencies, no original file writes, no upscaling, existing path/handle protections, source dimensions distinct from display dimensions. Quality 95 is an implementation choice, not a promise of pixel identity. Source PNG downloads remain PNG.

Tasks:
- [x] Backend failing tests then bootstrap/display/download routes and store methods; preserve revision, color/alpha/orientation, bounds.
- [x] Frontend failing tests then bootstrap integration, navigation scheduling, display/explicit-original and download UX.
- [x] Synthetic browser integration tests with delayed network, cancellation, left pin stability and download verification.
- [x] Compare generated display sizes and request counts; document measured versus inferred gains.
- [ ] Independent review, full Python/frontend/build/bundle checks, main publication and exact-commit CI.

Review focus: stale bootstrap on close/folder switch; original geometry versus smaller derivative; non-lossless labeling and explicit original; requests surviving fast navigation; same-name overwrite/cache invalidation.

Local verification: Python 127 passed/8 platform skips; frontend 131 passed; production build and bundle check passed. Independent review completed. Browser execution is pending GitHub CI because the local Chromium process cannot start in this sandbox.
