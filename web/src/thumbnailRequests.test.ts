import { afterEach, expect, it, vi } from "vitest";
import { requestThumbnail } from "./thumbnailRequests";
import { thumbnailCache } from "./thumbnailCache";
import { flushPromises } from "@vue/test-utils";
afterEach(() => { thumbnailCache.clear(); vi.unstubAllGlobals(); });
it("shares an in-flight neighbor with the foreground and aborts only after its last consumer leaves", async () => {
  let signal!: AbortSignal;
  let finish!: (response: Response) => void;
  const fetcher = vi.fn((_url: string, options: RequestInit) => {
    signal = options.signal!;
    return new Promise<Response>((resolve) => { finish = resolve; });
  });
  vi.stubGlobal("fetch", fetcher);
  const neighbor = requestThumbnail("/shared", "low");
  const current = requestThumbnail("/shared", "high");
  neighbor.cancel();
  expect(signal.aborted).toBe(false);
  expect(fetcher).toHaveBeenCalledTimes(1);
  finish(new Response(new Blob(["preview"])));
  expect(await current.done).toBeInstanceOf(Blob);
  expect(thumbnailCache.get("/shared")).toBeDefined();
  current.cancel();
});
it("cancels obsolete transport and never caches a late response after the session closes", async () => {
  let signal!: AbortSignal;
  let finish!: (response: Response) => void;
  vi.stubGlobal("fetch", (_url: string, options: RequestInit) => {
    signal = options.signal!;
    return new Promise<Response>((resolve) => { finish = resolve; });
  });
  const request = requestThumbnail("/obsolete", "low");
  request.cancel(); thumbnailCache.clear();
  expect(signal.aborted).toBe(true);
  finish(new Response(new Blob(["obsolete"])));
  expect(await request.done).toBeUndefined();
  expect(thumbnailCache.get("/obsolete")).toBeUndefined();
  await flushPromises();
});
