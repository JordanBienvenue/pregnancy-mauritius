import { test, expect } from "@playwright/test";

test("donate page loads donations without errors and renders photos", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));

  await page.goto("/en/donate");

  // Seeded donations render (proves the fetch + PostgREST embed work).
  await expect(page.getByText("Baby stroller").first()).toBeVisible({
    timeout: 15_000,
  });

  // The item's photo is shown (not just the placeholder icon).
  await expect(
    page.locator('img[src="/donations/stroller.svg"]').first()
  ).toBeVisible();

  // No "Error fetching donations" (PGRST201 ambiguous-embed) console error.
  const fetchErrors = errors.filter((e) => /fetching donations|PGRST201/i.test(e));
  expect(fetchErrors, fetchErrors.join("\n")).toEqual([]);
  console.log("[result] donate page clean + photo renders -> YES");
});
