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
it('unchanged refresh requests one page and preserves loaded continuation and list identity', async () => {
  const calls: (string | null)[] = [];
  const service = {
    images: async (_folder: string, cursor: string | null) => {
      calls.push(cursor);
      const page = cursor === 'second' ? 1 : cursor === 'third' ? 2 : 0;
      return { images: [img(String(page))], next_cursor: ['second', 'third', 'fourth'][page], version: 'stable' };
    },
  } as unknown as GalleryApi;
  const s = createSession();
  const c = new GalleryController(service, s);
  await c.selectFolder('a');
  await c.loadMore();
  await c.loadMore();
  const previous = s.images;
  calls.length = 0;
  await c.refresh();
  expect(calls).toEqual([null]);
  expect(s.images).toBe(previous);
  expect(c.cursor).toBe('fourth');
  c.dispose();
});
it('a changed catalog refreshes previously loaded pages without moving selected ids', async () => {
  let version = 'one';
  const calls: (string | null)[] = [];
  const service = {
    images: async (_folder: string, cursor: string | null) => {
      calls.push(cursor);
      return { images: [img((cursor ? 'last' : 'first') + version)], next_cursor: cursor ? null : 'second', version };
    },
  } as unknown as GalleryApi;
  const s = createSession();
  const c = new GalleryController(service, s);
  await c.selectFolder('a');
  await c.loadMore();
  s.leftId = 'firstone';
  version = 'two';
  calls.length = 0;
  await c.refresh();
  expect(calls).toEqual([null, 'second']);
  expect(s.images.map(i => i.id)).toEqual(['firsttwo', 'lasttwo']);
  expect(s.leftId).toBe('firstone');
  c.dispose();
});
it('folder switching clears reference candidates from the previous folder', async () => {
  const service = { images: async (folder: string) => ({ images: [img(folder, folder)], next_cursor: null, version: folder }) } as unknown as GalleryApi;
  const s = createSession();
  const c = new GalleryController(service, s);
  await c.selectFolder('a');
  s.pinned.add('a');
  await c.selectFolder('b');
  expect(s.pinned.size).toBe(0);
  c.dispose();
});
it('refresh replaces an expired snapshot cursor even when the catalog version is unchanged', async () => {
  let snapshot = 'old';
  const calls: (string | null)[] = [];
  const service = {
    images: async (_folder: string, cursor: string | null) => {
      calls.push(cursor);
      const page = cursor ? 1 : 0;
      return { images: [img(String(page))], next_cursor: snapshot + (page ? '-third' : '-second'), version: 'same-catalog' };
    },
  } as unknown as GalleryApi;
  const s = createSession();
  const c = new GalleryController(service, s);
  await c.selectFolder('a');
  await c.loadMore();
  expect(c.cursor).toBe('old-third');
  snapshot = 'new';
  calls.length = 0;
  await c.refresh();
  expect(calls).toEqual([null, 'new-second']);
  expect(c.cursor).toBe('new-third');
  c.dispose();
});
