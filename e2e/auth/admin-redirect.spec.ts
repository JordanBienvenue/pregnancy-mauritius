import { test, expect } from "@playwright/test";
import { loginAsUser } from "../helpers/auth";

test.describe("Admin route protection", () => {
  test("unauthenticated user is redirected to login", async ({ page }) => {
    await page.goto("/en/admin");
    await expect(page).toHaveURL(/\/en\/login/);
  });

  test("regular user is redirected away from admin", async ({ page }) => {
    await loginAsUser(page);
    await page.goto("/en/admin");
    // Should be redirected to homepage, not admin
    await expect(page).not.toHaveURL(/\/admin/);
  });
});
