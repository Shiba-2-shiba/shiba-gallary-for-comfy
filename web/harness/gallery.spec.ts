import { test, expect } from "@playwright/test";
import { unexpectedProxyRequests } from "./proxyRequests";
test("production extension loads through proxy, virtualizes grid and preserves comparison lifecycle", async ({
  page,
  baseURL,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  const expectedPageURL = new URL("/proxy/8188/", baseURL).href;
  await page.goto(expectedPageURL);
  await expect(page).toHaveURL(expectedPageURL);
  await page.getByRole("button", { name: "Open Gallery", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByTestId("image-grid")).toBeVisible();
  await expect(page.locator(".sg-thumb-button img").first()).toBeVisible();
  const count = await page.locator(".sg-card").count();
  expect(count).toBeLessThan(100);
  expect(
    unexpectedProxyRequests(requests, expectedPageURL),
    "HTTP requests must keep the same origin and proxy prefix",
  ).toEqual([]);
  await page.getByLabel("Select shiba_00000.png", { exact: true }).check();
  await page.getByLabel("Select shiba_00001.png", { exact: true }).check();
  await page.getByLabel("Select shiba_00002.png", { exact: true }).check();
  await page
    .getByRole("button", { name: "Compare selected", exact: true })
    .click();
  await expect(page.locator("[data-side=left]")).toHaveAttribute(
    "data-image",
    "out-0",
  );
  await expect(page.locator("[data-side=right]")).toHaveAttribute(
    "data-image",
    "out-0",
  );
  await page.getByRole("button", { name: "Next image", exact: true }).click();
  await expect(page.locator("[data-side=left]")).toHaveAttribute(
    "data-image",
    "out-0",
  );
  await expect(page.locator("[data-side=right]")).toHaveAttribute(
    "data-image",
    "out-1",
  );
  await page.getByRole("button", { name: "Differences", exact: true }).click();
  await expect(
    page.getByRole("complementary", { name: "Saved settings" }),
  ).toBeVisible();
  await expect(page.locator(".sg-difference").first()).toBeVisible();
  await page.screenshot({ path: "harness/comparison.png" });
  await page
    .getByLabel("Reference image", { exact: true })
    .selectOption("out-2");
  await expect(page.locator("[data-side=left]")).toHaveAttribute(
    "data-image",
    "out-2",
  );
  await expect(page.locator("[data-side=right]")).toHaveAttribute(
    "data-image",
    "out-2",
  );
  await page
    .getByRole("button", { name: "Close Gallery", exact: true })
    .click();
  await page.getByRole("button", { name: "Open Gallery", exact: true }).click();
  await expect(page.getByText("0 selected", { exact: true })).toBeVisible();
  await page.getByLabel("Output folder").selectOption("sub");
  await expect(page.getByText("12 images", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Large", exact: true }).click();
  await page.screenshot({ path: "harness/grid.png" });
  expect(
    unexpectedProxyRequests(requests, expectedPageURL),
    "HTTP requests after comparison/folder navigation must keep the proxy prefix",
  ).toEqual([]);
  await expect(page).toHaveURL(expectedPageURL);
  expect(errors).toEqual([]);
});
test("linked pan zoom and original pixel display preserve left/right placement", async ({
  page,
}) => {
  await page.goto("/proxy/8188/");
  await page.getByRole("button", { name: "Open Gallery", exact: true }).click();
  await page
    .getByLabel("Pin shiba_00000.png as reference", { exact: true })
    .click();
  await page.getByRole("button", { name: "Next image", exact: true }).click();
  await expect(page.locator("[data-side=left] .sg-original")).toBeVisible();
  await expect(page.locator("[data-side=right] .sg-original")).toBeVisible();
  await page
    .getByRole("button", { name: "Show left original pixels", exact: true })
    .click();
  await expect
    .poll(() =>
      page
        .locator("[data-side=left] .sg-original")
        .evaluate((el) => Math.round(el.getBoundingClientRect().width)),
    )
    .toBe(768);
  await expect
    .poll(() =>
      page
        .locator("[data-side=right] .sg-original")
        .evaluate((el) => Math.round(el.getBoundingClientRect().width)),
    )
    .toBe(1024);
  await page.getByRole("button", { name: "Fit", exact: true }).click();
  await page.locator("[data-side=right] .sg-image-surface").hover();
  await page.mouse.wheel(0, -300);
  await expect
    .poll(
      async () => await page.locator("[data-side=left] .sg-models").innerText(),
    )
    .toContain("157%");
  await expect(page.locator("[data-side=right] .sg-models")).toContainText(
    "157%",
  );
  await page.getByLabel("Link zoom and pan").uncheck();
  await page.locator("[data-side=right] .sg-image-surface").hover();
  await page.mouse.wheel(0, -300);
  await expect(page.locator("[data-side=left] .sg-models")).toContainText(
    "157%",
  );
  await expect(page.locator("[data-side=right] .sg-models")).toContainText(
    "246%",
  );
});
test("single view immediately reuses the grid preview while its original is still loading", async ({
  page,
}) => {
  await page.goto("/proxy/8188/");
  await page.getByRole("button", { name: "Open Gallery", exact: true }).click();
  await expect(page.locator(".sg-thumb-button img").first()).toBeVisible();
  let release!: () => void;
  const pending = new Promise<void>((resolve) => (release = resolve));
  await page.route("**/original?**", async (route) => {
    await pending;
    await route.continue();
  });
  try {
    await page
      .getByRole("button", { name: "View shiba_00000.png", exact: true })
      .click();
    await expect(page.locator(".sg-image-preview img")).toBeVisible();
    await expect(page.locator(".sg-quality-status")).toContainText(
      "Loading original",
    );
    await expect(page.locator(".sg-image-surface")).not.toContainText(
      "Loading original",
    );
  } finally {
    release();
  }
  await expect(page.locator(".sg-quality-status")).toHaveText("Original");
  await expect(page.locator(".sg-image-preview")).toHaveCount(0);
});

for (const index of [0, 1]) {
  test(`single ${index ? "square" : "portrait"} image uses more space than the comparison pane without cropping`, async ({ page }) => {
    await page.goto("/proxy/8188/");
    await page.getByRole("button", { name: "Open Gallery", exact: true }).click();
    await page.getByRole("button", { name: `View shiba_0000${index}.png`, exact: true }).click();
    await expect(page.locator(".sg-quality-status")).toHaveText("Original");
    await expect(page.locator(".sg-candidate-bar")).toHaveCount(0);
    const original = page.locator("[data-side=right] .sg-original");
    const single = (await original.boundingBox())!;
    const surface = (await page.locator("[data-side=right] .sg-image-surface").boundingBox())!;
    expect(single.x).toBeGreaterThanOrEqual(surface.x - 1);
    expect(single.y).toBeGreaterThanOrEqual(surface.y - 1);
    expect(single.x + single.width).toBeLessThanOrEqual(surface.x + surface.width + 1);
    expect(single.y + single.height).toBeLessThanOrEqual(surface.y + surface.height + 1);
    await page.getByRole("button", { name: "Show candidates", exact: true }).click();
    await expect(page.locator(".sg-candidate-bar")).toBeVisible();
    await page.getByRole("button", { name: "Hide candidates", exact: true }).click();
    await page.getByRole("button", { name: "Pin as reference", exact: true }).click();
    await expect(page.locator("[data-side=right] .sg-quality-status")).toHaveText("Original");
    // The already-loaded right pane survives mode switching. Its Original
    // status can precede ResizeObserver's new comparison layout measurement.
    await expect.poll(async () => single.height / (await original.boundingBox())!.height).toBeGreaterThan(1.1);
    await expect.poll(async () => single.width / (await original.boundingBox())!.width).toBeGreaterThan(1.1);
  });
}

test("rapid forward and reverse navigation shows a prepared preview while originals are held", async ({ page }) => {
  const prepared: string[] = [];
  // Large grid cards already fetch/cache 512px previews. Observe before opening
  // the grid: a single-view cache hit correctly produces no new request.
  page.on("requestfinished", (request) => {
    if (request.url().includes("/thumbnail?") && request.url().includes("size=512")) prepared.push(request.url());
  });
  await page.goto("/proxy/8188/");
  await page.getByRole("button", { name: "Open Gallery", exact: true }).click();
  await expect(page.locator(".sg-thumb-button img").first()).toBeVisible();
  let release!: () => void;
  const pending = new Promise<void>((resolve) => (release = resolve));
  await page.route("**/original?**", async (route) => { await pending; await route.continue(); });
  try {
    await page.getByRole("button", { name: "View shiba_00000.png", exact: true }).click();
    await expect.poll(() => prepared.some((url) => url.includes("/out-3/thumbnail"))).toBe(true);
    for (let i = 0; i < 6; i++) await page.keyboard.press("ArrowRight");
    await expect(page.locator("[data-side=right]")).toHaveAttribute("data-image", "out-6");
    await expect(page.locator(".sg-image-preview img")).toBeVisible();
    await page.keyboard.press("ArrowLeft");
    await expect(page.locator("[data-side=right]")).toHaveAttribute("data-image", "out-5");
    await expect(page.locator(".sg-image-preview img")).toBeVisible();
    await expect(page.locator(".sg-quality-status")).toContainText("Loading original");
    await page.getByRole("button", { name: "Close Gallery", exact: true }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  } finally { release(); }
});

test("saved settings prepare collapsed values on demand and retain node matching", async ({ page }) => {
  await page.goto("/proxy/8188/");
  await page.getByRole("button", { name: "Open Gallery", exact: true }).click();
  await page.getByLabel("Pin shiba_00000.png as reference", { exact: true }).click();
  await page.getByRole("button", { name: "Next image", exact: true }).click();
  await page.getByRole("button", { name: "Differences", exact: true }).click();
  const panel = page.getByRole("complementary", { name: "Saved settings" });
  await expect(panel.locator(".sg-difference").first()).toBeVisible();
  await expect(panel.locator(".sg-match-row")).toHaveCount(0);
  const mapping = panel.locator("details").filter({ has: page.locator("summary", { hasText: "Review / change node matching" }) });
  await mapping.locator(":scope > summary").click();
  await expect(mapping.locator(".sg-match-row")).toHaveCount(4);
  const row = mapping.locator(".sg-match-row").first();
  await expect(row.locator("pre")).toHaveCount(0);
  await row.getByText("Left saved values", { exact: true }).click();
  await expect(row.locator("pre").first()).toContainText("shiba-model-b.safetensors");
  await mapping.locator(":scope > summary").click();
  await expect(panel.locator(".sg-match-row")).toHaveCount(0);
  const original = panel.locator("details").filter({ has: page.locator("summary", { hasText: "Original saved JSON" }) });
  await expect(original.locator("pre")).toHaveCount(0);
  await original.locator(":scope > summary").click();
  await expect(original.locator("pre")).toContainText("CheckpointLoaderSimple");
  await original.locator(":scope > summary").click();
  await expect(original.locator("pre")).toHaveCount(0);
});

test("frame-coalesced pan keeps final position and linked reset", async ({ page }) => {
  await page.goto("/proxy/8188/");
  await page.getByRole("button", { name: "Open Gallery", exact: true }).click();
  await page.getByLabel("Pin shiba_00000.png as reference", { exact: true }).click();
  await expect(page.locator("[data-side=right] .sg-quality-status")).toHaveText("Original");
  const surface = page.locator("[data-side=right] .sg-image-surface");
  const image = page.locator("[data-side=right] .sg-original");
  const before = (await image.boundingBox())!;
  const box = (await surface.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 90, box.y + box.height / 2 + 45, { steps: 30 });
  await page.mouse.up();
  await expect.poll(async () => Math.round((await image.boundingBox())!.x - before.x)).toBe(90);
  await expect.poll(async () => Math.round((await image.boundingBox())!.y - before.y)).toBe(45);
  await expect.poll(async () => page.locator("[data-side=left] .sg-original").getAttribute("style")).toBe(await image.getAttribute("style"));
  await page.getByRole("button", { name: "Fit", exact: true }).click();
  await expect.poll(async () => Math.round((await image.boundingBox())!.x)).toBe(Math.round(before.x));
});
