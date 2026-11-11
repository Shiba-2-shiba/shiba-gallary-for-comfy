# Image delivery changes

This change implements three user-approved improvements: reduce serial startup requests, suppress expensive requests during rapid navigation, and show a high-quality lightweight derivative by default. Source files are never changed.

## Behavior

- `GET /shiba-gallery/bootstrap` returns the selected folder and first image page without requiring a recursive folder enumeration first. Remaining folders load independently. Unknown or deleted folder IDs fall back safely to output. Existing directory traversal, symlink and handle checks remain enforced.
- Immediate selection shows the available thumbnail. Arrow/button stepping waits 250 ms after the last step before high-quality viewing and metadata requests. Direct selection, settings expansion and explicit original requests bypass the wait. The pinned left image is independent of right navigation.
- Normal viewing uses a long-edge-at-most-1024 WebP at quality 95. Small images are not upscaled. This is lossy and not a promise of pixel-identical appearance. Metadata, source dimensions, original viewing and download remain distinct.
- Explicit original/1:1 remains available for detailed evaluation. Download returns the original file byte-for-byte, retaining PNG metadata and extension. Existing non-PNG sources are downloaded in their original format, not renamed to PNG.
- Display images use the existing bounded temporary cache and two-worker image-processing limit. Cache identity includes source revision and display format/quality policy. EXIF orientation is applied; alpha and compatible RGB color profiles are retained. Unsupported/non-RGB profiles are refused explicitly rather than rendered with an incorrect profile; Original and Download remain available. Saved workflow text is not copied into WebP derivatives.

## Measurement

`python benchmarks/display_delivery.py` generates deterministic noisy fixtures, measures first conversion and cached retrieval, verifies size limits and unchanged source bytes. The checked-in result uses Python 3.14.10 and Pillow 13.0.0, three repetitions. This is not a network/Paperspace benchmark, and not a visual quality approval of the user's images.

- 1024×1024: PNG 3,151,221 bytes → WebP 1,004,506 bytes.
- 832×1248: PNG 3,120,672 bytes → WebP 615,772 bytes (683×1024).
- 320×240: remains 320×240, with no enlargement.

Random-noise fixtures are deliberately hard to compress; real images vary. Generation adds CPU work on a cold cache. Network savings must be compared against generation time and GPU-generation interference on the actual server.


## Verification targets

Bootstrap response can begin image rendering without waiting for the folder tree; no duplicate first-page request. Delayed/stale responses cannot reopen a closed session. Fast navigation displays a preview and starts only settled heavy requests. Explicit original and settings bypass waits. Download returns original bytes. Comparison, zoom/pan and source-pixel scale remain valid. Tests cover source overwrite and obsolete requests in addition to happy paths.
