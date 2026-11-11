"""Fail-closed Windows file access and handle-based directory enumeration.

The configured root is already resolved by the caller. Reparse points are
excluded, including in intermediate components. Every opened component is
checked against the final path of the open root before its contents are used.
Directory handles stay open without delete sharing while the operation runs;
file handles permit read/write/delete sharing so ComfyUI can keep writing.

Requires the modern Windows GetFileInformationByHandleEx directory APIs. There
is deliberately no path-based listing fallback. Only ``open_file`` transfers
handle ownership to its caller, as a regular Python file descriptor.
"""
from __future__ import annotations

import ctypes
import errno
import ntpath
import os
import struct
from pathlib import Path

_DIRECTORY = 0x10
_DEVICE = 0x40
_REPARSE_POINT = 0x400
_INVALID_HANDLE = ctypes.c_void_p(-1).value
_kernel32 = None


def _relative_parts(relative: str) -> tuple[str, ...]:
    if not isinstance(relative, str):
        raise PermissionError('Invalid relative path')
    if not relative:
        return ()
    parts = tuple(relative.split('/'))
    devices = {'CON', 'PRN', 'AUX', 'NUL', 'CONIN$', 'CONOUT$'}
    devices.update(prefix + number for prefix in ('COM', 'LPT')
                   for number in '123456789¹²³')
    for part in parts:
        if (not part or part in ('.', '..') or part.endswith(('.', ' '))
                or any(character in '\\:*?"<>|' or ord(character) < 32 for character in part)
                or part.split('.')[0].rstrip(' ').upper() in devices):
            raise PermissionError('Invalid relative path')
    return parts


def _canonical_components(path: str) -> tuple[str, ...]:
    path = path.replace('/', '\\')
    if path[:8].lower() == '\\\\?\\unc\\':
        path = '\\\\' + path[8:]
    elif path.startswith('\\\\?\\'):
        path = path[4:]
    if not path or '\x00' in path or path.startswith('\\\\.\\'):
        raise ValueError('Invalid final path')
    drive, tail = ntpath.splitdrive(ntpath.normpath(path))
    if not drive or (tail and not tail.startswith('\\')):
        raise ValueError('Final path is not absolute')
    if drive.startswith('\\\\'):
        if len(drive[2:].split('\\')) != 2:
            raise ValueError('Invalid UNC root')
    elif len(drive) != 2 or drive[1] != ':' or not drive[0].isascii() or not drive[0].isalpha():
        raise ValueError('Unsupported final path namespace')
    if not tail and not drive.startswith('\\\\'):
        raise ValueError('Drive-relative path')
    return (drive,) + tuple(part for part in tail.split('\\') if part)


def _ordinal_equal(left: str, right: str) -> bool:
    if os.name == 'nt':
        # Python casefold merges distinct Windows names such as Straße/STRASSE.
        # Match Windows' ordinal comparison instead of linguistic case folding.
        result = _api().CompareStringOrdinal(left, -1, right, -1, True)
        if not result:
            raise ctypes.WinError(ctypes.get_last_error())
        return result == 2  # CSTR_EQUAL
    # Portable validation tests do not load Windows DLLs. lower(), unlike
    # casefold(), does not turn German sharp-s into two ASCII characters.
    return left.lower() == right.lower()


def _is_within_root(root: str, target: str) -> bool:
    """Compare complete canonical path components, not a string prefix."""
    try:
        root_parts = _canonical_components(root)
        target_parts = _canonical_components(target)
    except (TypeError, ValueError):
        return False
    return (len(target_parts) >= len(root_parts)
            and all(_ordinal_equal(left, right)
                    for left, right in zip(root_parts, target_parts)))


def _parse_directory_buffer(data: bytes) -> list[tuple[str, bool, bool]]:
    """Parse FILE_FULL_DIR_INFO records (FileName begins at byte offset 68)."""
    entries = []
    offset = 0
    while True:
        if len(data) - offset < 68:
            raise OSError('Truncated directory information')
        next_offset = struct.unpack_from('<I', data, offset)[0]
        attributes, name_bytes = struct.unpack_from('<II', data, offset + 56)
        end = offset + 68 + name_bytes
        if not name_bytes or name_bytes % 2 or end > len(data):
            raise OSError('Invalid directory filename length')
        if next_offset and (next_offset % 8 or next_offset < 68 + name_bytes
                            or offset + next_offset + 68 > len(data)):
            raise OSError('Invalid directory record offset')
        name = data[offset + 68:end].decode('utf-16-le', errors='surrogatepass')
        if name not in ('.', '..'):
            try:
                if len(_relative_parts(name)) != 1:
                    raise PermissionError('Invalid filename')
            except PermissionError:
                raise OSError('Invalid directory filename') from None
            if not attributes & (_REPARSE_POINT | _DEVICE):
                is_directory = bool(attributes & _DIRECTORY)
                entries.append((name, is_directory, not is_directory))
        if not next_offset:
            return entries
        offset += next_offset


def _api():
    global _kernel32
    if os.name != 'nt':
        raise OSError(errno.ENOSYS, 'Windows filesystem handles are required')
    if _kernel32 is None:
        kernel = ctypes.WinDLL('kernel32', use_last_error=True)
        dword, handle, boolean = ctypes.c_uint32, ctypes.c_void_p, ctypes.c_int32
        kernel.CreateFileW.argtypes = [ctypes.c_wchar_p, dword, dword, handle, dword, dword, handle]
        kernel.CreateFileW.restype = handle
        kernel.CloseHandle.argtypes = [handle]
        kernel.CloseHandle.restype = boolean
        kernel.GetFileType.argtypes = [handle]
        kernel.GetFileType.restype = dword
        kernel.GetFileInformationByHandleEx.argtypes = [handle, ctypes.c_int32, handle, dword]
        kernel.GetFileInformationByHandleEx.restype = boolean
        kernel.GetFinalPathNameByHandleW.argtypes = [handle, ctypes.c_wchar_p, dword, dword]
        kernel.GetFinalPathNameByHandleW.restype = dword
        kernel.CompareStringOrdinal.argtypes = [ctypes.c_wchar_p, ctypes.c_int32,
                                               ctypes.c_wchar_p, ctypes.c_int32, boolean]
        kernel.CompareStringOrdinal.restype = ctypes.c_int32
        _kernel32 = kernel
    return _kernel32


def _final_path(kernel, handle: int) -> str:
    capacity = 512
    while capacity <= 65536:
        buffer = ctypes.create_unicode_buffer(capacity)
        length = kernel.GetFinalPathNameByHandleW(handle, buffer, capacity, 0)
        if not length:
            raise ctypes.WinError(ctypes.get_last_error())
        if length < capacity:
            return buffer.value
        capacity = length + 1
    raise OSError('Final path exceeds the supported length')


def _open_native(kernel, path: str, *, directory: bool) -> int:
    # OPEN_EXISTING; BACKUP_SEMANTICS permits directories; OPEN_REPARSE_POINT
    # opens the final link itself so its attributes can be rejected safely.
    flags = 0x02000000 | 0x00200000
    share = 0x1 | 0x2 | (0 if directory else 0x4)
    handle = kernel.CreateFileW(path, 0x80000000, share, None, 3, flags, None)
    if handle == _INVALID_HANDLE:
        raise ctypes.WinError(ctypes.get_last_error())
    try:
        attributes = (ctypes.c_uint32 * 2)()
        if not kernel.GetFileInformationByHandleEx(handle, 9, ctypes.byref(attributes), 8):
            raise ctypes.WinError(ctypes.get_last_error())
        if attributes[0] & (_REPARSE_POINT | _DEVICE) or kernel.GetFileType(handle) != 1:
            raise PermissionError('Reparse points and non-disk files are excluded')
        actual_directory = bool(attributes[0] & _DIRECTORY)
        if directory and not actual_directory:
            raise NotADirectoryError('Expected a directory')
        if not directory and actual_directory:
            raise IsADirectoryError('Expected a regular file')
        return handle
    except BaseException:
        kernel.CloseHandle(handle)
        raise


def _open_verified(kernel, root: Path, relative: str, *, directory: bool) -> list[int]:
    parts = _relative_parts(relative)
    if not directory and not parts:
        raise IsADirectoryError('Expected a regular file')
    handles = []
    try:
        handles.append(_open_native(kernel, os.fspath(root), directory=True))
        path = _final_path(kernel, handles[0])
        if not _is_within_root(path, path):
            raise PermissionError('Unsupported output root')
        for index, part in enumerate(parts):
            path = ntpath.join(path, part)
            handles.append(_open_native(kernel, path,
                                        directory=index < len(parts) - 1 or directory))
            # Query BOTH actual handles after opening, never trust resolved
            # strings or attributes obtained before the target was opened.
            if not _is_within_root(_final_path(kernel, handles[0]),
                                   _final_path(kernel, handles[-1])):
                raise PermissionError('Opened path is outside the output root')
        return handles
    except BaseException:
        for handle in reversed(handles):
            kernel.CloseHandle(handle)
        raise


def open_file(root: Path, relative: str) -> int:
    """Return an owned, binary, non-inheritable Python fd for a regular file."""
    kernel = _api()
    handles = _open_verified(kernel, root, relative, directory=False)
    try:
        import msvcrt
        descriptor = msvcrt.open_osfhandle(handles[-1], os.O_RDONLY | os.O_BINARY | os.O_NOINHERIT)
        handles.pop()  # The CRT now owns the native handle.
        return descriptor
    finally:
        for handle in reversed(handles):
            kernel.CloseHandle(handle)


def get_change_time(descriptor: int) -> int:
    """Return the opened file's ChangeTime in nanoseconds since 1601-01-01.

    Windows ``stat().st_ctime`` is creation time, not a change counter. Reading
    FileBasicInfo from this same open file detects same-size rewrites even when
    the writer restores LastWriteTime. The caller retains ownership of the fd.
    """
    kernel = _api()
    import msvcrt
    # FILE_BASIC_INFO: four LARGE_INTEGER timestamps, DWORD attributes, padding.
    buffer = ctypes.create_string_buffer(40)
    if not kernel.GetFileInformationByHandleEx(msvcrt.get_osfhandle(descriptor), 0,
                                              buffer, len(buffer)):
        raise ctypes.WinError(ctypes.get_last_error())
    return struct.unpack_from('<q', buffer.raw, 24)[0] * 100


def list_entries(root: Path, relative: str) -> list[tuple[str, bool, bool]]:
    """List only the verified directory handle; never enumerate by pathname."""
    kernel = _api()
    handles = _open_verified(kernel, root, relative, directory=True)
    entries = []
    information_class = 15  # FileFullDirectoryRestartInfo for the first batch.
    try:
        while True:
            buffer = ctypes.create_string_buffer(64 * 1024)
            if not kernel.GetFileInformationByHandleEx(handles[-1], information_class,
                                                      buffer, len(buffer)):
                error = ctypes.get_last_error()
                if error == 18:  # ERROR_NO_MORE_FILES
                    return entries
                raise ctypes.WinError(error)
            entries.extend(_parse_directory_buffer(buffer.raw))
            information_class = 14  # FileFullDirectoryInfo continues enumeration.
    finally:
        for handle in reversed(handles):
            kernel.CloseHandle(handle)
