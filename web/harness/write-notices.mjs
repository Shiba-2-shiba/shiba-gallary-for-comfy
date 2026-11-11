import { readFile, writeFile } from "node:fs/promises";
const packages = [
  "vue",
  "@vue/runtime-dom",
  "@vue/runtime-core",
  "@vue/reactivity",
  "@vue/shared",
];
const notices = [
  "Shiba Gallery runtime dependency notices\n\nVue is bundled locally. No external runtime CDN is used.\n",
];
for (const name of packages) {
  const dir = new URL("../node_modules/" + name + "/", import.meta.url);
  const pkg = JSON.parse(await readFile(new URL("package.json", dir), "utf8"));
  notices.push(
    `\n${name} ${pkg.version}\nhttps://github.com/vuejs/core\n\n${await readFile(new URL("LICENSE", dir), "utf8")}`,
  );
}
await writeFile(
  new URL("../dist/THIRD_PARTY_NOTICES.txt", import.meta.url),
  notices.join("\n"),
);
