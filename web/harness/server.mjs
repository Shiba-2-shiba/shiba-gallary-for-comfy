// Synthetic, local-only browser harness. No user images or ComfyUI install needed.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const base = "/proxy/8188";
const port = Number(process.env.PORT || 4173);
const root = fileURLToPath(new URL("../", import.meta.url));
const image = (n, folder = "out") => ({
  id: folder + "-" + n,
  folder_id: folder,
  name: `shiba_${String(n).padStart(5, "0")}.png`,
  revision: "v1",
  mtime_ns: 10000 - n,
  width: n % 2 ? 1024 : 768,
  height: 1024,
});
const svg = (n) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${n % 2 ? 1024 : 768}" height="1024" viewBox="0 0 768 1024"><defs><linearGradient id="g" x2="0" y2="1"><stop stop-color="hsl(${185 + n * 7} 40% 19%)"/><stop offset="1" stop-color="#0b1626"/></linearGradient></defs><rect width="768" height="1024" fill="url(#g)"/><circle cx="570" cy="260" r="140" fill="#d2b878" opacity=".9"/><path d="M0 800 200 310 390 720 560 480 768 900V1024H0" fill="#284955"/><path d="M0 900 360 550 768 880V1024H0" fill="#122d35"/><text x="50" y="960" font-size="32" font-family="sans-serif" fill="#b8dce0">SHIBA / ${String(n).padStart(3, "0")}</text></svg>`;
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    const path = url.pathname;
    const send = (body, type = "application/json") => {
      res.setHeader("Content-Type", type);
      res.end(type === "application/json" ? JSON.stringify(body) : body);
    };
    if (path === "/" || path === base + "/") {
      send(
        `<!doctype html><html><head><title>Shiba Gallery · synthetic ComfyUI harness</title><style>body{margin:0;background:#1c2026;color:#bcc6d3;font:14px system-ui} .canvas{position:absolute;inset:0;background-image:radial-gradient(#4c5560 1px,transparent 1px);background-size:24px 24px}.node{position:absolute;border:1px solid #566371;background:#2a323e;border-radius:8px;width:210px;height:140px;padding:16px}.queue{position:fixed;right:18px;top:110px;background:#4a637c;border:0;color:white;border-radius:8px;padding:14px 23px}</style></head><body><main class="canvas"><h2 style="margin:30px">ComfyUI · synthetic test workflow</h2><div class="node" style="left:14%;top:30%">Load checkpoint<hr>saved-model.safetensors</div><div class="node" style="left:45%;top:40%">KSampler<hr>steps 20 · cfg 7</div><button class="queue">Queue ▶</button></main><script type="module" src="${base}/extensions/shiba/dist/shiba-gallery.js"></script></body></html>`,
        "text/html",
      );
      return;
    }
    if (path === base + "/scripts/app.js") {
      send(
        `export const app={registerExtension:extension=>extension.setup()};`,
        "text/javascript",
      );
      return;
    }
    if (path === base + "/scripts/api.js") {
      send(
        `const bus=new EventTarget();window.galleryHarness={refresh:()=>bus.dispatchEvent(new Event('executed'))};export const api={apiURL:path=>'${base}'+path,addEventListener:(...args)=>bus.addEventListener(...args),removeEventListener:(...args)=>bus.removeEventListener(...args)};`,
        "text/javascript",
      );
      return;
    }
    if (path.startsWith(base + "/extensions/shiba/dist/")) {
      const file = path.slice((base + "/extensions/shiba/dist/").length);
      if (!["shiba-gallery.js", "shiba-gallery.css"].includes(file)) {
        res.writeHead(404).end();
        return;
      }
      send(
        await readFile(root + "dist/" + file),
        file.endsWith(".css") ? "text/css" : "text/javascript",
      );
      return;
    }
    if (path === base + "/shiba-gallery/folders") {
      send({
        folders: [
          { id: "out", name: "output" },
          { id: "sub", name: "output/portraits" },
          { id: "empty", name: "output/empty" },
        ],
      });
      return;
    }
    if (path === base + "/shiba-gallery/images" || path === base + "/shiba-gallery/bootstrap") {
      const folder = url.searchParams.get("folder_id") || "out";
      const count = folder === "out" ? 450 : folder === "sub" ? 12 : 0;
      const offset = Number(url.searchParams.get("cursor") || 0);
      const limit = Number(url.searchParams.get("limit") || 160);
      const end = Math.min(count, offset + limit);
      const page = {
        images: Array.from({ length: end - offset }, (_, i) =>
          image(i + offset, folder),
        ),
        next_cursor: end < count ? String(end) : null,
        version: "fixture-v1",
      };
      send(path.endsWith("/bootstrap") ? { folder: {id: folder, name: folder === "sub" ? "output/portraits" : "output"}, page } : page);
      return;
    }
    const match = path.match(
      /\/shiba-gallery\/image\/([^/]+)\/(thumbnail|display|original|download|metadata)$/,
    );
    if (match) {
      const [, id, kind] = match;
      const n = Number(id.split("-").at(-1));
      if (kind === "metadata") {
        const prompt = {
          1: {
            class_type: "CheckpointLoaderSimple",
            inputs: {
              ckpt_name:
                n % 3
                  ? "shiba-model-a.safetensors"
                  : "shiba-model-b.safetensors",
            },
          },
          2: {
            class_type: "CLIPTextEncode",
            inputs: { text: n % 2 ? "mountain, moon" : "forest, river" },
          },
          3: {
            class_type: "KSampler",
            inputs: { steps: 20 + (n % 3), cfg: 7 + (n % 2), seed: 90000 + n },
          },
          4: { class_type: "AFM", inputs: { strength: [1, 0.5 + n / 100, 0] } },
        };
        send({
          status: "ok",
          prompt,
          workflow: null,
          raw_prompt: JSON.stringify(prompt),
          raw_workflow: null,
          warnings: [],
        });
        return;
      }
      if (kind === "download") res.setHeader("Content-Disposition", `attachment; filename="shiba_${String(n).padStart(5, "0")}.png"`);
      send(svg(n), "image/svg+xml");
      return;
    }
    res.writeHead(404).end("Not found");
  } catch {
    res.writeHead(500).end("Harness failure");
  }
}).listen(port, "127.0.0.1", () =>
  process.stdout.write(`Gallery harness: http://127.0.0.1:${port}${base}/\n`),
);
