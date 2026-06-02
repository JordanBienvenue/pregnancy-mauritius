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

async function postTopLevel(page: Page, text: string) {
  await page.getByPlaceholder(/write your reply/i).fill(text);
  await page.getByRole("button", { name: /^reply$/i }).click();
  await expect(page.getByText(text, { exact: true })).toBeVisible({
    timeout: 15_000,
  });
}

test("nested reply renders indented, live, and notifies the comment author", async ({
  browser,
}) => {
  test.setTimeout(120_000);
  const u = Date.now();
  const a = await openAs(browser, TEST_USERS.user); // post + comment author
  const b = await openAs(browser, TEST_USERS.mama2); // replies to the comment

  const url = await createPostAndOpen(a, `Nested ${u}`, `Body ${u}`);
  await postTopLevel(a, `Parent comment ${u}`);

  await b.goto(url);
  await expect(b.getByText(`Parent comment ${u}`, { exact: true })).toBeVisible({
    timeout: 15_000,
  });

  // B replies to A's comment (not the post) via the comment's Reply button.
  await b.getByTestId("reply-reply-button").click();
  await b.getByTestId("reply-input").fill(`Nested reply ${u}`);
  await b.getByTestId("reply-submit").click();

  // Two comments now exist; the nested one is rendered indented (border-l).
  await expect(b.getByTestId("comment-node")).toHaveCount(2);
  await expect(
    b.locator('[data-testid="comment-node"].border-l')
  ).toContainText(`Nested reply ${u}`);

  // A (post+comment author, never reloaded) sees the nested reply live...
  await expect(a.getByText(`Nested reply ${u}`, { exact: true })).toBeVisible({
    timeout: 10_000,
  });
  // ...and gets a notification (parent-comment author is notified).
  await expect(a.getByTestId("notification-count")).toBeVisible({
    timeout: 10_000,
  });
  console.log("[result] nested reply: indented + live + notified -> YES");

  await a.context().close();
  await b.context().close();
});
