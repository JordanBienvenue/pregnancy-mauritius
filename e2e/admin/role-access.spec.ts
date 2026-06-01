import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "../helpers/auth";

test.describe("Role-based access control", () => {
  test("admin can access all pages", async ({ page }) => {
    await loginAsAdmin(page);

    const adminPages = [
      "/en/admin",
      "/en/admin/users",
      "/en/admin/providers",
      "/en/admin/blog",
      "/en/admin/forum",
      "/en/admin/donations",
      "/en/admin/bookings",
      "/en/admin/sponsors",
      "/en/admin/marketplace",
      "/en/admin/settings",
    ];

    for (const url of adminPages) {
      await page.goto(url);
      // Should not see "Access Denied" on any page
      await expect(page.getByText("Access Denied")).not.toBeVisible({
        timeout: 3000,
      });
    }
  });
});
