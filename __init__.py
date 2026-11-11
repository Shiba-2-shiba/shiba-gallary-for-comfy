"""ComfyUI custom-node entry point: a frontend extension, not a workflow node."""
from __future__ import annotations

import logging
import sys

if sys.version_info < (3, 14):
    raise RuntimeError('Shiba Gallery requires Python 3.14 or newer. Use the Python environment running ComfyUI.')

NODE_CLASS_MAPPINGS = {}
NODE_DISPLAY_NAME_MAPPINGS = {}
WEB_DIRECTORY = './web/dist'


def _register():
    try:
        import folder_paths
        from server import PromptServer
    except ModuleNotFoundError as error:
        # Importable for standalone tests without pretending ComfyUI is present.
        if error.name not in ('folder_paths', 'server'):
            raise
        return
    from .gallery_backend.routes import register_routes
    try:
        api = register_routes(PromptServer.instance.routes, folder_paths.get_output_directory())
        PromptServer.instance.app.on_cleanup.append(api.close)
    except (OSError, ValueError):
        logging.getLogger(__name__).warning('[Shiba Gallery] Output folder is unavailable. Check the ComfyUI output directory and restart.')


_register()
__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS', 'WEB_DIRECTORY']

