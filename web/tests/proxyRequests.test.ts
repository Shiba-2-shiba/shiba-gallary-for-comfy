import { describe, expect, it } from 'vitest';
import { unexpectedProxyRequests } from '../harness/proxyRequests';

const base = 'http://127.0.0.1:4173/proxy/8188/';
describe('proxy HTTP request contract', () => {
  it('accepts proxy HTTP requests and locally created blob image URLs', () => {
    expect(unexpectedProxyRequests([
      base,
      base + 'shiba-gallery/image/out-0/thumbnail?revision=v1',
      'blob:http://127.0.0.1:4173/0e1a0439-b7f3-4970-96d8-b013a0fbe781',
      'data:image/png;base64,aGVsbG8=',
      'http://127.0.0.1:4173/favicon.ico',
    ], base)).toEqual([]);
  });
  it('reports full URLs for HTTP requests missing the proxy prefix', () => {
    const bad = 'http://127.0.0.1:4173/shiba-gallery/images?folder_id=out';
    expect(unexpectedProxyRequests([base + 'scripts/app.js', bad], base)).toEqual([bad]);
  });
  it('rejects another HTTP origin even when its pathname has the expected prefix', () => {
    const bad = 'https://external.example/proxy/8188/shiba-gallery/images';
    expect(unexpectedProxyRequests([bad], base)).toEqual([bad]);
  });
  it('does not allow a similarly named prefix or external favicon', () => {
    const bad = ['http://127.0.0.1:4173/proxy/81880/images', 'https://external.example/favicon.ico'];
    expect(unexpectedProxyRequests(bad, base)).toEqual(bad);
  });
});
