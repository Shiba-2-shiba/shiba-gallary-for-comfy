import { mount, flushPromises } from "@vue/test-utils";
import { it, expect, vi, afterEach } from "vitest";
import Thumbnail from "../src/Thumbnail.vue";
afterEach(() => vi.unstubAllGlobals());
it("revokes decoded blob URLs on image failure and on unmount", async () => {
  const live = new Set<string>();
  vi.stubGlobal("fetch", async () => new Response(new Blob(["broken"])));
  URL.createObjectURL = () => {
    live.add("blob:fixture");
    return "blob:fixture";
  };
  URL.revokeObjectURL = (url) => {
    live.delete(url);
  };
  const w = mount(Thumbnail, { props: { url: "/image", alt: "sample" } });
  await flushPromises();
  expect(live.size).toBe(1);
  await w.get("img").trigger("error");
  expect(live.size).toBe(0);
  w.unmount();
  expect(live.size).toBe(0);
});
it("ignores late preview events after changing the image revision", async () => {
  const { thumbnailCache } = await import("../src/thumbnailCache");
  thumbnailCache.clear();
  thumbnailCache.set("/a?v=1", new Blob(["a"]));
  thumbnailCache.set("/a?v=2", new Blob(["b"]));
  let id = 0;
  const live = new Set<string>();
  URL.createObjectURL = () => {
    const url = "blob:" + ++id;
    live.add(url);
    return url;
  };
  URL.revokeObjectURL = (url) => {
    live.delete(url);
  };
  const w = mount(Thumbnail, { props: { url: "/a?v=1", alt: "a" } });
  const old = w.get("img").element;
  await w.setProps({ url: "/a?v=2" });
  old.dispatchEvent(new Event("error"));
  old.dispatchEvent(new Event("load"));
  await w.vm.$nextTick();
  expect(w.get("img").attributes("src")).toBe("blob:2");
  expect(live.has("blob:2")).toBe(true);
  expect(w.emitted("ready")).toBeUndefined();
  expect(thumbnailCache.get("/a?v=2")).toBeDefined();
  w.unmount();
  thumbnailCache.clear();
});
it("reuses a loaded preview without a second fetch after the grid card is unmounted", async () => {
  const { thumbnailCache } = await import("../src/thumbnailCache");
  thumbnailCache.clear();
  let count = 0;
  vi.stubGlobal("fetch", async () => {
    count++;
    return new Response(new Blob(["image"]));
  });
  URL.createObjectURL = () => "blob:cached";
  URL.revokeObjectURL = () => {};
  const card = mount(Thumbnail, {
    props: { url: "/preview?v=1", alt: "image" },
  });
  await flushPromises();
  card.unmount();
  const preview = mount(Thumbnail, {
    props: { url: "/preview?v=1", alt: "image" },
  });
  await flushPromises();
  expect(preview.get("img").attributes("src")).toBe("blob:cached");
  expect(count).toBe(1);
  preview.unmount();
  thumbnailCache.clear();
});
