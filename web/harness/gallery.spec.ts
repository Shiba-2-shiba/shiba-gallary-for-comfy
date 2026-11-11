import { test, expect } from "@playwright/test";
test("production extension loads through proxy, virtualizes grid and preserves comparison lifecycle", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const paths: string[] = [];
  page.on("request", (request) => paths.push(new URL(request.url()).pathname));
  await page.goto("/proxy/8188/");
  await page.getByRole("button", { name: "Open Gallery", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByTestId("image-grid")).toBeVisible();
  await expect(page.locator(".sg-thumb-button img").first()).toBeVisible();
  const count = await page.locator(".sg-card").count();
  expect(count).toBeLessThan(100);
  expect(
    paths.every(
      (path) => path.startsWith("/proxy/8188/") || path === "/favicon.ico",
    ),
  ).toBeTruthy();
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
    "out-1",
  );
  await page.getByRole("button", { name: "Next image", exact: true }).click();
  await expect(page.locator("[data-side=left]")).toHaveAttribute(
    "data-image",
    "out-0",
  );
  await expect(page.locator("[data-side=right]")).toHaveAttribute(
    "data-image",
    "out-2",
  );
  await page.getByRole("button", { name: "Differences", exact: true }).click();
  await expect(
    page.getByRole("complementary", { name: "Saved settings" }),
  ).toBeVisible();
  await expect(page.locator(".sg-difference").first()).toBeVisible();
  await page.screenshot({ path: "harness/comparison.png" });
  await page
    .getByRole("button", { name: "Close Gallery", exact: true })
    .click();
  await page.getByRole("button", { name: "Open Gallery", exact: true }).click();
  await expect(page.getByText("0 selected", { exact: true })).toBeVisible();
  await page.getByLabel("Output folder").selectOption("sub");
  await expect(page.getByText("12 images", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Large", exact: true }).click();
  await page.screenshot({ path: "harness/grid.png" });
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
  await expect(page.locator("[data-side=left] img")).toBeVisible();
  await expect(page.locator("[data-side=right] img")).toBeVisible();
  await page
    .getByRole("button", { name: "Show left original pixels", exact: true })
    .click();
  await expect
    .poll(() =>
      page
        .locator("[data-side=left] .sg-image-surface img")
        .evaluate((el) => Math.round(el.getBoundingClientRect().width)),
    )
    .toBe(768);
  await expect
    .poll(() =>
      page
        .locator("[data-side=right] .sg-image-surface img")
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
