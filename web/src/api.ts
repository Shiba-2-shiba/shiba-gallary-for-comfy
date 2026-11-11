import type { ImageRecord } from "./state";
export interface Folder {
  id: string;
  name: string;
}
export interface MetadataResponse {
  status: string;
  prompt: unknown | null;
  workflow: unknown | null;
  warnings: string[];
}
export interface ImagePage {
  images: ImageRecord[];
  next_cursor: string | null;
  version: string;
}
export interface ComfyApi {
  apiURL: (route: string) => string;
  addEventListener?: (name: string, callback: EventListener) => void;
  removeEventListener?: (name: string, callback: EventListener) => void;
}
export function comfyScriptURL(
  extensionURL: string,
  module: "app" | "api",
): string {
  const url = new URL(extensionURL);
  const marker = url.pathname.lastIndexOf("/extensions/");
  if (marker < 0)
    throw new Error("Gallery must load from the ComfyUI extensions directory.");
  url.pathname = url.pathname.slice(0, marker) + "/scripts/" + module + ".js";
  url.search = "";
  url.hash = "";
  return url.href;
}
export class GalleryApi {
  constructor(readonly comfy: ComfyApi) {}
  private async get<T>(
    path: string,
    signal?: AbortSignal,
    priority: RequestPriority = "auto",
  ): Promise<T> {
    const response = await fetch(this.comfy.apiURL("/shiba-gallery" + path), {
      signal,
      credentials: "same-origin",
      priority,
    });
    if (!response.ok) {
      let message = "Request failed (" + response.status + ")";
      try {
        const body = await response.json();
        message =
          body.error?.message ??
          body.message ??
          (typeof body.error === "string" ? body.error : message);
      } catch {}
      throw new Error(message);
    }
    return response.json() as Promise<T>;
  }
  bootstrap(folderId = "", signal?: AbortSignal) {
    const query = new URLSearchParams({ limit: "60" });
    if (folderId) query.set("folder_id", folderId);
    return this.get<{ folder: Folder; page: ImagePage }>("/bootstrap?" + query, signal, "high");
  }
  folders(signal?: AbortSignal) {
    return this.get<{ folders: Folder[] }>("/folders", signal);
  }
  images(folderId: string, cursor: string | null = null, signal?: AbortSignal) {
    const query = new URLSearchParams({ folder_id: folderId, limit: "60" });
    if (cursor) query.set("cursor", cursor);
    return this.get<ImagePage>("/images?" + query, signal);
  }
  metadata(image: Pick<ImageRecord, "id" | "revision">, signal?: AbortSignal) {
    return this.get<MetadataResponse>(
      "/image/" +
        encodeURIComponent(image.id) +
        "/metadata?" +
        new URLSearchParams({ revision: image.revision }),
      signal,
      "low",
    );
  }
  imageURL(
    image: Pick<ImageRecord, "id" | "revision">,
    kind: "thumbnail" | "display" | "original" | "download",
    size?: 256 | 512,
  ) {
    const query = new URLSearchParams({ revision: image.revision });
    if (size) query.set("size", String(size));
    return this.comfy.apiURL(
      "/shiba-gallery/image/" +
        encodeURIComponent(image.id) +
        "/" +
        kind +
        "?" +
        query,
    );
  }
}
