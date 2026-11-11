import { it, expect } from "vitest";
import { ThumbnailCache } from "./thumbnailCache";
it("reuses revision-specific previews and evicts least recently used blobs within byte and entry limits", () => {
  const cache = new ThumbnailCache(2, 8);
  const a = new Blob(["123"]);
  const b = new Blob(["456"]);
  cache.set("/a?v=1", a);
  cache.set("/b?v=1", b);
  expect(cache.get("/a?v=1")).toBe(a);
  cache.set("/c?v=1", new Blob(["789"]));
  expect(cache.get("/b?v=1")).toBeUndefined();
  expect(cache.get("/a?v=2")).toBeUndefined();
  expect(cache.get("/a?v=1")).toBe(a);
  cache.clear();
  expect(cache.get("/a?v=1")).toBeUndefined();
});
it("does not retain an oversized preview", () => {
  const cache = new ThumbnailCache(2, 3);
  cache.set("large", new Blob(["1234"]));
  expect(cache.get("large")).toBeUndefined();
});
it("rejects a late fetch write belonging to the cleared session", () => {
  const cache = new ThumbnailCache();
  const generation = cache.epoch;
  cache.clear();
  cache.set("/old", new Blob(["old"]), generation);
  expect(cache.get("/old")).toBeUndefined();
  cache.set("/new", new Blob(["new"]), cache.epoch);
  expect(cache.get("/new")).toBeDefined();
});
it("bounds cached byte size even before the entry limit is reached", () => {
  const cache = new ThumbnailCache(128, 4);
  cache.set("first", new Blob(["123"]));
  cache.set("second", new Blob(["456"]));
  expect(cache.get("first")).toBeUndefined();
  expect(cache.get("second")).toBeDefined();
});
