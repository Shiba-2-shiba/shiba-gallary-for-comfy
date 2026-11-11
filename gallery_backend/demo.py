"""Local synthetic UI harness: python -m gallery_backend.demo --port 8189.

This is not a ComfyUI compatibility test. All fixtures are freshly generated;
no user output folder is read and no external scripts or services are loaded.
"""
from __future__ import annotations

import argparse
import json
import os
import tempfile
from pathlib import Path

from aiohttp import web
from PIL import Image, ImageDraw, PngImagePlugin

from .routes import create_app


def _make_fixtures(root, count):
    for index in range(count):
        size = (1024, 768) if index % 5 == 0 else (768, 1024) if index % 7 == 0 else (1024, 1024)
        image = Image.new('RGB', size, (17 + index * 17 % 90, 26 + index * 11 % 90, 46 + index * 29 % 120))
        drawing = ImageDraw.Draw(image)
        for ring in range(9, 0, -1):
            radius = ring * 42
            center = (size[0] // 2 + index % 3 * 12, size[1] // 2)
            color = (100 + ring * 12, (index * 31 + ring * 24) % 200 + 40, 220 - ring * 10)
            drawing.ellipse((center[0] - radius, center[1] - radius, center[0] + radius, center[1] + radius), outline=color, width=14)
        drawing.text((32, 32), f'SYNTHETIC IMAGE {index + 1:03d} / MODEL {index % 3 + 1}', fill='white', stroke_width=1)
        prompt = {
            '1': {'class_type': 'CheckpointLoaderSimple', 'inputs': {'ckpt_name': f'synthetic-model-{index % 3 + 1}.safetensors'}},
            '2': {'class_type': 'CLIPTextEncode', 'inputs': {'text': 'Synthetic concentric shapes', 'clip': ['1', 1]}},
            '3': {'class_type': 'KSampler', 'inputs': {'seed': 9007199254740991 + index, 'cfg': 6 + index % 4, 'steps': 20 + index % 3 * 5, 'model': ['1', 0], 'positive': ['2', 0]}},
            '4': {'class_type': 'LoraLoader', 'inputs': {'lora_name': 'synthetic-detail.safetensors', 'strength_model': 0.5 + index % 3 * 0.1, 'strength_clip': 0.8}},
            '5': {'class_type': 'SyntheticAFM', 'inputs': {'block_weights': [1, 0.5 + index % 3 * 0.2, 1], 'custom_setting': f'variant-{index % 2}'}},
        }
        workflow = {'nodes': [{'id': int(key), 'type': node['class_type'], 'widgets_values': list(node['inputs'].values())}
                              for key, node in prompt.items()]}
        info = PngImagePlugin.PngInfo()
        if index % 11 != 10:
            info.add_text('prompt', json.dumps(prompt))
            info.add_text('workflow', json.dumps(workflow))
        path = root / f'synthetic_{index + 1:03d}.png'
        image.save(path, pnginfo=info)
        stamp = 1_700_000_000_000_000_000 + index * 1_000_000_000
        os.utime(path, ns=(stamp, stamp))
    nested = root / 'alternate'
    nested.mkdir()
    Image.new('RGB', (1200, 600), (20, 150, 110)).save(nested / 'different-folder.png')


def create_demo_app(*, count=40):
    temporary = tempfile.TemporaryDirectory(prefix='shiba-gallery-demo-')
    output = Path(temporary.name)
    _make_fixtures(output, count)
    app = create_app(output, scan_interval=0.5)
    assets = Path(__file__).resolve().parents[1] / 'web' / 'dist'

    async def index(_request):
        return web.Response(text='''<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Shiba Gallery synthetic demo</title><style>body{background:#121722;color:#ced6e3;font:16px system-ui;margin:4rem}button{padding:12px}h1{color:#57d8ce}</style></head><body><h1>Synthetic ComfyUI host</h1><p>This harness tests Gallery with synthetic PNGs only. It is not a real ComfyUI runtime.</p><p>Use the Gallery button on the right to open the extension.</p><button id="workflow-test">Workflow placeholder</button><script type="module" src="/extensions/shiba-gallery/shiba-gallery.js"></script></body></html>''', content_type='text/html')

    async def app_script(_request):
        return web.Response(text='export const app={registerExtension(extension){extension.setup();}};', content_type='application/javascript')

    async def api_script(_request):
        return web.Response(text='export const api={apiURL(path){return path},addEventListener(){},removeEventListener(){}};', content_type='application/javascript')

    async def cleanup(_app):
        temporary.cleanup()

    app.router.add_get('/', index)
    app.router.add_get('/scripts/app.js', app_script)
    app.router.add_get('/scripts/api.js', api_script)
    app.router.add_static('/extensions/shiba-gallery/', assets, follow_symlinks=False)
    app.on_cleanup.append(cleanup)
    return app


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8189)
    parser.add_argument('--host', default='127.0.0.1')
    parser.add_argument('--count', type=int, default=40)
    options = parser.parse_args()
    if not 1 <= options.count <= 500:
        parser.error('--count must be between 1 and 500')
    web.run_app(create_demo_app(count=options.count), host=options.host, port=options.port)


if __name__ == '__main__':
    main()
