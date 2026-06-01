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

async function postReply(page: Page, text: string) {
  await page.getByPlaceholder(/write your reply/i).fill(text);
  await page.getByRole("button", { name: /^reply$/i }).click();
  await expect(page.getByText(text, { exact: true })).toBeVisible({
    timeout: 15_000,
  });
}

test("reply like: persists and propagates live to other users", async ({
  browser,
}) => {
  test.setTimeout(120_000);
  const u = Date.now();
  const a = await openAs(browser, TEST_USERS.user); // post + reply author
  const b = await openAs(browser, TEST_USERS.mama2); // liker

  const url = await createPostAndOpen(a, `Reply-like ${u}`, `Body ${u}`);
  await postReply(a, `A reply ${u}`);

  await b.goto(url);
  await expect(b.getByText(`A reply ${u}`, { exact: true })).toBeVisible({
    timeout: 15_000,
  });

  await expect(b.getByTestId("reply-like-count")).toHaveText("0");
  await b.getByTestId("reply-like-button").click();
  await expect(b.getByTestId("reply-like-count")).toHaveText("1");
  await expect(b.getByTestId("reply-like-button")).toHaveAttribute(
    "aria-pressed",
    "true"
  );

  // A (open, never reloaded) sees the count rise live.
  await expect(a.getByTestId("reply-like-count")).toHaveText("1", {
    timeout: 10_000,
  });

  // Persists for B across reload (liked-set refetched).
  await b.reload();
  await expect(b.getByTestId("reply-like-count")).toHaveText("1");
  await expect(b.getByTestId("reply-like-button")).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  console.log("[result] reply like live + persisted -> YES");

  await a.context().close();
  await b.context().close();
});

test("author can edit own post; edit shows live to others", async ({
  browser,
}) => {
  test.setTimeout(120_000);
  const u = Date.now();
  const a = await openAs(browser, TEST_USERS.user);
  const b = await openAs(browser, TEST_USERS.mama2);

  const url = await createPostAndOpen(a, `Editable ${u}`, `Original ${u}`);
  await b.goto(url);
  await expect(b.getByText(`Original ${u}`)).toBeVisible({ timeout: 15_000 });

  // Non-author B must NOT see edit/delete affordances.
  await expect(b.getByTestId("post-edit-button")).toHaveCount(0);
  await expect(b.getByTestId("post-delete-button")).toHaveCount(0);

  // A edits the post.
  await a.getByTestId("post-edit-button").click();
  await a.getByLabel("Content", { exact: true }).fill(`Edited body ${u}`);
  await a.getByRole("button", { name: /^save$/i }).click();
  await expect(a.getByText(`Edited body ${u}`)).toBeVisible({ timeout: 10_000 });

  // B sees the edited content live + the "edited" marker.
  await expect(b.getByText(`Edited body ${u}`)).toBeVisible({ timeout: 10_000 });
  await expect(b.getByText(/edited/i).first()).toBeVisible();
  console.log("[result] post edit live -> YES");

  await a.context().close();
  await b.context().close();
});

test("author can delete own reply; it disappears live for others", async ({
  browser,
}) => {
  test.setTimeout(120_000);
  const u = Date.now();
  const a = await openAs(browser, TEST_USERS.user);
  const b = await openAs(browser, TEST_USERS.mama2);

  const url = await createPostAndOpen(a, `Del-reply ${u}`, `Body ${u}`);
  await postReply(a, `Doomed reply ${u}`);

  await b.goto(url);
  await expect(b.getByText(`Doomed reply ${u}`, { exact: true })).toBeVisible({
    timeout: 15_000,
  });

  // A deletes their reply (confirm auto-accepted by openAs dialog handler).
  await a.getByTestId("reply-delete-button").click();
  await expect(a.getByText(`Doomed reply ${u}`, { exact: true })).toHaveCount(0, {
    timeout: 10_000,
  });

  // B sees it removed live.
  await expect(b.getByText(`Doomed reply ${u}`, { exact: true })).toHaveCount(
    0,
    { timeout: 10_000 }
  );
  console.log("[result] reply delete live -> YES");

  await a.context().close();
  await b.context().close();
});
