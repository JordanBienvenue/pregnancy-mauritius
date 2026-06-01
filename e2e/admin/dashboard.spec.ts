import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "../helpers/auth";

test.describe("Admin Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/en/admin");
  });

  test("dashboard page loads", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();
  });

  test("shows stat cards", async ({ page }) => {
    await expect(page.getByText(/total users/i)).toBeVisible();
    await expect(page.getByText(/active providers/i)).toBeVisible();
    await expect(page.getByText(/published posts/i)).toBeVisible();
  });

  test("sidebar navigation is visible", async ({ page }) => {
    await expect(page.getByText("Blog")).toBeVisible();
    await expect(page.getByText("Users")).toBeVisible();
    await expect(page.getByText("Settings")).toBeVisible();
  });
});
