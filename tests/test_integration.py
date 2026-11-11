import asyncio
import importlib.util
import sys
from pathlib import Path
from types import SimpleNamespace

from aiohttp import web
from aiohttp.test_utils import TestClient, TestServer


def test_comfy_custom_node_import_registers_routes_and_served_extension(tmp_path, monkeypatch):
    root = Path(__file__).resolve().parents[1]
    server = SimpleNamespace(routes=web.RouteTableDef(), app=web.Application())
    monkeypatch.setitem(sys.modules, 'folder_paths', SimpleNamespace(get_output_directory=lambda: str(tmp_path)))
    monkeypatch.setitem(sys.modules, 'server', SimpleNamespace(PromptServer=SimpleNamespace(instance=server)))
    spec = importlib.util.spec_from_file_location('shiba_gallery_test', root / '__init__.py', submodule_search_locations=[str(root)])
    module = importlib.util.module_from_spec(spec)
    monkeypatch.setitem(sys.modules, spec.name, module)
    spec.loader.exec_module(module)
    assert (root / module.WEB_DIRECTORY / 'shiba-gallery.js').is_file()
    server.app.add_routes(server.routes)

    async def exercise():
        async with TestClient(TestServer(server.app)) as client:
            response = await client.get('/shiba-gallery/folders')
            assert response.status == 200
            assert (await response.json())['folders'][0]['name'] == 'output'
    asyncio.run(exercise())


def test_demo_serves_synthetic_images_and_local_extension_only():
    from gallery_backend.demo import create_demo_app

    async def exercise():
        async with TestClient(TestServer(create_demo_app(count=4))) as client:
            index = await client.get('/')
            assert index.status == 200
            assert '/extensions/shiba-gallery/shiba-gallery.js' in await index.text()
            assert (await client.get('/scripts/app.js')).status == 200
            assert (await client.get('/scripts/api.js')).status == 200
            assert (await client.get('/extensions/shiba-gallery/shiba-gallery.js')).status == 200
            folders = (await (await client.get('/shiba-gallery/folders')).json())['folders']
            output = next(folder for folder in folders if folder['name'] == 'output')
            rows = (await (await client.get('/shiba-gallery/images', params={'folder_id': output['id']})).json())['images']
            assert len(rows) == 4
    asyncio.run(exercise())
