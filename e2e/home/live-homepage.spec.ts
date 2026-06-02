import { test, expect, type APIRequestContext } from "@playwright/test";

const SUPABASE_URL = "http://127.0.0.1:54421";
const SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU";
const ADMIN = "00000000-0000-0000-0000-0000000000a1";

async function createPost(req: APIRequestContext, title: string) {
  const res = await req.post(`${SUPABASE_URL}/rest/v1/forum_posts`, {
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    data: {
      user_id: ADMIN,
      category: "general",
      title,
      content: "homepage live test",
      is_anonymous: false,
    },
  });
  expect(res.ok()).toBeTruthy();
}

test("homepage surfaces live community activity", async ({ page }) => {
  await page.goto("/en");

  // The live section renders (recent discussions list present).
  await expect(page.getByTestId("home-recent-discussions")).toBeVisible({
    timeout: 15_000,
  });
  // Solo-mother initiative + CTAs reflect platform usage.
  await expect(
    page.getByRole("heading", { name: /solo mothers initiative/i })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Verified providers" })
  ).toBeVisible();
});

test("a new discussion appears on the homepage live", async ({
  page,
  request,
}) => {
  const title = `Homepage live ${Date.now()}`;
  await page.goto("/en");
  await expect(page.getByTestId("home-recent-discussions")).toBeVisible({
    timeout: 15_000,
  });

  // Someone posts a new discussion elsewhere...
  await createPost(request, title);

  // ...and it shows up on the homepage without a reload (realtime).
  await expect(
    page.getByTestId("home-recent-discussions").getByText(title)
  ).toBeVisible({ timeout: 10_000 });
  console.log("[result] new discussion live on homepage -> YES");
});
