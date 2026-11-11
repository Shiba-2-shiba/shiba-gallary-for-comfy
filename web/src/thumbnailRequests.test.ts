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
  // Node Response and jsdom Blob can have different constructors. Supplying
  // a DOM Blob to Node Response may stringify it to "[object Blob]" instead
  // of sending its bytes. Use a portable body and verify the actual payload.
  finish(new Response("preview", { headers: { "Content-Type": "image/png" } }));
  const blob = await current.done;
  expect(blob).toBeDefined();
  expect(blob!.size).toBe(7);
  expect(blob!.type).toBe("image/png");
  // jsdom Blob lacks text() in some supported Node/test-environment pairs.
  const text = typeof blob!.text === "function"
    ? await blob!.text()
    : await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error);
        reader.readAsText(blob!);
      });
  expect(text).toBe("preview");
  expect(await neighbor.done).toBe(blob);
  expect(thumbnailCache.get("/shared")).toBe(blob);
  const cached = requestThumbnail("/shared", "high");
  expect(await cached.done).toBe(blob);
  expect(fetcher).toHaveBeenCalledTimes(1);
  cached.cancel();
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
  finish(new Response("obsolete"));
  expect(await request.done).toBeUndefined();
  expect(thumbnailCache.get("/obsolete")).toBeUndefined();
  await flushPromises();
});
