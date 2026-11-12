# Third-party notices

## Design reference: PanicTitan/ComfyUI-Gallery

This project acknowledges **PanicTitan** and [ComfyUI-Gallery](https://github.com/PanicTitan/ComfyUI-Gallery), inspected at commit `74639e68846f64c9f561f3a7745529de76376a97` (v2.7.1).

The gallery workflow and extension architecture were used as design references. The implementation here is newly written; upstream React application, Python server, logos, images and dependency tree were not copied. The original MIT notice is retained in `licenses/PanicTitan-ComfyUI-Gallery-MIT.txt` for attribution and traceability. The license for newly authored code is stated separately in the root `LICENSE`.

Future copied or adapted files must record their upstream path, commit and changes here, and retain applicable notices in source and distributed bundles. A different framework or repository name does not remove obligations on copied material.

## New project license

Newly authored code is licensed under the MIT License in [`LICENSE`](LICENSE), Copyright (c) 2026 Shiba-2-shiba. This does not replace or remove the copyright and license notices applicable to upstream material and dependencies.

## Runtime dependencies

Vue and its bundled runtime packages carry MIT notices, included with the distributed frontend. Python uses the host ComfyUI installation's aiohttp and Pillow. Their own licenses apply independently. Build and test dependencies are recorded in the lockfile and are not all shipped in the runtime bundle.
