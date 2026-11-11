import { requestThumbnail } from "./thumbnailRequests";

/** Three ahead and one behind. Never wrap or request more than four neighbors. */
export function neighborIndexes(length: number, index: number, direction: 1 | -1) {
  if (index < 0 || index >= length) return [];
  return [direction, 2 * direction, 3 * direction, -direction]
    .map((offset) => index + offset)
    .filter((candidate) => candidate >= 0 && candidate < length);
}
export class NeighborPrefetcher {
  private requests = new Map<string, ReturnType<typeof requestThumbnail>>();
  update(urls: string[]) {
    const wanted = new Set(urls.slice(0, 4));
    for (const [url, request] of this.requests) {
      if (!wanted.has(url)) { request.cancel(); this.requests.delete(url); }
    }
    for (const url of wanted) {
      if (!this.requests.has(url)) this.requests.set(url, requestThumbnail(url, "low"));
    }
  }
  clear() {
    for (const request of this.requests.values()) request.cancel();
    this.requests.clear();
  }
}
