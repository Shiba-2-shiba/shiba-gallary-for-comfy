import { mount, flushPromises } from "@vue/test-utils";
import { it, expect, beforeAll, vi } from "vitest";
import ImagePane from "../src/ImagePane.vue";
import { GalleryApi } from "../src/api";
beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any;
});
it("ignores late error events from the replaced original image", async () => {
  const image = (id: string) => ({
    id,
    name: id,
    folder_id: "a",
    revision: "v",
    mtime_ns: 1,
    width: 100,
    height: 100,
  });
  const w = mount(ImagePane, {
    props: {
      image: image("a"),
      api: new GalleryApi({ apiURL: (r) => r }),
      side: "right",
      transform: { scale: 1, x: 0, y: 0 },
      models: [],
      modelStatus: "No model",
    },
  });
  const old = w.get("img").element;
  await w.setProps({ image: image("b") });
  old.dispatchEvent(new Event("error"));
  await w.vm.$nextTick();
  expect(w.find("img").exists()).toBe(true);
  expect(w.get("img").attributes("alt")).toBe("b");
  w.unmount();
});

it("shows a cached preview while prioritizing the display image and keeps loading text outside the image", async () => {
  const { thumbnailCache } = await import("../src/thumbnailCache");
  const api = new GalleryApi({ apiURL: (r) => r });
  const image = {
    id: "cached",
    name: "cached.png",
    folder_id: "out",
    revision: "v1",
    mtime_ns: 1,
    width: 1024,
    height: 1024,
  };
  thumbnailCache.set(
    api.imageURL(image, "thumbnail", 512),
    new Blob(["preview"]),
  );
  URL.createObjectURL = () => "blob:preview";
  URL.revokeObjectURL = () => {};
  const w = mount(ImagePane, {
    props: {
      image,
      api,
      side: "right",
      transform: { scale: 1, x: 0, y: 0 },
      models: [],
      modelStatus: "Loading model",
    },
  });
  await flushPromises();
  expect(w.get(".sg-image-preview img").attributes("src")).toBe("blob:preview");
  expect(w.get(".sg-original").attributes("fetchpriority")).toBe("high");
  await w.get(".sg-image-preview img").trigger("load");
  expect(w.get(".sg-image-surface").text()).not.toContain("Loading original");
  expect(w.get(".sg-models").text()).toContain("Preview");
  expect(w.get(".sg-models").text()).toContain("Loading high quality WebP…");
  const original = w.get(".sg-original").element as HTMLImageElement;
  Object.defineProperties(original, {
    naturalWidth: { value: 1024 },
    naturalHeight: { value: 1024 },
  });
  await w.get(".sg-original").trigger("load");
  await flushPromises();
  expect(w.find(".sg-image-preview").exists()).toBe(false);
  expect(w.get(".sg-models").text()).toContain("High quality WebP");
  w.unmount();
  thumbnailCache.clear();
});

it("clears the obsolete native original source on navigation and close", async () => {
  const image = (id: string) => ({ id, name: id, folder_id: "a", revision: "v", mtime_ns: 1, width: 100, height: 100 });
  const w = mount(ImagePane, { props: {
    image: image("a"), api: new GalleryApi({ apiURL: (r) => r }), side: "right",
    transform: { scale: 1, x: 0, y: 0 }, models: [], modelStatus: "No model",
  }});
  const old = w.get(".sg-original").element;
  await w.setProps({ image: image("b") });
  expect(old.getAttribute("src")).toBeNull();
  const current = w.get(".sg-original").element;
  w.unmount(); expect(current.getAttribute("src")).toBeNull();
});
