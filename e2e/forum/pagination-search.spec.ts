import { test, expect, type APIRequestContext } from "@playwright/test";
import { openAs, TEST_USERS } from "../helpers/auth";

const SUPABASE_URL = "http://127.0.0.1:54421";
const SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU";
const ADMIN = "00000000-0000-0000-0000-0000000000a1";

async function bulkPosts(
  req: APIRequestContext,
  category: string,
  rows: { title: string; content: string }[]
) {
  const res = await req.post(`${SUPABASE_URL}/rest/v1/forum_posts`, {
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    data: rows.map((r) => ({
      user_id: ADMIN,
      category,
      title: r.title,
      content: r.content,
      is_anonymous: false,
    })),
  });
  expect(res.ok()).toBeTruthy();
}

test("category search matches post content (not just title)", async ({
  browser,
  request,
}) => {
  const u = Date.now();
  const token = `zucchini${u}`; // unique word that lives only in content
  await bulkPosts(request, "general", [
    { title: `Search subject ${u}`, content: `craving for ${token} tonight` },
    { title: `Other subject ${u}`, content: "unrelated content" },
  ]);

  const page = await openAs(browser, TEST_USERS.user);
  await page.goto("/en/forum/general");
  await page.getByPlaceholder(/search discussions/i).fill(token);

  // The content-matching post appears; the non-matching one does not.
  await expect(page.getByText(`Search subject ${u}`)).toBeVisible({
    timeout: 10_000,
  });
  await expect(page.getByText(`Other subject ${u}`)).toHaveCount(0);
  console.log("[result] content search works -> YES");

  await page.context().close();
});

test("category listing paginates with load-more", async ({
  browser,
  request,
}) => {
  test.setTimeout(120_000);
  const u = Date.now();
  // Seed > PAGE_SIZE (20) posts in postpartum (seed has only 1 there).
  await bulkPosts(
    request,
    "postpartum",
    Array.from({ length: 25 }, (_, i) => ({
      title: `Pager ${u}-${i}`,
      content: `pagination body ${i}`,
    }))
  );

  const page = await openAs(browser, TEST_USERS.user);
  await page.goto("/en/forum/postpartum");

  const cards = page.locator('a[href*="/forum/postpartum/"]');
  await expect(cards).toHaveCount(20); // first page = PAGE_SIZE
  await expect(page.getByTestId("load-more")).toBeVisible();

  await page.getByTestId("load-more").click();
  await expect
    .poll(async () => cards.count(), { timeout: 10_000 })
    .toBeGreaterThan(20);
  console.log("[result] load-more pagination works -> YES");

  await page.context().close();
});
