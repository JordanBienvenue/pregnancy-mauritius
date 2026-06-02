import { test, expect } from "@playwright/test";
import { loginAs, TEST_USERS, TEST_PASSWORD } from "../helpers/auth";

// These assertions only make sense at a mobile viewport (the bar is lg:hidden).
test.use({ viewport: { width: 390, height: 844 } });

test("bottom nav is hidden when signed out", async ({ page }) => {
  await page.goto("/en");
  await expect(page.getByTestId("bottom-nav-forum")).toHaveCount(0);
});

test("authenticated mobile users get a working bottom tab bar", async ({
  page,
}) => {
  await loginAs(page, TEST_USERS.user, TEST_PASSWORD, "en");

  // Bar visible with all five tabs.
  for (const tab of ["home", "forum", "tracker", "donate", "profile"]) {
    await expect(page.getByTestId(`bottom-nav-${tab}`)).toBeVisible();
  }

  // Tapping Forum navigates and marks the tab active.
  await page.getByTestId("bottom-nav-forum").click();
  await page.waitForURL(/\/en\/forum/);
  await expect(page.getByTestId("bottom-nav-forum")).toHaveAttribute(
    "aria-current",
    "page"
  );

  // Tapping Tracker navigates.
  await page.getByTestId("bottom-nav-tracker").click();
  await page.waitForURL(/\/en\/tracker/);
  await expect(page.getByTestId("bottom-nav-tracker")).toHaveAttribute(
    "aria-current",
    "page"
  );
  console.log("[result] mobile bottom nav works -> YES");
});

test("bottom nav is not shown on desktop width", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await loginAs(page, TEST_USERS.user, TEST_PASSWORD, "en");
  // lg:hidden → the bar collapses; the link is not visible on desktop.
  await expect(page.getByTestId("bottom-nav-forum")).toBeHidden();
});
