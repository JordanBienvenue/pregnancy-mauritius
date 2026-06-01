import { test, expect } from "@playwright/test";
import { loginAs } from "../helpers/auth";

/**
 * Multi-user realtime test for the forum.
 *
 * Scenario:
 *   - User A (admin@test.com) opens a discussion (creates a post).
 *   - User A keeps the thread open.
 *   - User B (user@test.com) opens the same thread and posts a reply.
 *   - User A should see User B's reply WITHOUT reloading (Supabase realtime).
 *
 * The final assertion encodes the EXPECTED behaviour (live propagation).
 * It also verifies that the reply IS visible after a manual reload, which
 * proves the data layer works and isolates the failure to realtime push.
 */
test("forum: User A sees User B's reply live (Supabase realtime)", async ({
  browser,
}) => {
  test.setTimeout(120_000);

  const unique = Date.now();
  const postTitle = `Realtime discussion ${unique}`;
  const postBody = `Opening question from User A ${unique}`;
  const replyText = `Live reply from User B ${unique}`;

  // Two fully independent browser sessions = two real users.
  const ctxA = await browser.newContext();
  const ctxB = await browser.newContext();
  const pageA = await ctxA.newPage();
  const pageB = await ctxB.newPage();

  // The app uses window.alert()/confirm() in a few places (e.g. "Post created!").
  pageA.on("dialog", (d) => d.accept());
  pageB.on("dialog", (d) => d.accept());

  // --- Login both users ---
  await loginAs(pageA, "admin@test.com", "test123456", "en");
  await loginAs(pageB, "user@test.com", "test123456", "en");
  console.log("[step] both users logged in");

  // --- User A opens a discussion (creates a post in "general") ---
  await pageA.goto("/en/forum/general");
  await pageA.getByRole("button", { name: /new post/i }).click();
  await pageA.locator("#post-title").fill(postTitle);
  await pageA.locator("#post-content").fill(postBody);
  await pageA
    .getByRole("dialog")
    .getByRole("button", { name: /publish/i })
    .click();
  console.log("[step] User A created the post");

  // The new post appears at the top of the "newest" list. A clicks into it.
  const postLink = pageA.getByText(postTitle, { exact: true });
  await expect(postLink).toBeVisible({ timeout: 15_000 });
  await postLink.click();
  await pageA.waitForURL(/\/forum\/general\/[0-9a-f-]{36}/, { timeout: 15_000 });
  const threadUrl = pageA.url();
  console.log("[step] User A opened the thread:", threadUrl);

  // Sanity: A's own post content is on the thread page.
  await expect(pageA.getByText(postBody)).toBeVisible({ timeout: 15_000 });

  // --- User B opens the SAME thread and replies ---
  await pageB.goto(threadUrl);
  await expect(pageB.getByText(postBody)).toBeVisible({ timeout: 15_000 });
  await pageB.getByPlaceholder(/write your reply/i).fill(replyText);
  await pageB.getByRole("button", { name: /^reply$/i }).click();

  // B should see their own reply (their page re-fetches after submitting).
  await expect(pageB.getByText(replyText)).toBeVisible({ timeout: 15_000 });
  console.log("[step] User B posted a reply and sees it on their own page");

  // --- The real test: does A see B's reply WITHOUT reloading? ---
  let liveVisible = false;
  try {
    await expect(pageA.getByText(replyText)).toBeVisible({ timeout: 8_000 });
    liveVisible = true;
  } catch {
    liveVisible = false;
  }
  console.log(
    `[result] A saw B's reply live (no reload)? -> ${liveVisible ? "YES" : "NO"}`
  );

  // --- Prove the data persisted: after reload A must see it ---
  await pageA.reload();
  await expect(pageA.getByText(replyText)).toBeVisible({ timeout: 15_000 });
  console.log("[result] A sees B's reply AFTER reload? -> YES");

  await ctxA.close();
  await ctxB.close();

  // Expected behaviour: realtime should push B's reply to A's open page.
  expect(
    liveVisible,
    "Supabase realtime: User A should see User B's reply without reloading the page"
  ).toBe(true);
});
