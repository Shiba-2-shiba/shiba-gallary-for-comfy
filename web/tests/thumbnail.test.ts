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
