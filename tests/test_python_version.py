"""Minimum-runtime requirement is reported before ComfyUI registration."""
import runpy
import sys
from pathlib import Path

import pytest


ENTRY_POINT = Path(__file__).resolve().parents[1] / '__init__.py'


@pytest.mark.parametrize('version', [(3, 12, 0), (3, 13, 9)])
def test_unsupported_python_fails_with_actionable_requirement(monkeypatch, version):
    with monkeypatch.context() as context:
        context.setattr(sys, 'version_info', version)
        context.setitem(sys.modules, 'folder_paths', None)
        with pytest.raises(RuntimeError, match=r'Shiba Gallery requires Python 3\.14 or newer'):
            runpy.run_path(str(ENTRY_POINT))


def test_python314_can_import_without_comfyui_for_standalone_tools(monkeypatch):
    with monkeypatch.context() as context:
        context.setattr(sys, 'version_info', (3, 14, 0))
        context.setitem(sys.modules, 'folder_paths', None)
        module = runpy.run_path(str(ENTRY_POINT))
    assert module['NODE_CLASS_MAPPINGS'] == {}
    assert module['WEB_DIRECTORY'] == './web/dist'
