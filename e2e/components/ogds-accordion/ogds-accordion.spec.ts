import { test, expect } from "@playwright/test";
import { StorybookPage } from "../../models/storybook-page";

const stories = [
  { name: "default", storyId: "components-accordion--default" },
  { name: "bordered", storyId: "components-accordion--bordered" },
  {
    name: "with-chevron-icons",
    storyId: "components-accordion--with-chevron-icons",
  },
  {
    name: "with-chevron-icons-right",
    storyId: "components-accordion--with-chevron-icons-right",
  },
  {
    name: "with-chevron-icons-bordered",
    storyId: "components-accordion--with-chevron-icons-bordered",
  },
  { name: "with-plus-icons", storyId: "components-accordion--with-plus-icons" },
  {
    name: "with-plus-icons-bordered",
    storyId: "components-accordion--with-plus-icons-bordered",
  },
];

for (const { name, storyId } of stories) {
  test.describe(`ogds-accordion visual regression — ${name}`, () => {
    test.beforeEach(async ({ page }) => {
      const storybookPage = new StorybookPage(page);
      await storybookPage.gotoAndWaitForDomLoaded(storyId);
    });

    test("collapsed state should match visual snapshot", async ({ page }) => {
      const accordion = page.locator("ogds-accordion");
      await expect(accordion).toHaveScreenshot(`collapsed-${name}.png`);
    });

    test("expanded state should match visual snapshot", async ({ page }) => {
      await page
        .locator("ogds-accordion details")
        .first()
        .evaluate((el) => {
          (el as HTMLDetailsElement).open = true;
        });
      const accordion = page.locator("ogds-accordion");
      await expect(accordion).toHaveScreenshot(`expanded-${name}.png`);
    });
  });
}
