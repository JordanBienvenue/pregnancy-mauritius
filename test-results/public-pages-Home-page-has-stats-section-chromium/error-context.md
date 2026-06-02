# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-pages.spec.ts >> Home page >> has stats section
- Location: e2e/public-pages.spec.ts:21:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('50+')
Expected: visible
Error: strict mode violation: getByText('50+') resolved to 2 elements:
    1) <span data-slot="badge" data-variant="default" class="group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:po…>…</span> aka getByText('+ providers')
    2) <div class="text-3xl font-bold text-primary sm:text-4xl">50+</div> aka getByText('50+', { exact: true })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('50+')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Manman Moris" [ref=e5] [cursor=pointer]:
        - /url: /en
        - img [ref=e7]
        - generic [ref=e9]: Manman Moris
      - navigation [ref=e10]:
        - link "Tracker" [ref=e11] [cursor=pointer]:
          - /url: /en/tracker
          - text: Tracker
        - link "Directory" [ref=e12] [cursor=pointer]:
          - /url: /en/directory
          - text: Directory
        - link "Community" [ref=e13] [cursor=pointer]:
          - /url: /en/forum
          - text: Community
        - button "Resources" [ref=e15]:
          - text: Resources
          - img [ref=e16]
        - button "Services" [ref=e19]:
          - text: Services
          - img [ref=e20]
      - generic [ref=e22]:
        - combobox "Select language" [ref=e23]:
          - img
          - generic [ref=e24]: en
          - img: ▼
        - textbox [ref=e25]: en
        - generic [ref=e26]:
          - button "Log in" [ref=e27] [cursor=pointer]
          - button "Sign up" [ref=e28] [cursor=pointer]
  - main [ref=e29]:
    - generic [ref=e30]:
      - generic [ref=e36]:
        - generic [ref=e38]:
          - img
          - text: The first pregnancy platform for Mauritius
        - heading "Every Mauritian mum deserves support" [level=1] [ref=e39]
        - paragraph [ref=e40]: The first all-in-one pregnancy and postpartum platform built for Mauritius. In English, French, and Kreol Morisien.
        - generic [ref=e41]:
          - button "Start your journey" [ref=e42] [cursor=pointer]:
            - text: Start your journey
            - img
          - button "Explore the directory" [ref=e43] [cursor=pointer]:
            - img
            - text: Explore the directory
        - generic:
          - generic [ref=e45]:
            - img
            - text: Week-by-week tracker
          - generic [ref=e47]:
            - img
            - text: PPD support
          - generic [ref=e49]:
            - img
            - text: 50+ providers
      - generic [ref=e52]:
        - generic [ref=e53]:
          - generic [ref=e54]: 19,000+
          - generic [ref=e55]: births per year
        - generic [ref=e56]:
          - generic [ref=e57]: 50+
          - generic [ref=e58]: healthcare providers
        - generic [ref=e59]:
          - generic [ref=e60]: "3"
          - generic [ref=e61]: languages supported
        - generic [ref=e62]:
          - generic [ref=e63]: 100%
          - generic [ref=e64]: free to use
      - generic [ref=e66]:
        - heading "Happening on Manman Moris" [level=2] [ref=e67]
        - paragraph [ref=e68]: Real discussions, donations, and verified providers from our community.
        - link "Solo mothers initiative A dedicated, supportive space for mothers raising their little ones on their own." [ref=e69] [cursor=pointer]:
          - /url: /en/forum/solo-mothers
          - generic [ref=e71]:
            - img [ref=e73]
            - generic [ref=e75]:
              - heading "Solo mothers initiative" [level=3] [ref=e76]
              - paragraph [ref=e77]: A dedicated, supportive space for mothers raising their little ones on their own.
            - img [ref=e78]
        - generic [ref=e80]:
          - generic [ref=e82]:
            - generic [ref=e83]:
              - generic [ref=e84]:
                - img [ref=e85]
                - heading "Recent discussions" [level=3] [ref=e87]
              - link "See all" [ref=e88] [cursor=pointer]:
                - /url: /en/forum
            - list [ref=e89]:
              - listitem [ref=e90]: Nothing here yet — be the first.
          - generic [ref=e92]:
            - generic [ref=e93]:
              - generic [ref=e94]:
                - img [ref=e95]
                - heading "Available to give" [level=3] [ref=e97]
              - link "See all" [ref=e98] [cursor=pointer]:
                - /url: /en/donate
            - list [ref=e99]:
              - listitem [ref=e100]: Nothing here yet — be the first.
          - generic [ref=e102]:
            - generic [ref=e103]:
              - generic [ref=e104]:
                - img [ref=e105]
                - heading "Verified providers" [level=3] [ref=e109]
              - link "See all" [ref=e110] [cursor=pointer]:
                - /url: /en/directory
            - list [ref=e111]:
              - listitem [ref=e112]: Nothing here yet — be the first.
        - generic [ref=e113]:
          - link "Join the community" [ref=e114] [cursor=pointer]:
            - /url: /en/forum
            - button "Join the community" [ref=e115]:
              - img
              - text: Join the community
          - link "Emergency numbers" [ref=e116] [cursor=pointer]:
            - /url: /en/emergency
            - button "Emergency numbers" [ref=e117]
      - generic [ref=e120]:
        - generic [ref=e121]:
          - heading "Everything you need, in one place" [level=2] [ref=e122]
          - paragraph [ref=e123]: No more WhatsApp groups, Facebook guessing, or generic international apps. Real support, locally made.
        - generic [ref=e124]:
          - link "Pregnancy Tracker Week-by-week tracking with Mauritius-specific content, local fruit comparisons, and checkup reminders. Learn more" [ref=e126] [cursor=pointer]:
            - /url: /en/tracker
            - generic [ref=e128]:
              - img [ref=e130]
              - heading "Pregnancy Tracker" [level=3] [ref=e133]
              - paragraph [ref=e134]: Week-by-week tracking with Mauritius-specific content, local fruit comparisons, and checkup reminders.
              - generic [ref=e135]:
                - text: Learn more
                - img [ref=e136]
          - link "Healthcare Directory Find gynaecologists, clinics, and maternity wards near you across all districts. Learn more" [ref=e139] [cursor=pointer]:
            - /url: /en/directory
            - generic [ref=e141]:
              - img [ref=e143]
              - heading "Healthcare Directory" [level=3] [ref=e147]
              - paragraph [ref=e148]: Find gynaecologists, clinics, and maternity wards near you across all districts.
              - generic [ref=e149]:
                - text: Learn more
                - img [ref=e150]
          - link "Emergency Map Instantly find the nearest maternity ward with one tap. When every second counts. Learn more" [ref=e153] [cursor=pointer]:
            - /url: /en/emergency
            - generic [ref=e155]:
              - img [ref=e157]
              - heading "Emergency Map" [level=3] [ref=e159]
              - paragraph [ref=e160]: Instantly find the nearest maternity ward with one tap. When every second counts.
              - generic [ref=e161]:
                - text: Learn more
                - img [ref=e162]
          - link "Postpartum Support PPD mood check-ins, recovery timeline, breastfeeding support, and baby milestone tracker. Learn more" [ref=e165] [cursor=pointer]:
            - /url: /en/postpartum
            - generic [ref=e167]:
              - img [ref=e169]
              - heading "Postpartum Support" [level=3] [ref=e171]
              - paragraph [ref=e172]: PPD mood check-ins, recovery timeline, breastfeeding support, and baby milestone tracker.
              - generic [ref=e173]:
                - text: Learn more
                - img [ref=e174]
          - link "Community Forum A moderated, safe space for pregnancy questions. Including a solo mothers solidarity network. Learn more" [ref=e177] [cursor=pointer]:
            - /url: /en/forum
            - generic [ref=e179]:
              - img [ref=e181]
              - heading "Community Forum" [level=3] [ref=e186]
              - paragraph [ref=e187]: A moderated, safe space for pregnancy questions. Including a solo mothers solidarity network.
              - generic [ref=e188]:
                - text: Learn more
                - img [ref=e189]
          - link "Benevolat Hub Give and receive baby items. Connecting generous Mauritians with mothers in need. Learn more" [ref=e192] [cursor=pointer]:
            - /url: /en/donate
            - generic [ref=e194]:
              - img [ref=e196]
              - heading "Benevolat Hub" [level=3] [ref=e200]
              - paragraph [ref=e201]: Give and receive baby items. Connecting generous Mauritians with mothers in need.
              - generic [ref=e202]:
                - text: Learn more
                - img [ref=e203]
          - link "Food Guide Which Mauritian foods are safe during pregnancy? Dal puri, gato pima, dholl — we cover it all. Learn more" [ref=e206] [cursor=pointer]:
            - /url: /en/food-guide
            - generic [ref=e208]:
              - img [ref=e210]
              - heading "Food Guide" [level=3] [ref=e213]
              - paragraph [ref=e214]: Which Mauritian foods are safe during pregnancy? Dal puri, gato pima, dholl — we cover it all.
              - generic [ref=e215]:
                - text: Learn more
                - img [ref=e216]
          - link "Maternity Rights Know your rights under the Workers' Rights Act. 14 weeks paid leave, explained simply. Learn more" [ref=e219] [cursor=pointer]:
            - /url: /en/rights
            - generic [ref=e221]:
              - img [ref=e223]
              - heading "Maternity Rights" [level=3] [ref=e227]
              - paragraph [ref=e228]: Know your rights under the Workers' Rights Act. 14 weeks paid leave, explained simply.
              - generic [ref=e229]:
                - text: Learn more
                - img [ref=e230]
      - generic [ref=e234]:
        - paragraph [ref=e235]: Trusted by
        - generic [ref=e236]:
          - generic [ref=e237]: CityPharm
          - generic [ref=e238]: Apollo Bramwell
          - generic [ref=e239]: Babyland
          - generic [ref=e240]: Swan Insurance
      - generic [ref=e249]:
        - heading "Ready to start?" [level=2] [ref=e250]
        - paragraph [ref=e251]: Join thousands of Mauritian mums on their pregnancy journey.
        - button "Create your free account" [ref=e252] [cursor=pointer]:
          - text: Create your free account
          - img
  - contentinfo [ref=e253]:
    - generic [ref=e254]:
      - generic [ref=e255]:
        - generic [ref=e256]:
          - link "Manman Moris" [ref=e257] [cursor=pointer]:
            - /url: /en
            - img [ref=e259]
            - generic [ref=e261]: Manman Moris
          - paragraph [ref=e262]: The first all-in-one pregnancy platform for Mauritius.
        - generic [ref=e263]:
          - heading "Platform" [level=3] [ref=e264]
          - list [ref=e265]:
            - listitem [ref=e266]:
              - link "Tracker" [ref=e267] [cursor=pointer]:
                - /url: /en/tracker
            - listitem [ref=e268]:
              - link "Directory" [ref=e269] [cursor=pointer]:
                - /url: /en/directory
            - listitem [ref=e270]:
              - link "Emergency" [ref=e271] [cursor=pointer]:
                - /url: /en/emergency
            - listitem [ref=e272]:
              - link "Postpartum" [ref=e273] [cursor=pointer]:
                - /url: /en/postpartum
        - generic [ref=e274]:
          - heading "Community" [level=3] [ref=e275]
          - list [ref=e276]:
            - listitem [ref=e277]:
              - link "Community" [ref=e278] [cursor=pointer]:
                - /url: /en/forum
            - listitem [ref=e279]:
              - link "Benevolat" [ref=e280] [cursor=pointer]:
                - /url: /en/donate
            - listitem [ref=e281]:
              - link "Marketplace" [ref=e282] [cursor=pointer]:
                - /url: /en/marketplace
            - listitem [ref=e283]:
              - link "Blog" [ref=e284] [cursor=pointer]:
                - /url: /en/blog
        - generic [ref=e285]:
          - heading "Resources" [level=3] [ref=e286]
          - list [ref=e287]:
            - listitem [ref=e288]:
              - link "Food Guide" [ref=e289] [cursor=pointer]:
                - /url: /en/food-guide
            - listitem [ref=e290]:
              - link "Your Rights" [ref=e291] [cursor=pointer]:
                - /url: /en/rights
            - listitem [ref=e292]:
              - link "Contact" [ref=e293] [cursor=pointer]:
                - /url: /en/contact
      - generic [ref=e294]:
        - paragraph [ref=e295]: © 2026 Manman Moris. All rights reserved.
        - paragraph [ref=e296]:
          - text: Made with
          - img [ref=e297]
          - text: in Mauritius
  - button "Open Next.js Dev Tools" [ref=e304] [cursor=pointer]:
    - img [ref=e305]
  - alert [ref=e308]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Home page', () => {
  4  |   test('has hero section with CTA buttons', async ({ page }) => {
  5  |     await page.goto('/en');
  6  |     // Hero section exists with gradient heading
  7  |     await expect(page.locator('section').first()).toBeVisible();
  8  |     // CTA buttons should be present (register + directory)
  9  |     const buttons = page.locator('a[href*="/register"], a[href*="/directory"]');
  10 |     await expect(buttons.first()).toBeVisible();
  11 |   });
  12 | 
  13 |   test('has feature cards section', async ({ page }) => {
  14 |     await page.goto('/en');
  15 |     // Feature cards are rendered in a grid of Card components
  16 |     const cards = page.locator('[data-slot="card"]');
  17 |     // There should be feature cards (8 features defined in the page)
  18 |     await expect(cards.first()).toBeVisible();
  19 |   });
  20 | 
  21 |   test('has stats section', async ({ page }) => {
  22 |     await page.goto('/en');
  23 |     // Stats section contains specific numbers
  24 |     await expect(page.getByText('19,000+')).toBeVisible();
> 25 |     await expect(page.getByText('50+')).toBeVisible();
     |                                         ^ Error: expect(locator).toBeVisible() failed
  26 |     await expect(page.getByText('100%')).toBeVisible();
  27 |   });
  28 | 
  29 |   test('has sponsor section', async ({ page }) => {
  30 |     await page.goto('/en');
  31 |     // Sponsor names are displayed
  32 |     await expect(page.getByText('CityPharm')).toBeVisible();
  33 |     await expect(page.getByText('Apollo Bramwell')).toBeVisible();
  34 |   });
  35 | });
  36 | 
  37 | test.describe('Emergency page', () => {
  38 |   test('has hospital listings', async ({ page }) => {
  39 |     await page.goto('/en/emergency');
  40 |     // The emergency page contains hospital data
  41 |     await expect(page.getByText('Dr. A.G. Jeetoo Hospital')).toBeVisible();
  42 |     await expect(page.getByText('Victoria Hospital')).toBeVisible();
  43 |   });
  44 | 
  45 |   test('has emergency phone numbers', async ({ page }) => {
  46 |     await page.goto('/en/emergency');
  47 |     // Hospital phone numbers should be present
  48 |     await expect(page.getByText('+230 212 3201')).toBeVisible();
  49 |   });
  50 | });
  51 | 
  52 | test.describe('Food guide page', () => {
  53 |   test('has search input', async ({ page }) => {
  54 |     await page.goto('/en/food-guide');
  55 |     // The food guide page has a search/filter input
  56 |     const searchInput = page.locator('input[type="text"], input[type="search"]');
  57 |     await expect(searchInput.first()).toBeVisible();
  58 |   });
  59 | 
  60 |   test('has food items listed', async ({ page }) => {
  61 |     await page.goto('/en/food-guide');
  62 |     // Specific Mauritian foods should be visible
  63 |     await expect(page.getByText('Dal Puri')).toBeVisible();
  64 |     await expect(page.getByText('Roti / Farata')).toBeVisible();
  65 |   });
  66 | });
  67 | 
  68 | test.describe('Directory page', () => {
  69 |   test('has provider listings', async ({ page }) => {
  70 |     await page.goto('/en/directory');
  71 |     // Provider names should be visible
  72 |     await expect(page.getByText('Dr. Anisha Doorgakant')).toBeVisible();
  73 |     await expect(page.getByText('Marie-Claire Lamy')).toBeVisible();
  74 |   });
  75 | 
  76 |   test('has search functionality', async ({ page }) => {
  77 |     await page.goto('/en/directory');
  78 |     // Directory has a search input
  79 |     const searchInput = page.locator('input[type="text"], input[type="search"]');
  80 |     await expect(searchInput.first()).toBeVisible();
  81 |   });
  82 | });
  83 | 
```