import { describe, it, expect } from "vitest";
import { GalleryApi, comfyScriptURL } from "./api";
describe("ComfyUI routing", () => {
  it("resolves scripts relative to the extension prefix, not browser root", () => {
    expect(
      comfyScriptURL(
        "https://host/proxy/8188/extensions/shiba/dist/shiba-gallery.js",
        "app",
      ),
    ).toBe("https://host/proxy/8188/scripts/app.js");
    expect(
      comfyScriptURL("https://host/extensions/shiba/shiba-gallery.js", "api"),
    ).toBe("https://host/scripts/api.js");
  });
  it("routes all image requests through the public apiURL and encodes opaque ids/revisions", () => {
    const api = new GalleryApi({
      apiURL: (route: string) => "/prefix" + route,
    });
    expect(api.imageURL({ id: "a/b", revision: "v&1" }, "thumbnail", 256)).toBe(
      "/prefix/shiba-gallery/image/a%2Fb/thumbnail?revision=v%261&size=256",
    );
  });
});
it("marks metadata requests low priority so originals can take precedence", async () => {
  const previous = globalThis.fetch;
  let priority: RequestPriority | undefined;
  globalThis.fetch = async (_input, options) => {
    priority = options?.priority;
    return new Response(
      JSON.stringify({
        status: "absent",
        prompt: null,
        workflow: null,
        warnings: [],
      }),
    );
  };
  try {
    const api = new GalleryApi({ apiURL: (r) => r });
    await api.metadata({ id: "image", revision: "1" });
    expect(priority).toBe("low");
  } finally {
    globalThis.fetch = previous;
  }
});
it("loads bounded 60-image pages instead of waiting for an entire usual folder", async () => {
  const previous = globalThis.fetch;
  let requested = "";
  globalThis.fetch = async (input) => {
    requested = String(input);
    return new Response(
      JSON.stringify({ images: [], version: "1", next_cursor: null }),
    );
  };
  try {
    await new GalleryApi({ apiURL: (r) => r }).images("out");
    expect(
      new URL(requested, "https://example.test").searchParams.get("limit"),
    ).toBe("60");
  } finally {
    globalThis.fetch = previous;
  }
});
it('bootstraps a selected folder through the proxy and exposes separate display and original download URLs', async () => {
  const previous = globalThis.fetch; let requested = '';
  globalThis.fetch = async (input) => { requested = String(input); return new Response('{}'); };
  try {
    const api = new GalleryApi({ apiURL: path => '/prefix' + path });
    await api.bootstrap('folder&one');
    const url = new URL(requested, 'https://example.test');
    expect(url.pathname).toBe('/prefix/shiba-gallery/bootstrap');
    expect(url.searchParams.get('folder_id')).toBe('folder&one');
    expect(url.searchParams.get('limit')).toBe('60');
    expect(api.imageURL({ id:'one',revision:'1' }, 'display')).toContain('/display?');
    expect(api.imageURL({ id:'one',revision:'1' }, 'download')).toContain('/download?');
  } finally { globalThis.fetch = previous; }
});
