import { type Browser, type Page } from "@playwright/test";

export const TEST_PASSWORD = "test123456";

export const TEST_USERS = {
  admin: "admin@test.com",
  moderator: "mod@test.com",
  editor: "editor@test.com",
  user: "user@test.com",
  mama2: "mama2@test.com",
  solo: "solo@test.com",
} as const;

export async function loginAs(
  page: Page,
  email: string,
  password: string,
  locale = "en"
) {
  await page.goto(`/${locale}/login`);
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).first().fill(password);
  // Scope to the form submit button — the header also has a "Log in" link.
  await page
    .locator("#main-content")
    .getByRole("button", { name: /log in/i })
    .click();
  // Wait for redirect after login
  await page.waitForURL((url) => !url.pathname.includes("/login"), {
    timeout: 10000,
  });
}

export async function loginAsAdmin(page: Page, locale = "en") {
  await loginAs(page, "admin@test.com", "test123456", locale);
}

export async function loginAsUser(page: Page, locale = "en") {
  await loginAs(page, TEST_USERS.user, TEST_PASSWORD, locale);
}

export async function loginAsModerator(page: Page, locale = "en") {
  await loginAs(page, TEST_USERS.moderator, TEST_PASSWORD, locale);
}

export async function loginAsEditor(page: Page, locale = "en") {
  await loginAs(page, TEST_USERS.editor, TEST_PASSWORD, locale);
}

/**
 * Open a fresh, isolated browser context logged in as the given user, and
 * return its page. Use one per simulated user in multi-user realtime tests:
 *   const a = await openAs(browser, "user@test.com");
 *   const b = await openAs(browser, "mama2@test.com");
 * Remember to close `page.context()` when done.
 */
export async function openAs(
  browser: Browser,
  email: string,
  { password = TEST_PASSWORD, locale = "en" } = {}
): Promise<Page> {
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on("dialog", (d) => d.accept());
  await loginAs(page, email, password, locale);
  return page;
}
