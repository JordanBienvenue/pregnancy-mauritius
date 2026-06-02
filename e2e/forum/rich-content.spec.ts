import { test, expect, type Page } from "@playwright/test";
import { openAs, TEST_USERS } from "../helpers/auth";

// 1x1 transparent PNG.
const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "base64"
);

async function openNewPostDialog(page: Page) {
  await page.goto("/en/forum/general");
  await page.getByRole("button", { name: /new post/i }).click();
}

test("post content renders Markdown", async ({ browser }) => {
  const u = Date.now();
  const page = await openAs(browser, TEST_USERS.user);

  await openNewPostDialog(page);
  await page.locator("#post-title").fill(`Markdown ${u}`);
  await page.locator("#post-content").fill(`This is **bolded${u}** text`);
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /publish/i })
    .click();

  const link = page.getByText(`Markdown ${u}`, { exact: true });
  await expect(link).toBeVisible({ timeout: 15_000 });
  await link.click();
  await page.waitForURL(/\/forum\/general\/[0-9a-f-]{36}/, { timeout: 15_000 });

  // The **bold** markdown is rendered as a <strong>, not literal asterisks.
  await expect(
    page.locator("strong", { hasText: `bolded${u}` })
  ).toBeVisible({ timeout: 10_000 });
  console.log("[result] markdown renders -> YES");

  await page.context().close();
});

test("image upload renders in the thread for all users", async ({
  browser,
}) => {
  test.setTimeout(120_000);
  const u = Date.now();
  const a = await openAs(browser, TEST_USERS.user);
  const b = await openAs(browser, TEST_USERS.mama2);

  await openNewPostDialog(a);
  await a.locator("#post-title").fill(`Image post ${u}`);
  await a.locator("#post-content").fill(`Photo ${u}`);
  await a
    .getByTestId("forum-image-input")
    .setInputFiles({ name: "pic.png", mimeType: "image/png", buffer: PNG });

  // Upload completes → markdown image URL appended to the content.
  await expect(a.locator("#post-content")).toHaveValue(/forum-media/, {
    timeout: 15_000,
  });
  await a
    .getByRole("dialog")
    .getByRole("button", { name: /publish/i })
    .click();

  const link = a.getByText(`Image post ${u}`, { exact: true });
  await expect(link).toBeVisible({ timeout: 15_000 });
  await link.click();
  await a.waitForURL(/\/forum\/general\/[0-9a-f-]{36}/, { timeout: 15_000 });
  const url = a.url();

  // Image renders for the author...
  await expect(a.locator('img[src*="forum-media"]')).toBeVisible({
    timeout: 10_000,
  });
  // ...and for another user opening the same thread.
  await b.goto(url);
  await expect(b.locator('img[src*="forum-media"]')).toBeVisible({
    timeout: 10_000,
  });
  console.log("[result] uploaded image renders for both users -> YES");

  await a.context().close();
  await b.context().close();
});
