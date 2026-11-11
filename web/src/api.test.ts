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
