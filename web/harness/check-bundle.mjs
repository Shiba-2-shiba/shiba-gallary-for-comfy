// Execute the built extension in a browser-like environment with no Node globals.
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
const dom = new JSDOM(
  "<!doctype html><html><head></head><body></body></html>",
  { url: "https://example.test/proxy/8188/" },
);
const window = dom.window;
let registered = "";
const scriptURL =
  "https://example.test/proxy/8188/extensions/shiba/dist/shiba-gallery.js";
const context = vm.createContext({
  document: window.document,
  window,
  navigator: window.navigator,
  Element: window.Element,
  HTMLElement: window.HTMLElement,
  SVGElement: window.SVGElement,
  Node: window.Node,
  ShadowRoot: window.ShadowRoot,
  URL,
  AbortController,
  console,
  Set,
  Map,
  performance,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
});
const app = {
  registerExtension(extension) {
    registered = extension.name;
    extension.setup();
  },
};
const api = {
  apiURL: (route) => "/proxy/8188" + route,
  addEventListener() {},
  removeEventListener() {},
};
const imported = [];
const module = new vm.SourceTextModule(
  await readFile(new URL("../dist/shiba-gallery.js", import.meta.url), "utf8"),
  {
    context,
    identifier: scriptURL,
    initializeImportMeta(meta) {
      meta.url = scriptURL;
    },
    async importModuleDynamically(specifier) {
      imported.push(specifier);
      const name = specifier.endsWith("/app.js") ? "app" : "api";
      const value = name === "app" ? app : api;
      const dependency = new vm.SyntheticModule(
        [name],
        function () {
          this.setExport(name, value);
        },
        { context },
      );
      await dependency.link(() => {});
      await dependency.evaluate();
      return dependency;
    },
  },
);
await module.link(() => {
  throw new Error("Unexpected external runtime dependency");
});
await module.evaluate();
await new Promise((resolve) => setTimeout(resolve, 30));
assert.equal(registered, "shiba.gallery");
assert.equal(
  window.document.querySelector("[data-action=open]")?.textContent?.trim(),
  "▧ Gallery",
);
assert.deepEqual(imported.sort(), [
  "https://example.test/proxy/8188/scripts/api.js",
  "https://example.test/proxy/8188/scripts/app.js",
]);
assert.equal(
  window.document.querySelector("link")?.href,
  "https://example.test/proxy/8188/extensions/shiba/dist/shiba-gallery.css",
);
process.stdout.write(
  "Production bundle registered and mounted without Node globals; proxy script and CSS URLs verified.\n",
);
dom.window.close();
