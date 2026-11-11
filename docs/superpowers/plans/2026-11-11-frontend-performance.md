# Focused frontend performance work

Scope: lazy preparation of saved-setting details and frame-coalesced pan/zoom. No dependency update, Worker, or broad reactivity rewrite.

1. Verify the frontend snapshot against main f60b18c and run the baseline suite.
2. Test collapsed detail sections for absent expensive content; implement on-demand rendering while preserving exact copy and live node matching.
3. Test burst pointer/wheel input, final pointer position, linked transforms, reset/navigation, and unmount cancellation. Coalesce frame publication without dropping accumulated input.
4. Add production-browser coverage for lazy details and pan completion. Record deterministic work-count reduction rather than claiming unmeasured latency gains.
5. Run full frontend tests, typecheck, build, bundle smoke, and available browser tests. Independently review changes.
6. Publish only scoped changes and generated assets over the latest remote tree with an expected-head lease. Verify final CI and remote files.
