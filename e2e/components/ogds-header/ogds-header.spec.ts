import { test, expect } from "@playwright/test";
import { StorybookPage } from "../../models/storybook-page";

test.describe("ogds-header menu drawer", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    const storybookPage = new StorybookPage(page);
    await storybookPage.gotoAndWaitForDomLoaded("components-header--extended");
  });

  test("opens and closes the drawer via the menu and close buttons", async ({
    page,
  }) => {
    const menuButton = page.getByRole("button", {
      name: "Menu",
      exact: true,
    });
    const primaryNavLink = page.getByRole("link", { name: "Current section" });

    await expect(primaryNavLink).not.toBeVisible();

    await menuButton.click();
    await expect(primaryNavLink).toBeVisible();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");

    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(primaryNavLink).not.toBeVisible();
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  test("can be reopened after closing", async ({ page }) => {
    const menuButton = page.getByRole("button", {
      name: "Menu",
      exact: true,
    });
    const primaryNavLink = page.getByRole("link", { name: "Current section" });

    await menuButton.click();
    await page.getByRole("button", { name: "Close menu" }).click();
    await menuButton.click();

    await expect(primaryNavLink).toBeVisible();
  });
});
