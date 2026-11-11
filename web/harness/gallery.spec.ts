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
