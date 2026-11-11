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
  URL.createObjectURL = () => "blob:test-preview";
  URL.revokeObjectURL = () => {};
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
function pageResponse(input: RequestInfo | URL, page: unknown) {
  return new Response(JSON.stringify(String(input).includes("/bootstrap?") ? { folder: {id:"out",name:"output"}, page } : page));
}
function fixture() {
  vi.stubGlobal("fetch", async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("/bootstrap?")) return pageResponse(input, {images:[image("one"), image("two"), image("three")], next_cursor:null,version:"v1"});
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
  await new Promise((resolve) => setTimeout(resolve, 150));
  await flushPromises();
  expect(w.text()).toContain("saved-model.safetensors");
  await w.get("[data-action=pin]").trigger("click");
  await flushPromises();
  expect(w.get("[data-side=left]").attributes("data-image")).toBe("one");
  expect(w.get("[data-side=right]").attributes("data-image")).toBe("one");
  await w.get("[data-action=next]").trigger("click");
  expect(w.get("[data-side=left]").attributes("data-image")).toBe("one");
  expect(w.get("[data-side=right]").attributes("data-image")).toBe("two");
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
  await flushPromises();
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
    (String(input).includes("/images?") || String(input).includes("/bootstrap?"))
      ? Promise.resolve(
          pageResponse(input, {
              images: Array.from({ length: 120 }, (_, i) => image("i" + i)),
              next_cursor: null, version: "v1",
          }),
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

it("starts with large thumbnails and restores identical sides when choosing a pinned or checked reference", async () => {
  const w = fixture();
  await w.get("[data-action=open]").trigger("click");
  await flushPromises();
  expect(
    w
      .findAll("button")
      .find((b) => b.text() === "Large")!
      .attributes("aria-pressed"),
  ).toBe("true");
  await w.findAll("input[type=checkbox]")[1].setValue(true);
  await w.findAll(".sg-pin")[0].trigger("click");
  await flushPromises();
  expect(
    w
      .get('[aria-label="Reference image"]')
      .findAll("option")
      .map((o) => o.attributes("value")),
  ).toEqual(["one", "two"]);
  await w.get("[data-action=next]").trigger("click");
  await w.get('[aria-label="Reference image"]').setValue("two");
  await flushPromises();
  expect(w.get("[data-side=left]").attributes("data-image")).toBe("two");
  expect(w.get("[data-side=right]").attributes("data-image")).toBe("two");
  await w.get("[data-action=grid]").trigger("click");
  await w.findAll(".sg-pin")[2].trigger("click");
  await w.get('[aria-label="Reference image"]').setValue("one");
  expect(w.get("[data-side=left]").attributes("data-image")).toBe("one");
  expect(w.get("[data-side=right]").attributes("data-image")).toBe("one");
  await w.get("[data-action=close]").trigger("click");
  await w.get("[data-action=open]").trigger("click");
  await flushPromises();
  expect((w.vm as any).s.pinned.size).toBe(0);
  w.unmount();
});

it("inserts the original image before requesting nonessential metadata", async () => {
  const w = fixture();
  const previous = fetch;
  let imagePresent = false;
  vi.stubGlobal("fetch", (input: RequestInfo | URL, options?: RequestInit) => {
    if (String(input).includes("/metadata"))
      imagePresent = !!document.querySelector(
        "[data-side=right] img.sg-original",
      );
    return previous(input, options);
  });
  await w.get("[data-action=open]").trigger("click");
  await flushPromises();
  await w.findAll("[data-action=view]")[0].trigger("click");
  await flushPromises();
  await new Promise((resolve) => setTimeout(resolve, 150));
  await flushPromises();
  expect(imagePresent).toBe(true);
  w.unmount();
});

it("opens single view with the candidate strip collapsed but keeps navigation and an explicit toggle", async () => {
  const w = fixture();
  await w.get("[data-action=open]").trigger("click"); await flushPromises();
  await w.findAll("[data-action=view]")[0].trigger("click");
  expect(w.get("dialog").classes()).toContain("sg-single-view");
  expect(w.find(".sg-candidate-bar").exists()).toBe(false);
  expect(w.find("[data-action=next]").exists()).toBe(true);
  await w.get("[data-action=candidates]").trigger("click");
  expect(w.find(".sg-candidate-bar").exists()).toBe(true);
  await w.get("[data-action=candidates]").trigger("click");
  expect(w.find(".sg-candidate-bar").exists()).toBe(false);
  await w.get("[data-action=pin]").trigger("click");
  expect(w.find(".sg-candidate-bar").exists()).toBe(true);
  w.unmount();
});

it("debounces fast image steps and aborts obsolete model metadata on navigation and close", async () => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  const w = fixture();
  const previous = fetch;
  const requested: string[] = [];
  const signals: AbortSignal[] = [];
  vi.stubGlobal("fetch", (input: RequestInfo | URL, options?: RequestInit) => {
    if (!String(input).includes("/metadata")) return previous(input, options);
    requested.push(String(input)); signals.push(options!.signal!);
    return new Promise<Response>((_resolve, reject) => options!.signal!.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError"))));
  });
  try {
    await w.get("[data-action=open]").trigger("click"); await flushPromises();
    await w.findAll("[data-action=view]")[0].trigger("click");
    await w.get("[data-action=next]").trigger("click");
    await w.get("[data-action=next]").trigger("click");
    expect(requested).toHaveLength(0);
    await vi.advanceTimersByTimeAsync(300);
    expect(requested).toHaveLength(1); expect(requested[0]).toContain("/three/metadata");
    await w.get("[data-action=previous]").trigger("click");
    expect(signals[0].aborted).toBe(true);
    await vi.advanceTimersByTimeAsync(300);
    expect(requested).toHaveLength(2); expect(requested[1]).toContain("/two/metadata");
    await w.get("[data-action=close]").trigger("click");
    expect(signals.every((signal) => signal.aborted)).toBe(true);
    await vi.advanceTimersByTimeAsync(500);
    expect(requested).toHaveLength(2);
  } finally { w.unmount(); vi.useRealTimers(); }
});

it("drops obsolete metadata after a folder change and reopens without reusing cancelled work", async () => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  const w = fixture();
  const previous = fetch;
  const requests: Array<{ signal: AbortSignal; finish: (response: Response) => void }> = [];
  vi.stubGlobal("fetch", (input: RequestInfo | URL, options?: RequestInit) => {
    if (!String(input).includes("/metadata")) return previous(input, options);
    return new Promise<Response>((finish) => requests.push({ signal: options!.signal!, finish }));
  });
  const response = (name: string) => new Response(JSON.stringify({ status: "ok", prompt: {
    "1": { class_type: "CheckpointLoaderSimple", inputs: { ckpt_name: name } },
  }, workflow: null, warnings: [] }));
  try {
    await w.get("[data-action=open]").trigger("click"); await flushPromises();
    await w.findAll("[data-action=view]")[0].trigger("click");
    await vi.advanceTimersByTimeAsync(150);
    await w.get('[aria-label="Output folder"]').setValue("sub"); await flushPromises();
    expect(requests[0].signal.aborted).toBe(true);
    await w.findAll("[data-action=view]")[0].trigger("click");
    await vi.advanceTimersByTimeAsync(150);
    await w.get("[data-action=close]").trigger("click");
    expect(requests[1].signal.aborted).toBe(true);
    await w.get("[data-action=open]").trigger("click"); await flushPromises();
    await w.findAll("[data-action=view]")[0].trigger("click");
    await vi.advanceTimersByTimeAsync(150);
    expect(requests).toHaveLength(3);
    requests[2].finish(response("current-model")); await flushPromises();
    requests[0].finish(response("stale-folder")); requests[1].finish(response("stale-session")); await flushPromises();
    expect(w.text()).toContain("current-model");
    expect(w.text()).not.toContain("stale-folder"); expect(w.text()).not.toContain("stale-session");
  } finally { w.unmount(); vi.useRealTimers(); }
});

it("prepares a directional neighbor window and reuses it after a rapid reversal", async () => {
  const w = fixture();
  const previous = fetch;
  const previewFetches: string[] = [];
  vi.stubGlobal("fetch", (input: RequestInfo | URL, options?: RequestInit) => {
    const url = String(input);
    if (url.includes("/images?") || url.includes("/bootstrap?")) return Promise.resolve(pageResponse(input, {
      images: Array.from({ length: 30 }, (_, i) => image("i" + i)), next_cursor: null, version: "v1",
    }));
    if (url.includes("/thumbnail") && url.includes("size=512")) previewFetches.push(url);
    return previous(input, options);
  });
  try {
    await w.get("[data-action=open]").trigger("click"); await flushPromises();
    await w.findAll("[data-action=view]")[0].trigger("click"); await flushPromises();
    expect(previewFetches.some((url) => url.includes("/i3/thumbnail"))).toBe(true);
    for (let i = 0; i < 6; i++) await w.get("[data-action=next]").trigger("click");
    await flushPromises();
    await w.get("[data-action=previous]").trigger("click"); await flushPromises();
    expect(w.get("[data-side=right]").attributes("data-image")).toBe("i5");
    expect(w.find(".sg-image-preview img").exists()).toBe(true);
    expect(previewFetches.filter((url) => url.includes("/i5/thumbnail"))).toHaveLength(1);
  } finally { w.unmount(); }
});

it("reveals the current candidate when expanding the previously collapsed strip", async () => {
  const w = fixture();
  const previous = fetch;
  vi.stubGlobal("fetch", (input: RequestInfo | URL, options?: RequestInit) => (String(input).includes("/images?") || String(input).includes("/bootstrap?"))
    ? Promise.resolve(pageResponse(input, { images: Array.from({ length: 30 }, (_, i) => image("i" + i)), next_cursor: null, version: "v1" }))
    : previous(input, options));
  const width = vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(function (this: HTMLElement) {
    return this.classList.contains("sg-candidates") ? 200 : 640;
  });
  const offset = vi.spyOn(HTMLElement.prototype, "offsetLeft", "get").mockImplementation(function (this: HTMLElement) {
    return this.classList.contains("sg-current") ? 455 : 0;
  });
  const itemWidth = vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(58);
  try {
    await w.get("[data-action=open]").trigger("click"); await flushPromises();
    await w.findAll("[data-action=view]")[0].trigger("click");
    for (let i = 0; i < 9; i++) await w.get("[data-action=next]").trigger("click");
    await w.get("[data-action=candidates]").trigger("click"); await flushPromises();
    expect(w.get(".sg-candidates").element.scrollLeft).toBe(313);
  } finally { w.unmount(); width.mockRestore(); offset.mockRestore(); itemWidth.mockRestore(); }
});

it("does not restart saved-text search requests after the gallery component is unmounted", async () => {
  const w = fixture();
  const previous = fetch;
  const requested: string[] = [];
  vi.stubGlobal("fetch", (input: RequestInfo | URL, options?: RequestInit) => {
    const url = String(input);
    if (url.includes("/images?") || url.includes("/bootstrap?")) return Promise.resolve(pageResponse(input, {
      images: ["one", "two", "three", "four", "five", "six"].map(image), next_cursor: null, version: "v1",
    }));
    if (url.includes("/metadata")) {
      requested.push(url);
      return new Promise<Response>((_resolve, reject) => options!.signal!.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError"))));
    }
    return previous(input, options);
  });
  await w.get("[data-action=open]").trigger("click"); await flushPromises();
  await w.findAll(".sg-pin")[0].trigger("click");
  const { normalizeMetadata } = await import("../src/metadata");
  (w.vm as any).meta.set("one:1", normalizeMetadata({ status: "ok", prompt: {
    "1": { class_type: "CLIPTextEncode", inputs: { text: "cat" } },
  }, workflow: null, warnings: [] }));
  await w.findAll("button").find((button) => button.text() === "Find matching saved text")!.trigger("click");
  await flushPromises();
  expect(requested).toHaveLength(2);
  w.unmount(); await flushPromises();
  expect(requested).toHaveLength(2);
});

it("keeps real keyboard navigation inside the gallery after view, compare, and grid transitions", async () => {
  const w = fixture();
  const press = async (key: string) => {
    document.activeElement!.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }));
    await w.vm.$nextTick();
  };
  try {
    await w.get("[data-action=open]").trigger("click"); await flushPromises();
    const view = w.findAll<HTMLButtonElement>("[data-action=view]")[0];
    view.element.focus(); await view.trigger("click"); await flushPromises();
    await press("ArrowRight");
    expect(w.get("[data-side=right]").attributes("data-image")).toBe("two");
    expect(document.activeElement).toBe(w.get(".sg-view-body").element);
    const pin = w.get<HTMLButtonElement>("[data-action=pin]");
    pin.element.focus(); await pin.trigger("click"); await flushPromises();
    await press("ArrowRight");
    expect(w.get("[data-side=left]").attributes("data-image")).toBe("two");
    expect(w.get("[data-side=right]").attributes("data-image")).toBe("three");
    await press("Escape"); await flushPromises();
    expect(document.activeElement?.matches("[data-action=view]")).toBe(true);
    const compare = w.get<HTMLButtonElement>("[data-action=compare]");
    compare.element.focus(); await compare.trigger("click"); await flushPromises();
    expect(document.activeElement).toBe(w.get(".sg-view-body").element);
    await press("ArrowRight");
    expect(w.get("[data-side=right]").attributes("data-image")).toBe("three");
    await w.get("[data-action=close]").trigger("click"); await flushPromises();
    expect(document.activeElement).toBe(w.get("[data-action=open]").element);
  } finally { w.unmount(); }
});

it("preserves surviving select focus and its arrow-key behavior during a folder mode change", async () => {
  const w = fixture();
  try {
    await w.get("[data-action=open]").trigger("click"); await flushPromises();
    await w.findAll("[data-action=view]")[0].trigger("click"); await flushPromises();
    const folder = w.get<HTMLSelectElement>('[aria-label="Output folder"]');
    folder.element.focus();
    folder.element.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true, cancelable: true }));
    await w.vm.$nextTick();
    expect(w.get("[data-side=right]").attributes("data-image")).toBe("one");
    await folder.setValue("sub"); await flushPromises();
    expect(document.activeElement).toBe(folder.element);
    expect(w.find("[data-testid=image-grid]").exists()).toBe(true);
  } finally { w.unmount(); }
});
