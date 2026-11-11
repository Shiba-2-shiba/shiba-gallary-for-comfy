import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./harness",
  testMatch: "*.spec.ts",
  use: {
    baseURL: "http://127.0.0.1:4173",
    viewport: { width: 1440, height: 1000 },
    launchOptions: {
      executablePath: process.env.CHROMIUM_PATH,
      args: ["--no-sandbox"],
    },
  },
  webServer: {
    command: "node harness/server.mjs",
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
  reporter: "list",
});
