import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('has hero section with CTA buttons', async ({ page }) => {
    await page.goto('/en');
    // Hero section exists with gradient heading
    await expect(page.locator('section').first()).toBeVisible();
    // CTA buttons should be present (register + directory)
    const buttons = page.locator('a[href*="/register"], a[href*="/directory"]');
    await expect(buttons.first()).toBeVisible();
  });

  test('has feature cards section', async ({ page }) => {
    await page.goto('/en');
    // Feature cards are rendered in a grid of Card components
    const cards = page.locator('[data-slot="card"]');
    // There should be feature cards (8 features defined in the page)
    await expect(cards.first()).toBeVisible();
  });

  test('has stats section', async ({ page }) => {
    await page.goto('/en');
    // Stats section contains specific numbers ("50+" also appears in the hero
    // badge, so scope to the first match).
    await expect(page.getByText('19,000+').first()).toBeVisible();
    await expect(page.getByText('50+').first()).toBeVisible();
    await expect(page.getByText('100%').first()).toBeVisible();
  });

  test('has sponsor section', async ({ page }) => {
    await page.goto('/en');
    // Sponsor names are displayed
    await expect(page.getByText('CityPharm')).toBeVisible();
    await expect(page.getByText('Apollo Bramwell')).toBeVisible();
  });
});

test.describe('Emergency page', () => {
  test('has hospital listings', async ({ page }) => {
    await page.goto('/en/emergency');
    // The emergency page contains hospital data
    await expect(page.getByText('Dr. A.G. Jeetoo Hospital')).toBeVisible();
    await expect(page.getByText('Victoria Hospital')).toBeVisible();
  });

  test('has emergency phone numbers', async ({ page }) => {
    await page.goto('/en/emergency');
    // National emergency hotlines are shown by default (hospital landlines are
    // inside expandable cards).
    await expect(page.getByText('999').first()).toBeVisible();
    await expect(page.getByText('115').first()).toBeVisible();
  });
});

test.describe('Food guide page', () => {
  test('has search input', async ({ page }) => {
    await page.goto('/en/food-guide');
    // The food guide page has a search/filter input
    const searchInput = page.locator('input[type="text"], input[type="search"]');
    await expect(searchInput.first()).toBeVisible();
  });

  test('has food items listed', async ({ page }) => {
    await page.goto('/en/food-guide');
    // Specific Mauritian foods should be visible
    await expect(page.getByText('Dal Puri')).toBeVisible();
    await expect(page.getByText('Roti / Farata')).toBeVisible();
  });
});

test.describe('Directory page', () => {
  test('has provider listings', async ({ page }) => {
    await page.goto('/en/directory');
    // Provider names should be visible
    await expect(page.getByText('Dr. Zeenat Aumeerally')).toBeVisible();
    await expect(page.getByText('Dr. Guy Gnany')).toBeVisible();
  });

  test('has search functionality', async ({ page }) => {
    await page.goto('/en/directory');
    // Directory has a search input
    const searchInput = page.locator('input[type="text"], input[type="search"]');
    await expect(searchInput.first()).toBeVisible();
  });
});
