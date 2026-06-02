import { test, expect } from "@playwright/test";
import { loginAs, TEST_USERS, TEST_PASSWORD } from "../helpers/auth";

// Mobile viewport — guard against horizontal scroll (page wider than screen).
test.use({ viewport: { width: 390, height: 844 } });

const ROUTES = [
  "",
  "/directory",
  "/donate",
  "/emergency",
  "/food-guide",
  "/blog",
  "/rights",
  "/tracker",
  "/forum",
  "/forum/general",
  "/postpartum",
  "/profile",
  "/marketplace",
];

// Check every locale — fr/cr labels are longer than en and are the DEFAULTS,
// so horizontal-overflow bugs surface there first (and only there).
const LOCALES = ["fr", "cr", "en"] as const;

test("no page has horizontal scroll on mobile (all locales)", async ({
  page,
}) => {
  test.slow();
  await loginAs(page, TEST_USERS.user, TEST_PASSWORD, "en");

  const offenders: string[] = [];
  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      const path = `/${locale}${route}`;
      await page.goto(path);
      await page.waitForTimeout(600); // let client data/animations settle
      const { scrollW, clientW } = await page.evaluate(() => ({
        scrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
      }));
      if (scrollW > clientW + 1) {
        offenders.push(`${path} (scrollWidth ${scrollW} > ${clientW})`);
      }
    }
  }

  expect(offenders, `Pages with horizontal scroll:\n${offenders.join("\n")}`).toEqual([]);
});

test("marketplace category tabs are not clipped on the left", async ({
  page,
}) => {
  await loginAs(page, TEST_USERS.user, TEST_PASSWORD, "en");
  await page.goto("/en/marketplace");
  await page.waitForTimeout(800);
  // A horizontally-scrollable tab strip must start at/after the left edge, not
  // be centred-and-clipped (which hides the first category).
  const box = await page.getByRole("tab").first().boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
});
