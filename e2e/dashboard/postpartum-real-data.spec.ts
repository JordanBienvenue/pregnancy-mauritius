import { test, expect, type APIRequestContext } from "@playwright/test";
import { loginAs, TEST_USERS, TEST_PASSWORD } from "../helpers/auth";

const SUPABASE_URL = "http://127.0.0.1:54421";
const SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU";
const MAMA2 = "00000000-0000-0000-0000-0000000000e5";

const svc = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
};

async function seedPostpartum(req: APIRequestContext) {
  const dob = new Date(Date.now() - 100 * 86400000) // ~3.3 months old
    .toISOString()
    .slice(0, 10);
  await req.fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${MAMA2}`, {
    method: "PATCH",
    headers: { ...svc, Prefer: "return=minimal" },
    data: { baby_dob: dob, is_postpartum: true },
  });
  await req.post(`${SUPABASE_URL}/rest/v1/ppd_checkins`, {
    headers: { ...svc, Prefer: "return=minimal" },
    data: { user_id: MAMA2, score: 5, answers: {}, flagged: false },
  });
}

test("postpartum dashboard shows real PPD score, baby age, and next vaccine", async ({
  page,
  request,
}) => {
  await seedPostpartum(request);
  await loginAs(page, TEST_USERS.mama2, TEST_PASSWORD, "en");
  await page.goto("/en/postpartum");

  // PPD score from the seeded check-in (5 → Normal), not the old hardcoded 6.
  const ppd = page.getByTestId("ppd-summary");
  await expect(ppd).toContainText("5", { timeout: 15_000 });
  await expect(ppd).toContainText(/normal/i);

  // Baby age computed from baby_dob (~3 months).
  await expect(page.getByTestId("baby-age-summary")).toContainText("3");

  // Next vaccine derived from the schedule (first milestone after ~3.3m).
  await expect(page.getByTestId("vaccine-summary")).toContainText(/penta-3/i);
  console.log("[result] postpartum real data -> YES");
});
