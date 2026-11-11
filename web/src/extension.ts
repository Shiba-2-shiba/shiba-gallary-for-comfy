import { createApp } from "vue";
import Gallery from "./Gallery.vue";
import { GalleryApi, comfyScriptURL, type ComfyApi } from "./api";
import "./style.css";
interface ComfyApp {
  registerExtension: (extension: { name: string; setup: () => void }) => void;
}
const moduleURL = import.meta.url;
async function register() {
  const [{ app }, { api }] = await Promise.all([
    import(/* @vite-ignore */ comfyScriptURL(moduleURL, "app")) as Promise<{
      app: ComfyApp;
    }>,
    import(/* @vite-ignore */ comfyScriptURL(moduleURL, "api")) as Promise<{
      api: ComfyApi;
    }>,
  ]);
  app.registerExtension({
    name: "shiba.gallery",
    setup() {
      if (document.getElementById("shiba-gallery-root")) return;
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = new URL("./shiba-gallery.css", moduleURL).href;
      css.dataset.shibaGallery = "true";
      document.head.append(css);
      const root = document.createElement("div");
      root.id = "shiba-gallery-root";
      document.body.append(root);
      createApp(Gallery, { api: new GalleryApi(api) }).mount(root);
    },
  });
}
void register().catch(() =>
  console.error(
    "[Shiba Gallery] Could not register the gallery extension. Check ComfyUI extension loading and proxy paths.",
  ),
);
