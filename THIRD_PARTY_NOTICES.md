# Third-party notices

## Design reference: PanicTitan/ComfyUI-Gallery

This project acknowledges **PanicTitan** and [ComfyUI-Gallery](https://github.com/PanicTitan/ComfyUI-Gallery), inspected at commit `74639e68846f64c9f561f3a7745529de76376a97` (v2.7.1).

The gallery workflow and extension architecture were used as design references. The implementation here is newly written; upstream React application, Python server, logos, images and dependency tree were not copied. The original MIT notice is retained in `licenses/PanicTitan-ComfyUI-Gallery-MIT.txt` for attribution and traceability. It does not declare all new code in this repository MIT-licensed.

Future copied or adapted files must record their upstream path, commit and changes here, and retain applicable notices in source and distributed bundles. A different framework or repository name does not remove obligations on copied material.

## New project license

The owner has not yet selected a license for newly authored code. No general open-source permission for new code is implied by the upstream notice. Decide this before public release.

## Runtime dependencies

Vue and its bundled runtime packages carry MIT notices, included with the distributed frontend. Python uses the host ComfyUI installation's aiohttp and Pillow. Their own licenses apply independently. Build and test dependencies are recorded in the lockfile and are not all shipped in the runtime bundle.
