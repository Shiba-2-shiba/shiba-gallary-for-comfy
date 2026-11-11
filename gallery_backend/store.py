"""Local, read-only output catalog and bounded per-process caches.

All public operations are synchronous on purpose: routes run them on a bounded
worker pool, never on ComfyUI's asyncio event loop. Source images are not changed.
"""
from __future__ import annotations

import base64
import hashlib
import hmac
import io
import json
import os
import secrets
import stat
import struct
import tempfile
import threading
import time
from collections import OrderedDict
from contextlib import closing, contextmanager
from pathlib import Path, PurePosixPath
from typing import BinaryIO

PNG_SIGNATURE = b'\x89PNG\r\n\x1a\n'
PNG_END = b'\x00\x00\x00\x00IEND\xaeB`\x82'
EXTENSIONS = {'.png', '.jpg', '.jpeg', '.webp'}
MIME_TYPES = {'.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp'}


class GalleryError(Exception):
    """An expected error with a public, path-free message."""

    def __init__(self, status: int, code: str, message: str):
        super().__init__(message)
        self.status, self.code = status, code


class GalleryStore:
    def __init__(self, output_root, *, scan_interval=2.0, cache_bytes=256 * 1024 * 1024,
                 max_file_bytes=128 * 1024 * 1024, max_pixels=32_000_000,
                 max_metadata_bytes=2 * 1024 * 1024, snapshot_ttl=120.0,
                 max_snapshots=16, max_files=100_000):
        self.root = Path(output_root).resolve(strict=True)
        if not self.root.is_dir():
            raise ValueError('The output root must be a directory')
        self.scan_interval = scan_interval
        self.cache_bytes = cache_bytes
        self.max_file_bytes = max_file_bytes
        self.max_pixels = max_pixels
        self.max_metadata_bytes = max_metadata_bytes
        self.snapshot_ttl, self.max_snapshots, self.max_files = snapshot_ttl, max_snapshots, max_files
        self._secret = secrets.token_bytes(32)
        self._boot = secrets.token_hex(16)
        self._lock = threading.RLock()
        # Serialize catalog updates without blocking an already-selected image.
        self._scan_lock = threading.RLock()
        self._folders = {}
        self._folders_scanned = float('-inf')
        self._indexes = OrderedDict()
        self._records = {}
        self._snapshots = OrderedDict()
        self._metadata_cache = OrderedDict()
        # Cache bookkeeping never holds a lock while decoding/encoding pixels.
        self._thumbnail_lock = threading.Lock()
        self._thumbnail_entries = OrderedDict()
        self._thumbnail_bytes = 0
        self._thumbnail_flights = {}
        # Keep the existing HTTP worker budget: no unbounded CPU/memory growth.
        self._thumbnail_slots = threading.BoundedSemaphore(2)
        self._temporary = tempfile.TemporaryDirectory(prefix='shiba-gallery-')
        self.cache_dir = Path(self._temporary.name)
        self._root_fd = None
        if os.open in os.supports_dir_fd and hasattr(os, 'O_NOFOLLOW'):
            self._root_fd = os.open(self.root, os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW)

    def __enter__(self):
        return self

    def __exit__(self, *_):
        self.close()

    def close(self):
        """Release the root handle and remove only our private temporary cache."""
        with self._lock:
            if self._root_fd is not None:
                os.close(self._root_fd)
                self._root_fd = None
            self._temporary.cleanup()

    @staticmethod
    def _id(kind, relative):
        return kind + hashlib.sha256(relative.encode('utf-8', errors='surrogatepass')).hexdigest()[:32]

    def _revision(self, metadata, handle=None):
        change_time = metadata.st_ctime_ns
        if os.name == 'nt':
            from .windows_io import get_change_time
            change_time = get_change_time(handle)
        values = (self._boot, metadata.st_dev, metadata.st_ino, metadata.st_size,
                  metadata.st_mtime_ns, change_time)
        return hashlib.sha256(repr(values).encode()).hexdigest()[:32]

    def _open_path(self, relative, *, directory=False):
        """Open each component without following symlinks, including after scans.

        POSIX uses descriptor-relative opens to avoid check/open races. Windows
        validates the actual opened handle against the opened output root.
        Unsupported platforms fail closed; clients never supply paths.
        """
        parts = PurePosixPath(relative).parts
        if PurePosixPath(relative).is_absolute() or any(p in ('..', '') for p in parts):
            raise GalleryError(404, 'not_found', 'Image or folder is unavailable')
        try:
            if self._root_fd is not None:
                opened_root = os.fstat(self._root_fd)
                try:
                    current_root = os.stat(self.root, follow_symlinks=False)
                except OSError:
                    raise GalleryError(503, 'root_unavailable', 'The output folder is unavailable') from None
                if (opened_root.st_dev, opened_root.st_ino) != (current_root.st_dev, current_root.st_ino):
                    raise GalleryError(503, 'root_unavailable', 'The output folder was replaced; restart ComfyUI to reconnect it')
                handle = os.dup(self._root_fd)
                try:
                    for index, part in enumerate(parts):
                        flags = os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK
                        if index < len(parts) - 1 or directory:
                            flags |= os.O_DIRECTORY
                        next_handle = os.open(part, flags, dir_fd=handle)
                        os.close(handle)
                        handle = next_handle
                    return handle
                except BaseException:
                    os.close(handle)
                    raise
            if os.name == 'nt' and not directory:
                from .windows_io import open_file
                return open_file(self.root, relative)
            raise GalleryError(503, 'platform_unsupported', 'Secure gallery filesystem access is unavailable on this platform')
        except OSError:
            raise GalleryError(404, 'not_found', 'Image or folder is unavailable') from None

    def _entries(self, relative):
        if os.name == 'nt':
            from .windows_io import list_entries
            try:
                return list_entries(self.root, relative)
            except OSError:
                raise GalleryError(404, 'not_found', 'Image or folder is unavailable') from None
        handle = self._open_path(relative, directory=True)
        try:
            # scandir(fd) avoids a symlink swap between validation and listing.
            target = handle if os.scandir in os.supports_fd else self.root / relative
            with os.scandir(target) as entries:
                return [(entry.name, entry.is_dir(follow_symlinks=False),
                         entry.is_file(follow_symlinks=False)) for entry in entries]
        finally:
            os.close(handle)

    def list_folders(self):
        with self._scan_lock:
            now = time.monotonic()
            if now - self._folders_scanned >= self.scan_interval:
                pending = ['']
                folders = {}
                while pending:
                    relative = pending.pop()
                    try:
                        entries = self._entries(relative)
                    except GalleryError as error:
                        if error.code == 'platform_unsupported':
                            raise
                        if not relative:
                            raise GalleryError(503, 'root_unavailable', 'The output folder is unavailable') from None
                        continue
                    folders[self._id('f_', relative)] = relative
                    if len(folders) > 4096:
                        raise GalleryError(413, 'folder_limit', 'There are too many output folders')
                    for name, is_dir, _ in entries:
                        if is_dir and len(PurePosixPath(relative).parts) < 32:
                            pending.append(str(PurePosixPath(relative, name)))
                self._folders = folders
                self._folders_scanned = now
            ordered = sorted(self._folders.items(), key=lambda pair: (pair[1] != '', pair[1]))
            return {'folders': [{'id': key, 'name': relative or 'output'} for key, relative in ordered]}

    def _dimensions(self, source, suffix):
        if suffix == '.png':
            header = source.read(33)
            if len(header) < 33 or header[:8] != PNG_SIGNATURE or header[8:16] != b'\x00\x00\x00\x0dIHDR':
                return None, None
            source.seek(-12, os.SEEK_END)
            if source.read(12) != PNG_END:
                raise GalleryError(425, 'image_pending', 'The image is still being written')
            return struct.unpack('>II', header[16:24])
        # Header parsing, not full resolution decoding. Metadata is never sent
        # with a list response or required to complete the catalog.
        from PIL import Image
        try:
            with Image.open(source) as image:
                return image.size
        except (OSError, ValueError, Image.DecompressionBombError):
            return None, None

    def _catalog_entries(self, relative):
        """Yield cheap file identity data without opening image contents.

        POSIX stat calls are relative to the verified directory descriptor and
        never follow symlinks. Windows retains per-file native handle checks
        because its creation time is not an overwrite-sensitive change time.
        Every image selected for a page is subsequently opened and validated.
        """
        if os.name == 'nt' or os.scandir not in os.supports_fd:
            for name, _, is_file in self._entries(relative):
                if not is_file or Path(name).suffix.lower() not in EXTENSIONS:
                    continue
                try:
                    with os.fdopen(self._open_path(str(PurePosixPath(relative, name))), 'rb') as source:
                        metadata = os.fstat(source.fileno())
                        yield name, metadata, self._revision(metadata, source.fileno())
                except (GalleryError, OSError, ValueError):
                    continue
            return
        handle = self._open_path(relative, directory=True)
        try:
            with os.scandir(handle) as entries:
                for entry in entries:
                    if Path(entry.name).suffix.lower() not in EXTENSIONS:
                        continue
                    try:
                        metadata = entry.stat(follow_symlinks=False)
                        if stat.S_ISREG(metadata.st_mode):
                            yield entry.name, metadata, self._revision(metadata)
                    except OSError:
                        continue
        finally:
            os.close(handle)

    def _scan_folder(self, folder_id):
        if folder_id not in self._folders:
            self.list_folders()
        if folder_id not in self._folders:
            raise GalleryError(404, 'folder_not_found', 'The selected folder is unavailable')
        relative = self._folders[folder_id]
        records = []
        old = self._indexes.get(folder_id)
        old_by_path = {row['_path']: row for row in old[1]} if old else {}
        with closing(self._catalog_entries(relative)) as entries:
            for name, metadata, revision in entries:
                if not stat.S_ISREG(metadata.st_mode) or metadata.st_size > self.max_file_bytes:
                    continue
                path = str(PurePosixPath(relative, name))
                previous = old_by_path.get(path)
                if previous and previous['revision'] == revision:
                    row = previous
                else:
                    row = {'id': self._id('i_', path), 'folder_id': folder_id,
                           'name': name, 'revision': revision, 'mtime_ns': metadata.st_mtime_ns,
                           'width': None, 'height': None, '_path': path, '_ready': False}
                records.append(row)
                if len(records) > self.max_files:
                    raise GalleryError(413, 'image_limit', 'There are too many images in this folder')
        records.sort(key=lambda row: (-row['mtime_ns'], row['_path']))
        version = hashlib.sha256(''.join(row['id'] + row['revision'] for row in records).encode()).hexdigest()[:32]
        # Build replacements outside the lookup lock too: a large folder must
        # not block selected originals while N record mappings are updated.
        replacements = self._records.copy()
        for row in (old[1] if old else []):
            replacements.pop(row['id'], None)
        replacements.update({row['id']: row for row in records})
        indexes = self._indexes.copy()
        indexes[folder_id] = (time.monotonic(), tuple(records), version)
        indexes.move_to_end(folder_id)
        while len(indexes) > 16:
            _, (_, expired, _) = indexes.popitem(last=False)
            for row in expired:
                replacements.pop(row['id'], None)
        with self._lock:
            self._records, self._indexes = replacements, indexes
        return self._indexes[folder_id]

    def _prepare_row(self, row):
        """Read dimensions/completion only for a requested page, never all N."""
        if row.get('_ready'):
            return True
        try:
            with os.fdopen(self._open_path(row['_path']), 'rb') as source:
                metadata = os.fstat(source.fileno())
                if not stat.S_ISREG(metadata.st_mode) or self._revision(metadata, source.fileno()) != row['revision']:
                    return False
                width, height = self._dimensions(source, Path(row['name']).suffix.lower())
                self._check_unchanged(source, row['revision'])
                row.update(width=width, height=height, _ready=True)
                return True
        except (GalleryError, OSError, ValueError):
            return False

    def _cursor(self, snapshot_id, offset, folder_id):
        payload = json.dumps([snapshot_id, offset, folder_id], separators=(',', ':')).encode()
        signature = hmac.new(self._secret, payload, hashlib.sha256).digest()
        return base64.urlsafe_b64encode(payload + signature).decode().rstrip('=')

    def _parse_cursor(self, cursor, folder_id):
        try:
            if not isinstance(cursor, str) or len(cursor) > 512:
                raise ValueError()
            raw = base64.b64decode(cursor + '=' * (-len(cursor) % 4), altchars=b'-_', validate=True)
            payload, signature = raw[:-32], raw[-32:]
            if not hmac.compare_digest(signature, hmac.new(self._secret, payload, hashlib.sha256).digest()):
                raise ValueError()
            snapshot_id, offset, folder = json.loads(payload)
            if folder != folder_id or type(offset) is not int or offset < 0:
                raise ValueError()
            if snapshot_id not in self._snapshots:
                raise GalleryError(409, 'cursor_expired', 'This image list expired; refresh the folder')
            return snapshot_id, offset
        except (ValueError, TypeError, KeyError):
            raise GalleryError(400, 'invalid_cursor', 'The cursor is invalid for this folder') from None

    def list_images(self, folder_id, *, cursor=None, limit=100):
        if type(limit) is not int or not 1 <= limit <= 200:
            raise GalleryError(400, 'invalid_limit', 'Limit must be between 1 and 200')
        with self._scan_lock:
            now = time.monotonic()
            for key, snapshot in list(self._snapshots.items()):
                if now - snapshot[0] > self.snapshot_ttl:
                    del self._snapshots[key]
            if cursor:
                snapshot_id, offset = self._parse_cursor(cursor, folder_id)
                _, records, version, _ = self._snapshots[snapshot_id]
                self._snapshots[snapshot_id] = (now, records, version, folder_id)
                self._snapshots.move_to_end(snapshot_id)
            else:
                cached = self._indexes.get(folder_id)
                _, records, version = cached if cached and now - cached[0] < self.scan_interval else self._scan_folder(folder_id)
                # Polling an unchanged list renews the existing snapshot, so an
                # already-loaded continuation cursor stays usable without
                # re-requesting every preceding page.
                snapshot_id = next((key for key, (_, _, saved_version, saved_folder) in self._snapshots.items()
                                    if saved_folder == folder_id and saved_version == version), None)
                if snapshot_id is not None:
                    _, records, _, _ = self._snapshots[snapshot_id]
                else:
                    # Reconstruct the same snapshot identity after expiry or
                    # eviction when a first-page refresh confirms unchanged
                    # data. Existing signed offsets can then be reused safely.
                    snapshot_id = hmac.new(self._secret, f'{folder_id}:{version}'.encode(), hashlib.sha256).hexdigest()[:24]
                offset = 0
                if snapshot_id in self._snapshots or len(records) > limit:
                    self._snapshots[snapshot_id] = (now, records, version, folder_id)
                    self._snapshots.move_to_end(snapshot_id)
                    while len(self._snapshots) > self.max_snapshots:
                        self._snapshots.popitem(last=False)
            page = []
            next_offset = offset
            while next_offset < len(records) and len(page) < limit:
                row = records[next_offset]
                next_offset += 1
                if self._prepare_row(row):
                    page.append({key: value for key, value in row.items() if not key.startswith('_')})
            next_cursor = self._cursor(snapshot_id, next_offset, folder_id) if next_offset < len(records) else None
            return {'images': page, 'next_cursor': next_cursor, 'version': version}

    def open_original(self, image_id, revision=None):
        """Return an already confined file handle; callers must close it.

        Opening before responding prevents a symlink substitution after lookup.
        Revision mismatches are errors, never silently substituted newer bytes.
        """
        with self._lock:
            row = self._records.get(image_id)
            if row is None:
                raise GalleryError(404, 'image_not_found', 'The image is unavailable; refresh its folder')
            path = row['_path']
        handle = self._open_path(path)
        try:
            metadata = os.fstat(handle)
            if not stat.S_ISREG(metadata.st_mode):
                raise GalleryError(404, 'image_not_found', 'The image is unavailable')
            current = self._revision(metadata, handle)
            if revision is not None and revision != current:
                raise GalleryError(409, 'revision_changed', 'The image changed; refresh its folder')
            if metadata.st_size > self.max_file_bytes:
                raise GalleryError(413, 'image_too_large', 'The image exceeds the file size limit')
            return os.fdopen(handle, 'rb'), current, MIME_TYPES[Path(path).suffix.lower()], metadata.st_size
        except BaseException:
            os.close(handle)
            raise

    def _check_unchanged(self, source, revision):
        if self._revision(os.fstat(source.fileno()), source.fileno()) != revision:
            raise GalleryError(409, 'revision_changed', 'The image changed while it was being read')

    def _read_thumbnail(self, key):
        """Read/touch our private LRU without rescanning or modifying mtimes."""
        with self._thumbnail_lock:
            size = self._thumbnail_entries.get(key)
            if size is None:
                return None
            try:
                data = (self.cache_dir / key).read_bytes()
            except OSError:
                # Temporary directories may be cleaned externally. Regenerate.
                self._thumbnail_entries.pop(key)
                self._thumbnail_bytes -= size
                return None
            self._thumbnail_entries.move_to_end(key)
            return data

    @contextmanager
    def _thumbnail_generation(self, key):
        """Serialize one key, not all images; remove idle locks immediately."""
        with self._thumbnail_lock:
            flight = self._thumbnail_flights.get(key)
            if flight is None:
                flight = [threading.Lock(), 0]
                self._thumbnail_flights[key] = flight
            flight[1] += 1
        try:
            with flight[0]:
                yield
        finally:
            with self._thumbnail_lock:
                flight[1] -= 1
                if not flight[1]:
                    del self._thumbnail_flights[key]

    def _write_thumbnail(self, key, data):
        # The cache starts empty for each process and is only written here.
        # Maintain exact byte accounting rather than glob/stat/sort all entries
        # for every new image (quadratic work as a gallery grows).
        with self._thumbnail_lock:
            if len(data) > self.cache_bytes:
                return
            temporary = None
            try:
                previous = self._thumbnail_entries.get(key, 0)
                while self._thumbnail_entries and self._thumbnail_bytes - previous + len(data) > self.cache_bytes:
                    oldest, size = next(iter(self._thumbnail_entries.items()))
                    (self.cache_dir / oldest).unlink(missing_ok=True)
                    del self._thumbnail_entries[oldest]
                    self._thumbnail_bytes -= size
                    if oldest == key:
                        previous = 0
                with tempfile.NamedTemporaryFile(dir=self.cache_dir, suffix='.part', delete=False) as output:
                    temporary = Path(output.name)
                    output.write(data)
                os.replace(temporary, self.cache_dir / key)
                self._thumbnail_bytes += len(data) - previous
                self._thumbnail_entries[key] = len(data)
                self._thumbnail_entries.move_to_end(key)
            except OSError:
                # Disk full/cleanup must not damage originals or block display.
                pass
            finally:
                if temporary is not None:
                    try:
                        temporary.unlink(missing_ok=True)
                    except OSError:
                        pass

    def thumbnail(self, image_id, size=256, revision=None):
        if type(size) is not int or size not in (256, 512):
            raise GalleryError(400, 'invalid_size', 'Thumbnail size must be 256 or 512')
        source, current, mime, _ = self.open_original(image_id, revision)
        with source:
            key = hashlib.sha256(f'{image_id}:{current}:{size}:webp-v1'.encode()).hexdigest() + '.webp'
            data = self._read_thumbnail(key)
            if data is not None:
                self._check_unchanged(source, current)
                return data, current
            with self._thumbnail_generation(key):
                # A request for the same key may have completed while we waited.
                data = self._read_thumbnail(key)
                if data is not None:
                    self._check_unchanged(source, current)
                    return data, current
                with self._thumbnail_slots:
                    data = self._encode_thumbnail(source, current, mime, size)
                self._write_thumbnail(key, data)
                return data, current

    def _encode_thumbnail(self, source, current, mime, size):
        from PIL import Image, ImageOps
        from .png_metadata import read_png_text
        try:
            if mime == 'image/png':
                width, height = self._dimensions(source, '.png')
                if width is None or height is None:
                    raise GalleryError(422, 'invalid_image', 'The image could not be decoded')
                if width * height > self.max_pixels:
                    raise GalleryError(413, 'image_too_large', 'The image exceeds the pixel limit')
                _, warnings = read_png_text(source, self.max_metadata_bytes)
                if warnings:
                    raise GalleryError(422, 'invalid_image', 'The image metadata exceeds safety limits or is damaged')
            source.seek(0)
            with Image.open(source) as image:
                if image.width * image.height > self.max_pixels:
                    raise GalleryError(413, 'image_too_large', 'The image exceeds the pixel limit')
                image.thumbnail((size, size), Image.Resampling.LANCZOS)
                image = ImageOps.exif_transpose(image)
                if image.mode not in ('RGB', 'RGBA'):
                    image = image.convert('RGBA' if 'transparency' in image.info else 'RGB')
                buffer = io.BytesIO()
                image.save(buffer, 'WEBP', quality=82, method=3)
                data = buffer.getvalue()
            self._check_unchanged(source, current)
        except GalleryError:
            raise
        except (OSError, ValueError, Image.DecompressionBombError):
            raise GalleryError(422, 'invalid_image', 'The image could not be decoded safely') from None
        return data

    def metadata(self, image_id, revision=None):
        from .png_metadata import read_png_text, parse_saved_metadata
        source, current, mime, _ = self.open_original(image_id, revision)
        key = (image_id, current)
        with source:
            if mime != 'image/png':
                return {'status': 'unsupported', 'prompt': None, 'workflow': None,
                        'raw_prompt': None, 'raw_workflow': None, 'warnings': ['Saved ComfyUI settings are supported only in PNG images']}
            with self._lock:
                payload = self._metadata_cache.pop(key, None)
                if payload is not None:
                    self._metadata_cache[key] = payload
            if payload is not None:
                return json.loads(payload)
            text, warnings = read_png_text(source, self.max_metadata_bytes)
            result = parse_saved_metadata(text, warnings)
            self._check_unchanged(source, current)
        payload = json.dumps(result, ensure_ascii=True, allow_nan=False)
        with self._lock:
            self._metadata_cache[key] = payload
            while len(self._metadata_cache) > 128 or sum(len(value) for value in self._metadata_cache.values()) > 8 * 1024 * 1024:
                self._metadata_cache.popitem(last=False)
        return result

