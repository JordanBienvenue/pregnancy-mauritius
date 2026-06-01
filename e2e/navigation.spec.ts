import { test, expect } from '@playwright/test';

const publicRoutes = [
  '/en',
  '/en/blog',
  '/en/directory',
  '/en/donate',
  '/en/emergency',
  '/en/food-guide',
  '/en/rights',
];

for (const route of publicRoutes) {
  test(`${route} loads successfully`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    // Page should have content
    await expect(page.locator('body')).not.toBeEmpty();
  });
}
