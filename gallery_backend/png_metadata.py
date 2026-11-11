"""Bounded PNG text extraction without inflating or decoding image pixels."""
from __future__ import annotations

import json
import math
import struct
import zlib

PNG_SIGNATURE = b'\x89PNG\r\n\x1a\n'


def _inflate(data, limit):
    decoder = zlib.decompressobj()
    result = decoder.decompress(data, limit + 1)
    if len(result) > limit or decoder.unconsumed_tail or not decoder.eof:
        raise ValueError('compressed metadata exceeds the size limit or is incomplete')
    return result


def read_png_text(source, limit):
    """Return prompt/workflow text and warnings; cap all PNG text combined.

    Unlike Pillow's process-wide PNG limits, this limit is local to the gallery
    and cannot change how ComfyUI loads other images. Pillow's own safeguards
    remain enabled when a thumbnail is decoded later.
    """
    source.seek(0)
    if source.read(8) != PNG_SIGNATURE:
        return {}, ['Not a valid PNG file']
    result, warnings, total = {}, [], 0
    for _ in range(100_000):
        header = source.read(8)
        if len(header) != 8:
            warnings.append('PNG metadata is incomplete')
            break
        length, kind = struct.unpack('>I4s', header)
        if kind == b'IEND':
            break
        if kind not in (b'tEXt', b'zTXt', b'iTXt'):
            source.seek(length + 4, 1)
            continue
        if length > limit or total + length > limit:
            warnings.append('PNG metadata exceeds the size limit')
            break
        data, crc = source.read(length), source.read(4)
        if len(data) != length or len(crc) != 4:
            warnings.append('PNG metadata is incomplete')
            break
        if zlib.crc32(kind + data) != struct.unpack('>I', crc)[0]:
            warnings.append('PNG metadata has an invalid checksum')
            continue
        try:
            keyword, value = data.split(b'\x00', 1)
            if not 1 <= len(keyword) <= 79:
                raise ValueError('invalid text keyword')
            encoding = 'latin-1'
            if kind == b'zTXt':
                if value[:1] != b'\x00':
                    raise ValueError('unsupported text compression')
                value = _inflate(value[1:], limit - total)
            elif kind == b'iTXt':
                if len(value) < 2 or value[0] not in (0, 1) or value[1] != 0:
                    raise ValueError('unsupported international text compression')
                compressed = value[0]
                _, _, value = value[2:].split(b'\x00', 2)
                if compressed:
                    value = _inflate(value, limit - total)
                encoding = 'utf-8'
            total += len(value) + len(keyword)
            if total > limit:
                raise ValueError('PNG metadata exceeds the size limit')
            key = keyword.decode('latin-1')
            if key in ('prompt', 'workflow'):
                if key in result:
                    raise ValueError('duplicate metadata field')
                result[key] = value.decode(encoding)
        except (ValueError, UnicodeError, zlib.error) as error:
            warnings.append('PNG text could not be read: ' + str(error))
            break
    else:
        warnings.append('PNG chunk count exceeds the safety limit')
    return result, warnings


def _reject_constant(_value):
    raise ValueError('non-finite JSON number')


def _check_object(value):
    if not isinstance(value, dict):
        raise ValueError('expected a JSON object')
    stack = [(value, 0)]
    visited, large_integer = 0, False
    while stack:
        current, depth = stack.pop()
        visited += 1
        if depth > 64 or visited > 100_000:
            raise ValueError('JSON structure exceeds the safety limit')
        if isinstance(current, dict):
            if '__shiba_number__' in current:
                raise ValueError('reserved exact-number marker appears in original data')
            stack.extend((child, depth + 1) for child in current.values())
        elif isinstance(current, list):
            stack.extend((child, depth + 1) for child in current)
        elif type(current) is int and abs(current) > 9_007_199_254_740_991:
            large_integer = True
        elif type(current) is float and not math.isfinite(current):
            raise ValueError('non-finite JSON number')
    return large_integer


def _transport_exact_numbers(value):
    if type(value) is int and abs(value) > 9_007_199_254_740_991:
        return {'__shiba_number__': str(value)}
    if isinstance(value, dict):
        return {key: _transport_exact_numbers(child) for key, child in value.items()}
    if isinstance(value, list):
        return [_transport_exact_numbers(child) for child in value]
    return value


def parse_saved_metadata(text, warnings):
    result = {'status': 'absent', 'prompt': None, 'workflow': None,
              'raw_prompt': text.get('prompt'), 'raw_workflow': text.get('workflow'), 'warnings': list(warnings)}
    for field in ('prompt', 'workflow'):
        if field not in text:
            continue
        try:
            value = json.loads(text[field], parse_constant=_reject_constant)
            _check_object(value)
            result[field] = _transport_exact_numbers(value)
        except (ValueError, TypeError, RecursionError):
            result['warnings'].append(f'{field}: saved data is not a supported JSON object or exceeds safety limits')
    count = sum(result[field] is not None for field in ('prompt', 'workflow'))
    result['status'] = ('partial' if result['warnings'] else 'ok') if count else 'invalid' if result['warnings'] else 'absent'
    return result
