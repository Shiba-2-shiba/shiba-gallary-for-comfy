import { mount } from "@vue/test-utils";
import { it, expect, beforeAll } from "vitest";
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
