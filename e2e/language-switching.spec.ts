import { test, expect } from '@playwright/test';

test.describe('Language switching', () => {
  test('English page loads at /en', async ({ page }) => {
    const response = await page.goto('/en');
    expect(response?.status()).toBe(200);
    // URL should contain /en
    expect(page.url()).toContain('/en');
  });

  test('French page loads at /fr', async ({ page }) => {
    const response = await page.goto('/fr');
    expect(response?.status()).toBe(200);
    expect(page.url()).toContain('/fr');
  });

  test('Kreol page loads at /cr', async ({ page }) => {
    const response = await page.goto('/cr');
    expect(response?.status()).toBe(200);
    expect(page.url()).toContain('/cr');
  });

  test('different locales serve content for the same page', async ({ page }) => {
    // Load English home page
    await page.goto('/en');
    const enBody = await page.locator('body').textContent();

    // Load French home page
    await page.goto('/fr');
    const frBody = await page.locator('body').textContent();

    // Both pages should have content
    expect(enBody?.length).toBeGreaterThan(0);
    expect(frBody?.length).toBeGreaterThan(0);
  });

  test('public routes work under /fr locale', async ({ page }) => {
    const response = await page.goto('/fr/emergency');
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('auth routes work under /fr locale', async ({ page }) => {
    const response = await page.goto('/fr/login');
    expect(response?.status()).toBe(200);
    // Login form should still be present
    await expect(page.getByPlaceholder('mama@email.com')).toBeVisible();
  });

  test('navigation links use the current locale', async ({ page }) => {
    await page.goto('/en');
    // Links in the page should be prefixed with /en
    const links = page.locator('a[href^="/en/"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });
});
