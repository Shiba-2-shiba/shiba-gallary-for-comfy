import { afterEach, expect, it, vi } from "vitest";
import { neighborIndexes, NeighborPrefetcher } from "./neighborPrefetch";
import { thumbnailCache } from "./thumbnailCache";
import { flushPromises } from "@vue/test-utils";
afterEach(() => { thumbnailCache.clear(); vi.unstubAllGlobals(); });
it("keeps a four-image window biased toward navigation direction without wrapping", () => {
  expect(neighborIndexes(20, 8, 1)).toEqual([9, 10, 11, 7]);
  expect(neighborIndexes(20, 8, -1)).toEqual([7, 6, 5, 9]);
  expect(neighborIndexes(20, 0, 1)).toEqual([1, 2, 3]);
  expect(neighborIndexes(20, 19, 1)).toEqual([18]);
  expect(neighborIndexes(20, -1, 1)).toEqual([]);
});
it("cancels neighbors outside the new window and all work when disposed", async () => {
  const requests = new Map<string, AbortSignal>();
  vi.stubGlobal("fetch", (url: string, options: RequestInit) => new Promise<Response>((_resolve, reject) => {
    const signal = options.signal!;
    requests.set(url, signal);
    signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
  }));
  const prefetch = new NeighborPrefetcher();
  prefetch.update(["/a", "/b", "/c", "/d"]);
  expect([...requests.keys()]).toEqual(["/a", "/b", "/c"]);
  prefetch.update(["/b", "/c", "/e", "/f"]);
  expect(requests.get("/a")?.aborted).toBe(true);
  expect(requests.get("/b")?.aborted).toBe(false);
  await flushPromises();
  expect(requests.has("/d")).toBe(false);
  prefetch.clear(); await flushPromises();
  expect([...requests.values()].every((signal) => signal.aborted)).toBe(true);
});
