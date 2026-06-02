import { test, expect, type Page } from "@playwright/test";
import { openAs, TEST_USERS } from "../helpers/auth";

async function createPostAndOpen(page: Page, title: string, body: string) {
  await page.goto("/en/forum/general");
  await page.getByRole("button", { name: /new post/i }).click();
  await page.locator("#post-title").fill(title);
  await page.locator("#post-content").fill(body);
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /publish/i })
    .click();
  const link = page.getByText(title, { exact: true });
  await expect(link).toBeVisible({ timeout: 15_000 });
  await link.click();
  await page.waitForURL(/\/forum\/general\/[0-9a-f-]{36}/, { timeout: 15_000 });
  return page.url();
}

test("post author is notified live when someone replies", async ({
  browser,
}) => {
  test.setTimeout(120_000);
  const u = Date.now();
  const author = await openAs(browser, TEST_USERS.user);
  const replier = await openAs(browser, TEST_USERS.mama2);

  const title = `Notify ${u}`;
  const url = await createPostAndOpen(author, title, `Body ${u}`);

  // Replier opens the thread and replies.
  await replier.goto(url);
  await replier.getByPlaceholder(/write your reply/i).fill(`Ping ${u}`);
  await replier.getByRole("button", { name: /^reply$/i }).click();

  // Author's bell shows an unread badge live (no reload).
  await expect(author.getByTestId("notification-count")).toBeVisible({
    timeout: 10_000,
  });

  // Opening the bell reveals a notification referencing THIS post (proves the
  // live delivery — author never reloaded).
  await author.getByTestId("notification-bell").click();
  await expect(
    author.getByTestId("notification-panel").getByText(title)
  ).toBeVisible({ timeout: 5_000 });
  console.log("[result] reply notification delivered live -> YES");

  await author.context().close();
  await replier.context().close();
});

test("a user does not get notified for their own reply", async ({ browser }) => {
  test.setTimeout(120_000);
  const u = Date.now();
  const author = await openAs(browser, TEST_USERS.user);

  const title = `SelfReply ${u}`;
  await createPostAndOpen(author, title, `Body ${u}`);
  await author.getByPlaceholder(/write your reply/i).fill(`Own reply ${u}`);
  await author.getByRole("button", { name: /^reply$/i }).click();
  await expect(author.getByText(`Own reply ${u}`, { exact: true })).toBeVisible({
    timeout: 15_000,
  });
  await author.waitForTimeout(2000); // allow any (erroneous) notification to arrive

  // Self-reply must not create a notification for THIS post (scope to panel,
  // robust to pre-existing notifications from other tests).
  await author.getByTestId("notification-bell").click();
  await expect(
    author.getByTestId("notification-panel").getByText(title)
  ).toHaveCount(0);
  console.log("[result] no self-notification -> YES");

  await author.context().close();
});
