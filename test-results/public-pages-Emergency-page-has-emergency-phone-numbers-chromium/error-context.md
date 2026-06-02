# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-pages.spec.ts >> Emergency page >> has emergency phone numbers
- Location: e2e/public-pages.spec.ts:45:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('+230 212 3201')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('+230 212 3201')

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
        - generic [ref=e37]:
          - img [ref=e39]
          - heading "Emergency Maternity Map" [level=1] [ref=e44]
          - paragraph [ref=e45]: Find the nearest maternity ward now
        - link "Call Ambulance (114)" [ref=e48] [cursor=pointer]:
          - /url: tel:114
          - img [ref=e50]
          - generic [ref=e52]: Call Ambulance (114)
        - generic [ref=e53]:
          - 'link "Police: 999" [ref=e54] [cursor=pointer]':
            - /url: tel:999
            - img [ref=e55]
            - text: "Police: 999"
          - 'link "Fire Brigade: 115" [ref=e57] [cursor=pointer]':
            - /url: tel:115
            - img [ref=e58]
            - text: "Fire Brigade: 115"
          - 'link "Befrienders Mauritius (9am-9pm): 800 93 93" [ref=e60] [cursor=pointer]':
            - /url: tel:8009393
            - img [ref=e61]
            - text: "Befrienders Mauritius (9am-9pm): 800 93 93"
      - generic [ref=e65]:
        - img [ref=e66]
        - paragraph [ref=e68]: In case of emergency, always call 114 (SAMU) first.
      - generic [ref=e69]:
        - generic [ref=e71]:
          - img [ref=e73]
          - generic [ref=e77]:
            - heading "Maternity Hospitals & Clinics" [level=2] [ref=e78]
            - paragraph [ref=e79]: 8 facilities across Mauritius
        - generic [ref=e80]:
          - button "Dr. A.G. Jeetoo Hospital Public Port Louis ~3.2 km 24/7 Emergency" [ref=e85]:
            - img [ref=e87]
            - generic [ref=e91]:
              - generic [ref=e92]:
                - heading "Dr. A.G. Jeetoo Hospital" [level=3] [ref=e93]
                - generic [ref=e94]: Public
              - generic [ref=e95]:
                - generic [ref=e96]:
                  - img [ref=e97]
                  - text: Port Louis
                - generic [ref=e100]:
                  - img [ref=e101]
                  - text: ~3.2 km
                - generic [ref=e103]:
                  - img [ref=e104]
                  - text: 24/7 Emergency
            - img [ref=e108]
          - button "Victoria Hospital Public Candos ~5.8 km 24/7 Emergency" [ref=e114]:
            - img [ref=e116]
            - generic [ref=e120]:
              - generic [ref=e121]:
                - heading "Victoria Hospital" [level=3] [ref=e122]
                - generic [ref=e123]: Public
              - generic [ref=e124]:
                - generic [ref=e125]:
                  - img [ref=e126]
                  - text: Candos
                - generic [ref=e129]:
                  - img [ref=e130]
                  - text: ~5.8 km
                - generic [ref=e132]:
                  - img [ref=e133]
                  - text: 24/7 Emergency
            - img [ref=e137]
          - button "SSRN Hospital Public Pamplemousses ~12.4 km 24/7 Emergency" [ref=e143]:
            - img [ref=e145]
            - generic [ref=e149]:
              - generic [ref=e150]:
                - heading "SSRN Hospital" [level=3] [ref=e151]
                - generic [ref=e152]: Public
              - generic [ref=e153]:
                - generic [ref=e154]:
                  - img [ref=e155]
                  - text: Pamplemousses
                - generic [ref=e158]:
                  - img [ref=e159]
                  - text: ~12.4 km
                - generic [ref=e161]:
                  - img [ref=e162]
                  - text: 24/7 Emergency
            - img [ref=e166]
          - button "Jawaharlal Nehru Hospital Public Rose Belle ~18.1 km 24/7 Emergency" [ref=e172]:
            - img [ref=e174]
            - generic [ref=e178]:
              - generic [ref=e179]:
                - heading "Jawaharlal Nehru Hospital" [level=3] [ref=e180]
                - generic [ref=e181]: Public
              - generic [ref=e182]:
                - generic [ref=e183]:
                  - img [ref=e184]
                  - text: Rose Belle
                - generic [ref=e187]:
                  - img [ref=e188]
                  - text: ~18.1 km
                - generic [ref=e190]:
                  - img [ref=e191]
                  - text: 24/7 Emergency
            - img [ref=e195]
          - button "Flacq Hospital Public Flacq ~22.6 km 24/7 Emergency" [ref=e201]:
            - img [ref=e203]
            - generic [ref=e207]:
              - generic [ref=e208]:
                - heading "Flacq Hospital" [level=3] [ref=e209]
                - generic [ref=e210]: Public
              - generic [ref=e211]:
                - generic [ref=e212]:
                  - img [ref=e213]
                  - text: Flacq
                - generic [ref=e216]:
                  - img [ref=e217]
                  - text: ~22.6 km
                - generic [ref=e219]:
                  - img [ref=e220]
                  - text: 24/7 Emergency
            - img [ref=e224]
          - button "C-Care Clinic (Darne) Private Floreal ~7.3 km 24/7 Emergency" [ref=e230]:
            - img [ref=e232]
            - generic [ref=e236]:
              - generic [ref=e237]:
                - heading "C-Care Clinic (Darne)" [level=3] [ref=e238]
                - generic [ref=e239]: Private
              - generic [ref=e240]:
                - generic [ref=e241]:
                  - img [ref=e242]
                  - text: Floreal
                - generic [ref=e245]:
                  - img [ref=e246]
                  - text: ~7.3 km
                - generic [ref=e248]:
                  - img [ref=e249]
                  - text: 24/7 Emergency
            - img [ref=e253]
          - button "C-Care Wellkin Hospital Private Moka ~9.5 km 24/7 Emergency" [ref=e259]:
            - img [ref=e261]
            - generic [ref=e265]:
              - generic [ref=e266]:
                - heading "C-Care Wellkin Hospital" [level=3] [ref=e267]
                - generic [ref=e268]: Private
              - generic [ref=e269]:
                - generic [ref=e270]:
                  - img [ref=e271]
                  - text: Moka
                - generic [ref=e274]:
                  - img [ref=e275]
                  - text: ~9.5 km
                - generic [ref=e277]:
                  - img [ref=e278]
                  - text: 24/7 Emergency
            - img [ref=e282]
          - button "Wellkin Hospital Private Moka ~10.1 km 24/7 Emergency" [ref=e288]:
            - img [ref=e290]
            - generic [ref=e294]:
              - generic [ref=e295]:
                - heading "Wellkin Hospital" [level=3] [ref=e296]
                - generic [ref=e297]: Private
              - generic [ref=e298]:
                - generic [ref=e299]:
                  - img [ref=e300]
                  - text: Moka
                - generic [ref=e303]:
                  - img [ref=e304]
                  - text: ~10.1 km
                - generic [ref=e306]:
                  - img [ref=e307]
                  - text: 24/7 Emergency
            - img [ref=e311]
        - generic [ref=e314]:
          - img [ref=e315]
          - paragraph [ref=e317]: In case of emergency, always call 114 (SAMU) first.
          - paragraph [ref=e318]: Distance values are approximate placeholders. Enable location services for accurate distances.
          - link "Call Ambulance (114)" [ref=e320] [cursor=pointer]:
            - /url: tel:114
            - img [ref=e321]
            - text: Call Ambulance (114)
  - contentinfo [ref=e323]:
    - generic [ref=e324]:
      - generic [ref=e325]:
        - generic [ref=e326]:
          - link "Manman Moris" [ref=e327] [cursor=pointer]:
            - /url: /en
            - img [ref=e329]
            - generic [ref=e331]: Manman Moris
          - paragraph [ref=e332]: The first all-in-one pregnancy platform for Mauritius.
        - generic [ref=e333]:
          - heading "Platform" [level=3] [ref=e334]
          - list [ref=e335]:
            - listitem [ref=e336]:
              - link "Tracker" [ref=e337] [cursor=pointer]:
                - /url: /en/tracker
            - listitem [ref=e338]:
              - link "Directory" [ref=e339] [cursor=pointer]:
                - /url: /en/directory
            - listitem [ref=e340]:
              - link "Emergency" [ref=e341] [cursor=pointer]:
                - /url: /en/emergency
            - listitem [ref=e342]:
              - link "Postpartum" [ref=e343] [cursor=pointer]:
                - /url: /en/postpartum
        - generic [ref=e344]:
          - heading "Community" [level=3] [ref=e345]
          - list [ref=e346]:
            - listitem [ref=e347]:
              - link "Community" [ref=e348] [cursor=pointer]:
                - /url: /en/forum
            - listitem [ref=e349]:
              - link "Benevolat" [ref=e350] [cursor=pointer]:
                - /url: /en/donate
            - listitem [ref=e351]:
              - link "Marketplace" [ref=e352] [cursor=pointer]:
                - /url: /en/marketplace
            - listitem [ref=e353]:
              - link "Blog" [ref=e354] [cursor=pointer]:
                - /url: /en/blog
        - generic [ref=e355]:
          - heading "Resources" [level=3] [ref=e356]
          - list [ref=e357]:
            - listitem [ref=e358]:
              - link "Food Guide" [ref=e359] [cursor=pointer]:
                - /url: /en/food-guide
            - listitem [ref=e360]:
              - link "Your Rights" [ref=e361] [cursor=pointer]:
                - /url: /en/rights
            - listitem [ref=e362]:
              - link "Contact" [ref=e363] [cursor=pointer]:
                - /url: /en/contact
      - generic [ref=e364]:
        - paragraph [ref=e365]: © 2026 Manman Moris. All rights reserved.
        - paragraph [ref=e366]:
          - text: Made with
          - img [ref=e367]
          - text: in Mauritius
  - button "Open Next.js Dev Tools" [ref=e374] [cursor=pointer]:
    - img [ref=e375]
  - alert [ref=e378]
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
  25 |     await expect(page.getByText('50+')).toBeVisible();
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
> 48 |     await expect(page.getByText('+230 212 3201')).toBeVisible();
     |                                                   ^ Error: expect(locator).toBeVisible() failed
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