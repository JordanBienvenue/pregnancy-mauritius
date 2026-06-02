import { test, expect } from "@playwright/test";
import { loginAs, TEST_USERS, TEST_PASSWORD } from "../helpers/auth";

// Mobile viewport — guard against horizontal scroll (page wider than screen).
test.use({ viewport: { width: 390, height: 844 } });

const PAGES = [
  "/en",
  "/en/directory",
  "/en/donate",
  "/en/emergency",
  "/en/food-guide",
  "/en/blog",
  "/en/rights",
  "/en/tracker",
  "/en/forum",
  "/en/forum/general",
  "/en/postpartum",
  "/en/profile",
];

test("no page has horizontal scroll on mobile", async ({ page }) => {
  test.slow();
  await loginAs(page, TEST_USERS.user, TEST_PASSWORD, "en");

  const offenders: string[] = [];
  for (const path of PAGES) {
    await page.goto(path);
    await page.waitForTimeout(800); // let client data/animations settle
    const { scrollW, clientW } = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
    }));
    if (scrollW > clientW + 1) {
      offenders.push(`${path} (scrollWidth ${scrollW} > ${clientW})`);
    }
  }

  expect(offenders, `Pages with horizontal scroll:\n${offenders.join("\n")}`).toEqual([]);
});
