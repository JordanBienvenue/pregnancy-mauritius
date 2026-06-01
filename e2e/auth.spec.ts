import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('login page renders and accepts credentials', async ({ page }) => {
    await page.goto('/en/login');
    await expect(page.getByPlaceholder('mama@email.com')).toBeVisible();
    await expect(page.getByPlaceholder('••••••••')).toBeVisible();
  });

  test('register page renders all fields', async ({ page }) => {
    await page.goto('/en/register');
    await expect(page.getByPlaceholder('Priya Ramgoolam')).toBeVisible();
    await expect(page.getByPlaceholder('mama@email.com')).toBeVisible();
    await expect(page.getByPlaceholder('+230 5XXX XXXX')).toBeVisible();
  });

  test('forgot password page renders', async ({ page }) => {
    await page.goto('/en/forgot-password');
    await expect(page.getByPlaceholder('mama@email.com')).toBeVisible();
  });

  test('login page has link to register', async ({ page }) => {
    await page.goto('/en/login');
    const registerLink = page.locator('a[href*="/register"]');
    await expect(registerLink).toBeVisible();
  });

  test('register page has link to login', async ({ page }) => {
    await page.goto('/en/register');
    const loginLink = page.locator('a[href*="/login"]');
    await expect(loginLink).toBeVisible();
  });

  test('login page has link to forgot password', async ({ page }) => {
    await page.goto('/en/login');
    const forgotLink = page.locator('a[href*="/forgot-password"]');
    await expect(forgotLink).toBeVisible();
  });
});
