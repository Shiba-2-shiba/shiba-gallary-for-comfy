"""Portable validation tests and Windows-only real filesystem coverage."""
import os
import struct
import sys
import time
from types import SimpleNamespace

import pytest


def directory_record(name, attributes=0x80, *, followed=False):
    """Build the documented FILE_FULL_DIR_INFO layout, independently of code."""
    encoded = name.encode('utf-16-le', errors='surrogatepass')
    size = (68 + len(encoded) + 7) & ~7
    record = bytearray(size)
    struct.pack_into('<II', record, 0, size if followed else 0, 0)
    struct.pack_into('<III', record, 56, attributes, len(encoded), 0)
    record[68:68 + len(encoded)] = encoded
    return bytes(record)


@pytest.mark.parametrize(('root', 'target', 'expected'), [
    ('C:\\Output', 'c:\\output\\folder\\image.png', True),
    ('C:\\Output\\', 'C:\\Output', True),
    ('\\\\?\\C:\\Output', 'C:\\output\\image.png', True),
    ('\\\\?\\UNC\\server\\share\\Output', '\\\\SERVER\\SHARE\\output\\a.png', True),
    ('C:\\', 'C:\\image.png', True),
    ('C:\\Output', 'C:\\Output-private\\image.png', False),
    ('C:\\Output', 'C:\\Output\\..\\private\\image.png', False),
    ('C:\\Output', 'D:\\Output\\image.png', False),
    ('C:\\Output', 'Output\\image.png', False),
    ('C:\\Output', '\\\\?\\GLOBALROOT\\Device\\HarddiskVolume1\\Output\\a.png', False),
    ('C:\\Straße', 'C:\\STRASSE\\image.png', False),
    ('\\\\server\\share\\Output', '\\\\server\\share2\\Output\\image.png', False),
])
def test_canonical_containment_requires_a_complete_path_component(root, target, expected):
    from gallery_backend.windows_io import _is_within_root
    assert _is_within_root(root, target) is expected


@pytest.mark.parametrize('relative', [
    '../private.png', 'a/../private.png', '/private.png', 'C:/private.png',
    'C:private.png', '\\\\server\\share', 'a\\private.png', 'image.png:secret',
    'a//b.png', 'a/./b.png', 'image.png\x00other', 'folder./image.png',
    'folder /image.png', 'a/', '.', 'NUL', 'con.png', 'COM1.png', 'LPT9',
])
def test_relative_path_rejects_escapes_and_windows_path_aliases(relative):
    from gallery_backend.windows_io import _relative_parts
    with pytest.raises(PermissionError):
        _relative_parts(relative)


def test_relative_path_accepts_root_and_unicode_posix_components():
    from gallery_backend.windows_io import _relative_parts
    assert _relative_parts('') == ()
    assert _relative_parts('日本語/image 1.png') == ('日本語', 'image 1.png')


def test_directory_buffer_reads_unicode_names_types_and_next_offsets():
    from gallery_backend.windows_io import _parse_directory_buffer
    data = (directory_record('日本語', 0x10, followed=True)
            + directory_record('image 🐕.png'))
    assert _parse_directory_buffer(data) == [
        ('日本語', True, False), ('image 🐕.png', False, True),
    ]


def test_directory_buffer_filters_dot_entries_reparse_points_and_devices():
    from gallery_backend.windows_io import _parse_directory_buffer
    data = b''.join(directory_record(name, attrs, followed=True) for name, attrs in [
        ('.', 0x10), ('..', 0x10), ('link.png', 0x400),
        ('junction', 0x410), ('device', 0x40),
    ]) + directory_record('safe.png')
    assert _parse_directory_buffer(data) == [('safe.png', False, True)]


@pytest.mark.parametrize('data', [
    b'', b'\0' * 67,
    struct.pack('<I', 8) + directory_record('image.png')[4:],
    struct.pack('<I', 4096) + directory_record('image.png')[4:],
    directory_record('image.png')[:60] + struct.pack('<I', 3) + directory_record('image.png')[64:],
    directory_record('image.png')[:60] + struct.pack('<I', 4096) + directory_record('image.png')[64:],
    directory_record('a/b.png'), directory_record('a\\b.png'), directory_record('a\x00b'),
])
def test_directory_buffer_rejects_malformed_lengths_offsets_and_names(data):
    from gallery_backend.windows_io import _parse_directory_buffer
    with pytest.raises(OSError):
        _parse_directory_buffer(data)


def test_change_time_reads_the_open_handle_change_field_in_nanoseconds(monkeypatch):
    import ctypes
    from gallery_backend import windows_io

    def get_information(handle, information_class, buffer, length):
        # Model the unavailable Win32 ABI boundary, keeping actual field
        # selection, fd-to-handle conversion, and units in production code.
        assert (handle, information_class, length) == (1017, 0, 40)
        data = struct.pack('<qqqqI4x', 11, 22, 33, 123456789, 0x80)
        ctypes.memmove(buffer, data, len(data))
        return 1

    monkeypatch.setattr(windows_io, '_api', lambda: SimpleNamespace(
        GetFileInformationByHandleEx=get_information))
    monkeypatch.setitem(sys.modules, 'msvcrt', SimpleNamespace(get_osfhandle=lambda fd: fd + 1000))
    assert windows_io.get_change_time(17) == 12345678900


windows_only = pytest.mark.skipif(os.name != 'nt', reason='requires the real Windows handle API')


@windows_only
def test_windows_file_descriptor_is_owned_binary_and_regular(tmp_path):
    from gallery_backend.windows_io import open_file
    image = tmp_path / '日本語' / 'image.png'
    image.parent.mkdir()
    image.write_bytes(b'\x00\r\n\x1a\xff')
    with os.fdopen(open_file(tmp_path, '日本語/image.png'), 'rb') as source:
        assert source.read() == b'\x00\r\n\x1a\xff'
        assert not os.get_inheritable(source.fileno())
    with pytest.raises(OSError):
        open_file(tmp_path, '日本語')


@windows_only
def test_windows_file_shares_read_write_and_delete(tmp_path):
    from gallery_backend.windows_io import open_file
    image = tmp_path / 'image.png'
    image.write_bytes(b'original')
    with os.fdopen(open_file(tmp_path, 'image.png'), 'rb') as source:
        with image.open('r+b') as writer:
            writer.write(b'changed!')
        image.rename(tmp_path / 'renamed.png')
        assert source.read() == b'changed!'


@windows_only
def test_windows_directory_listing_uses_handle_and_multiple_batches(tmp_path, monkeypatch):
    from gallery_backend.windows_io import list_entries
    for number in range(700):
        (tmp_path / (f'{number:04d}-' + 'x' * 50)).touch()
    (tmp_path / '日本語').mkdir()

    def forbid_path_scan(*args, **kwargs):
        pytest.fail('directory listing must not fall back to path-based scandir')

    monkeypatch.setattr(os, 'scandir', forbid_path_scan)
    entries = list_entries(tmp_path, '')
    assert len(entries) == 701
    assert ('日本語', True, False) in entries
    assert sum(is_file for _, _, is_file in entries) == 700


@windows_only
def test_windows_reparse_files_and_directories_are_rejected(tmp_path):
    from gallery_backend.windows_io import list_entries, open_file
    root = tmp_path / 'output'
    root.mkdir()
    outside = tmp_path / 'private'
    outside.mkdir()
    (outside / 'secret.png').write_bytes(b'private')
    try:
        (root / 'link.png').symlink_to(outside / 'secret.png')
        (root / 'junction').symlink_to(outside, target_is_directory=True)
    except OSError as error:
        pytest.skip(f'Windows symlink privilege unavailable: {error}')
    assert list_entries(root, '') == []
    with pytest.raises(PermissionError):
        open_file(root, 'link.png')
    with pytest.raises(PermissionError):
        open_file(root, 'junction/secret.png')
    with pytest.raises(PermissionError):
        list_entries(root, 'junction')


@windows_only
def test_windows_reparse_root_is_rejected(tmp_path):
    from gallery_backend.windows_io import list_entries
    real = tmp_path / 'real'
    real.mkdir()
    link = tmp_path / 'link'
    try:
        link.symlink_to(real, target_is_directory=True)
    except OSError as error:
        pytest.skip(f'Windows symlink privilege unavailable: {error}')
    with pytest.raises(PermissionError):
        list_entries(link, '')


@windows_only
def test_windows_actual_opened_handle_is_confined_and_closed_on_rejection(tmp_path, monkeypatch):
    import ctypes
    from gallery_backend import windows_io

    root = tmp_path / 'output'
    root.mkdir()
    outside = tmp_path / 'output-private' / 'secret.png'
    outside.parent.mkdir()
    outside.write_bytes(b'private')
    native_open = windows_io._open_native
    opened = []

    def redirect_target(kernel, path, *, directory):
        # Return a real disk handle outside root, as an open/lookup race could.
        # The production final-handle validation must reject it before reading.
        handle = native_open(kernel, path if directory else str(outside), directory=directory)
        opened.append(handle)
        return handle

    monkeypatch.setattr(windows_io, '_open_native', redirect_target)
    with pytest.raises(PermissionError):
        windows_io.open_file(root, 'requested.png')
    kernel = windows_io._api()
    for handle in opened:
        ctypes.set_last_error(0)
        assert kernel.GetFileType(handle) == 0
        assert ctypes.get_last_error() == 6  # ERROR_INVALID_HANDLE


@windows_only
def test_windows_reparse_point_inside_root_is_still_excluded(tmp_path):
    from gallery_backend.windows_io import open_file
    (tmp_path / 'real').mkdir()
    (tmp_path / 'real' / 'image.png').write_bytes(b'public')
    try:
        (tmp_path / 'alias').symlink_to(tmp_path / 'real', target_is_directory=True)
    except OSError as error:
        pytest.skip(f'Windows symlink privilege unavailable: {error}')
    with pytest.raises(PermissionError):
        open_file(tmp_path, 'alias/image.png')


@windows_only
def test_windows_change_time_tracks_same_size_overwrite_with_preserved_mtime(tmp_path):
    from gallery_backend.windows_io import get_change_time, open_file
    path = tmp_path / 'image.png'
    path.write_bytes(b'original')
    original_stat = path.stat()
    with os.fdopen(open_file(tmp_path, 'image.png'), 'rb') as source:
        before = get_change_time(source.fileno())
        time.sleep(0.02)
        with path.open('r+b') as writer:
            writer.write(b'changed!')
        os.utime(path, ns=(original_stat.st_atime_ns, original_stat.st_mtime_ns))
        assert path.stat().st_mtime_ns == original_stat.st_mtime_ns
        assert path.stat().st_size == original_stat.st_size
        assert get_change_time(source.fileno()) != before
