import { test, expect, type Page } from "@playwright/test";
import { loginAs } from "../helpers/auth";

// Create a post as the logged-in user on pageA and return its thread URL.
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

test("forum: like button persists and propagates live", async ({ browser }) => {
  test.setTimeout(120_000);
  const unique = Date.now();

  const ctxA = await browser.newContext();
  const ctxB = await browser.newContext();
  const pageA = await ctxA.newPage();
  const pageB = await ctxB.newPage();
  pageA.on("dialog", (d) => d.accept());
  pageB.on("dialog", (d) => d.accept());

  await loginAs(pageA, "admin@test.com", "test123456", "en");
  await loginAs(pageB, "user@test.com", "test123456", "en");

  const threadUrl = await createPostAndOpen(
    pageA,
    `Like test ${unique}`,
    `Body ${unique}`
  );
  await pageB.goto(threadUrl);

  const countA = pageA.getByTestId("post-like-count");
  const countB = pageB.getByTestId("post-like-count");
  await expect(countA).toHaveText("0");
  await expect(countB).toHaveText("0");

  // User A likes the post.
  await pageA.getByTestId("post-like-button").click();
  await expect(countA).toHaveText("1"); // optimistic on A

  // Persistence: reload A — the like_count must survive (DB trigger maintains it).
  await pageA.reload();
  await expect(pageA.getByTestId("post-like-count")).toHaveText("1");
  await expect(pageA.getByTestId("post-like-button")).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  console.log("[result] like persisted after reload -> YES");

  // Realtime: User B (never reloaded) sees the count rise to 1.
  await expect(countB).toHaveText("1", { timeout: 10_000 });
  console.log("[result] like propagated live to User B -> YES");

  await ctxA.close();
  await ctxB.close();
});

test("forum: new discussion appears live in the listing", async ({
  browser,
}) => {
  test.setTimeout(120_000);
  const unique = Date.now();
  const newTitle = `Live listing post ${unique}`;

  const ctxA = await browser.newContext();
  const ctxB = await browser.newContext();
  const pageA = await ctxA.newPage();
  const pageB = await ctxB.newPage();
  pageA.on("dialog", (d) => d.accept());
  pageB.on("dialog", (d) => d.accept());

  await loginAs(pageA, "user@test.com", "test123456", "en");
  await loginAs(pageB, "admin@test.com", "test123456", "en");

  // User A is viewing the General category listing.
  await pageA.goto("/en/forum/general");
  await expect(
    pageA.getByRole("button", { name: /new post/i })
  ).toBeVisible({ timeout: 15_000 });
  await expect(pageA.getByText(newTitle, { exact: true })).toHaveCount(0);

  // User B creates a new discussion in the same category.
  await createPostAndOpen(pageB, newTitle, `Body ${unique}`);

  // User A's listing should show it WITHOUT reloading.
  await expect(pageA.getByText(newTitle, { exact: true })).toBeVisible({
    timeout: 10_000,
  });
  console.log("[result] new discussion appeared live in listing -> YES");

  await ctxA.close();
  await ctxB.close();
});
