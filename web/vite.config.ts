import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
export default defineConfig(({ command }) => ({
  plugins: [vue()],
  define:
    command === "build"
      ? {
          "process.env.NODE_ENV": JSON.stringify("production"),
          __VUE_OPTIONS_API__: false,
          __VUE_PROD_DEVTOOLS__: false,
          __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
        }
      : {},
  build: {
    lib: {
      entry: "src/extension.ts",
      formats: ["es"],
      fileName: () => "shiba-gallery.js",
    },
    outDir: "dist",
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: { output: { assetFileNames: "shiba-gallery.[ext]" } },
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts", "tests/**/*.test.ts"],
  },
}));
