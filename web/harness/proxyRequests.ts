/**
 * Validate HTTP transport, not local image handles. Thumbnail.vue fetches via
 * the API URL then displays a blob: URL; that URL has no server proxy pathname.
 * Preserve full offending URLs so CI failures identify origin/path mistakes.
 */
export function unexpectedProxyRequests(requests: string[], proxyBase: string): string[] {
  const base = new URL(proxyBase);
  return requests.filter((request) => {
    const url = new URL(request);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    return url.origin !== base.origin ||
      (!url.pathname.startsWith(base.pathname) && url.pathname !== '/favicon.ico');
  });
}
