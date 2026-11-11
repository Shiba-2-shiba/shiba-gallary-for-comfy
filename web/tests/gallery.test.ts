import { mount, flushPromises } from "@vue/test-utils";
import { it, expect, vi, beforeAll, afterEach } from "vitest";
import Gallery from "../src/Gallery.vue";
import { GalleryApi } from "../src/api";
const image = (id: string) => ({
  id,
  folder_id: "out",
  name: id + ".png",
  revision: "1",
  mtime_ns: 2,
  width: 1024,
  height: 1024,
});
const api = new GalleryApi({ apiURL: (route) => route });
beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any;
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
});
afterEach(() => vi.unstubAllGlobals());
function fixture() {
  vi.stubGlobal("fetch", async (input: RequestInfo | URL) => {
    const url = String(input);
    return new Response(
      JSON.stringify(
        url.includes("/folders")
          ? {
              folders: [
                { id: "out", name: "output" },
                { id: "sub", name: "output/sub" },
              ],
            }
          : url.includes("/metadata")
            ? {
                status: "ok",
                prompt: {
                  "1": {
                    class_type: "CheckpointLoaderSimple",
                    inputs: { ckpt_name: "saved-model.safetensors" },
                  },
                },
                workflow: null,
                warnings: [],
              }
            : {
                images: [image("one"), image("two"), image("three")],
                next_cursor: null,
                version: "v1",
              },
      ),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  });
  return mount(Gallery, { props: { api }, attachTo: document.body });
}
it("opens read-only overlay and closes with checks reset", async () => {
  const w = fixture();
  await w.get("[data-action=open]").trigger("click");
  await flushPromises();
  expect(w.find("dialog").attributes("open")).toBeDefined();
  await w.get("input[type=checkbox]").setValue(true);
  expect(w.text()).toContain("1 selected");
  await w.get("[data-action=close]").trigger("click");
  await w.get("[data-action=open]").trigger("click");
  await flushPromises();
  expect(w.text()).toContain("0 selected");
  w.unmount();
});
it("opens original with model outside image, pins reference and switches only the right side", async () => {
  const w = fixture();
  await w.get("[data-action=open]").trigger("click");
  await flushPromises();
  await w.findAll("[data-action=view]")[0].trigger("click");
  await flushPromises();
  expect(w.text()).toContain("saved-model.safetensors");
  await w.get("[data-action=pin]").trigger("click");
  await flushPromises();
  expect(w.get("[data-side=left]").attributes("data-image")).toBe("one");
  expect(w.get("[data-side=right]").attributes("data-image")).toBe("two");
  await w.get("[data-action=next]").trigger("click");
  expect(w.get("[data-side=left]").attributes("data-image")).toBe("one");
  expect(w.get("[data-side=right]").attributes("data-image")).toBe("three");
  w.unmount();
});
it("does not apply a previous reference prompt search after pinning another reference", async () => {
  const w = fixture();
  await w.get("[data-action=open]").trigger("click");
  await flushPromises();
  await w.findAll(".sg-pin")[0].trigger("click");
  await flushPromises();
  let complete!: (v: Response) => void;
  const previous = fetch;
  vi.stubGlobal("fetch", (input: RequestInfo | URL) =>
    String(input).includes("/two/metadata")
      ? new Promise<Response>((r) => (complete = r))
      : previous(input),
  );
  // Reference has known text; force uncached candidate request, then change reference while it is pending.
  const typed = w.vm as any;
  typed.s.records.set("one", { ...typed.s.records.get("one"), revision: "2" });
  await w.vm.$nextTick();
  await flushPromises();
  // Test lifecycle via the in-flight helper, using explicit known saved text metadata.
  const known = {
    status: "ok",
    prompt: { "1": { class_type: "CLIPTextEncode", inputs: { text: "cat" } } },
    workflow: null,
    warnings: [],
  };
  const { normalizeMetadata } = await import("../src/metadata");
  typed.meta.set("one:2", normalizeMetadata(known));
  typed.meta.delete("two:1");
  const search = w
    .findAll("button")
    .find((b) => b.text() === "Find matching saved text")!;
  await search.trigger("click");
  await flushPromises();
  await w.get("[data-action=grid]").trigger("click");
  await w.findAll(".sg-pin")[2].trigger("click");
  if (complete) complete(new Response(JSON.stringify(known)));
  await flushPromises();
  expect(w.get("[data-side=left]").attributes("data-image")).toBe("three");
  expect(typed.s.scope).toBe("folder");
  w.unmount();
});
it("allows retrying a temporary metadata request failure without closing comparison", async () => {
  const w = fixture();
  const previous = fetch;
  let fail = true;
  vi.stubGlobal("fetch", (input: RequestInfo | URL) =>
    String(input).includes("/metadata") && fail
      ? Promise.reject(new Error("temporary network failure"))
      : previous(input),
  );
  await w.get("[data-action=open]").trigger("click");
  await flushPromises();
  await w.findAll("[data-action=view]")[0].trigger("click");
  await flushPromises();
  await w.get("[data-action=settings]").trigger("click");
  expect(w.text()).toContain("temporary network failure");
  fail = false;
  await w
    .findAll("button")
    .find((b) => b.text() === "Reload saved settings")!
    .trigger("click");
  await flushPromises();
  expect(w.text()).toContain("saved-model.safetensors");
  expect(w.text()).not.toContain("temporary network failure");
  w.unmount();
});
it("restores the grid viewport after viewing an image", async () => {
  const w = fixture();
  const previous = fetch;
  vi.stubGlobal("fetch", (input: RequestInfo | URL) =>
    String(input).includes("/images?")
      ? Promise.resolve(
          new Response(
            JSON.stringify({
              images: Array.from({ length: 120 }, (_, i) => image("i" + i)),
              next_cursor: null,
              version: "v1",
            }),
          ),
        )
      : previous(input),
  );
  await w.get("[data-action=open]").trigger("click");
  await flushPromises();
  const grid = w.get("[data-testid=image-grid]").element;
  grid.scrollTop = 656;
  await w.get("[data-testid=image-grid]").trigger("scroll");
  await w.findAll("[data-action=view]")[0].trigger("click");
  await flushPromises();
  await w.get("[data-action=grid]").trigger("click");
  await flushPromises();
  expect(w.get("[data-testid=image-grid]").element.scrollTop).toBe(656);
  w.unmount();
});
