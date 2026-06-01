import { type Page } from "@playwright/test";

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
  await loginAs(page, "user@test.com", "test123456", locale);
}
