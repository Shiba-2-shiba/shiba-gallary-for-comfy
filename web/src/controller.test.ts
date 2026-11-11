import { it, expect } from "vitest";
import { GalleryController } from "./controller";
import { createSession } from "./state";
import type { GalleryApi, ImagePage } from "./api";
const img = (id: string, folder_id = "a") => ({
  id,
  folder_id,
  name: id,
  revision: "v",
  mtime_ns: 1,
  width: null,
  height: null,
});
it("ignores a stale folder response even if the server ignores cancellation", async () => {
  let resolveA!: (p: ImagePage) => void;
  const service = {
    images: (folder: string) =>
      folder === "a"
        ? new Promise<ImagePage>((r) => (resolveA = r))
        : Promise.resolve({
            images: [img("b", "b")],
            next_cursor: null,
            version: "1",
          }),
  } as GalleryApi;
  const s = createSession();
  const c = new GalleryController(service, s);
  const old = c.selectFolder("a");
  await c.selectFolder("b");
  resolveA({ images: [img("a")], next_cursor: null, version: "1" });
  await old;
  expect(s.folderId).toBe("b");
  expect(s.images.map((x) => x.id)).toEqual(["b"]);
  c.dispose();
});
it("refresh never changes the current reference or checked ids", async () => {
  let items = [img("one"), img("two")];
  const service = {
    images: async () => ({ images: items, next_cursor: null, version: "1" }),
  } as unknown as GalleryApi;
  const s = createSession();
  const c = new GalleryController(service, s);
  await c.selectFolder("a");
  s.currentId = "two";
  s.leftId = "one";
  s.checked.add("two");
  items = [img("new"), ...items];
  await c.refresh();
  expect(s.images[0].id).toBe("new");
  expect(s.currentId).toBe("two");
  expect(s.leftId).toBe("one");
  expect(s.checked.has("two")).toBe(true);
  c.dispose();
});
