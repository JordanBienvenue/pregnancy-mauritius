# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-pages.spec.ts >> Directory page >> has provider listings
- Location: e2e/public-pages.spec.ts:69:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Dr. Anisha Doorgakant')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Dr. Anisha Doorgakant')

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
      - generic [ref=e35]:
        - generic [ref=e36]:
          - generic [ref=e37]:
            - img
            - text: 8+ all types
          - heading "Healthcare Directory" [level=1] [ref=e38]
          - paragraph [ref=e39]: Find trusted healthcare providers across Mauritius
        - generic [ref=e41]:
          - generic [ref=e42]:
            - img [ref=e43]
            - textbox "Search by name, type, or district..." [ref=e46]
          - generic [ref=e47]:
            - combobox [ref=e48]:
              - img
              - generic [ref=e49]: all
              - img: ▼
            - textbox [ref=e50]: all
            - combobox [ref=e51]:
              - img
              - generic [ref=e52]: all
              - img: ▼
            - textbox [ref=e53]: all
      - generic [ref=e56]:
        - generic [ref=e58]:
          - link "Dr. Zeenat Aumeerally Gynaecologist Verified Gynaecologist and obstetrician. Registered with the Medical Council of Mauritius. Practises at Clinic du Bon Pasteur. Rose Hill +230 467 8053 0 (0) View profile" [ref=e60] [cursor=pointer]:
            - /url: /en/directory/dr-zeenat-aumeerally
            - generic [ref=e63]:
              - generic [ref=e64]:
                - generic [ref=e65]:
                  - img [ref=e67]
                  - generic [ref=e71]:
                    - heading "Dr. Zeenat Aumeerally" [level=3] [ref=e72]
                    - paragraph [ref=e73]: Gynaecologist
                - generic [ref=e74]:
                  - img
                  - text: Verified
              - paragraph [ref=e75]: Gynaecologist and obstetrician. Registered with the Medical Council of Mauritius. Practises at Clinic du Bon Pasteur.
              - generic [ref=e76]:
                - generic [ref=e77]:
                  - img [ref=e78]
                  - text: Rose Hill
                - generic [ref=e81]:
                  - img [ref=e82]
                  - text: +230 467 8053
              - generic [ref=e84]:
                - generic [ref=e85]:
                  - img [ref=e86]
                  - img [ref=e88]
                  - img [ref=e90]
                  - img [ref=e92]
                  - img [ref=e94]
                  - generic [ref=e96]: "0"
                  - generic [ref=e97]: (0)
                - generic [ref=e98]:
                  - text: View profile
                  - img [ref=e99]
          - link "Dr. Haroon Beebeejaun Gynaecologist Verified Consultant obstetrician and gynaecologist. Listed on the UK Government verified medical practitioners directory for Mauritius. Beau Bassin +230 467 6400 0 (0) View profile" [ref=e102] [cursor=pointer]:
            - /url: /en/directory/dr-haroon-beebeejaun
            - generic [ref=e105]:
              - generic [ref=e106]:
                - generic [ref=e107]:
                  - img [ref=e109]
                  - generic [ref=e113]:
                    - heading "Dr. Haroon Beebeejaun" [level=3] [ref=e114]
                    - paragraph [ref=e115]: Gynaecologist
                - generic [ref=e116]:
                  - img
                  - text: Verified
              - paragraph [ref=e117]: Consultant obstetrician and gynaecologist. Listed on the UK Government verified medical practitioners directory for Mauritius.
              - generic [ref=e118]:
                - generic [ref=e119]:
                  - img [ref=e120]
                  - text: Beau Bassin
                - generic [ref=e123]:
                  - img [ref=e124]
                  - text: +230 467 6400
              - generic [ref=e126]:
                - generic [ref=e127]:
                  - img [ref=e128]
                  - img [ref=e130]
                  - img [ref=e132]
                  - img [ref=e134]
                  - img [ref=e136]
                  - generic [ref=e138]: "0"
                  - generic [ref=e139]: (0)
                - generic [ref=e140]:
                  - text: View profile
                  - img [ref=e141]
          - link "Dr. Guy Gnany Gynaecologist Verified Gynaecologist and obstetrician practising in Floreal. Verified by UK Government and Medical Council of Mauritius. Floreal +230 697 1221 0 (0) View profile" [ref=e144] [cursor=pointer]:
            - /url: /en/directory/dr-guy-gnany
            - generic [ref=e147]:
              - generic [ref=e148]:
                - generic [ref=e149]:
                  - img [ref=e151]
                  - generic [ref=e155]:
                    - heading "Dr. Guy Gnany" [level=3] [ref=e156]
                    - paragraph [ref=e157]: Gynaecologist
                - generic [ref=e158]:
                  - img
                  - text: Verified
              - paragraph [ref=e159]: Gynaecologist and obstetrician practising in Floreal. Verified by UK Government and Medical Council of Mauritius.
              - generic [ref=e160]:
                - generic [ref=e161]:
                  - img [ref=e162]
                  - text: Floreal
                - generic [ref=e165]:
                  - img [ref=e166]
                  - text: +230 697 1221
              - generic [ref=e168]:
                - generic [ref=e169]:
                  - img [ref=e170]
                  - img [ref=e172]
                  - img [ref=e174]
                  - img [ref=e176]
                  - img [ref=e178]
                  - generic [ref=e180]: "0"
                  - generic [ref=e181]: (0)
                - generic [ref=e182]:
                  - text: View profile
                  - img [ref=e183]
          - link "Dr. Brigitte Ng Kuet Leong Gynaecologist Verified Gynaecologist practising at St Esprit Clinic, Quatre Bornes. Registered specialist with the Medical Council of Mauritius. Quatre Bornes +230 424 5471 0 (0) View profile" [ref=e186] [cursor=pointer]:
            - /url: /en/directory/dr-brigitte-ng-kuet-leong
            - generic [ref=e189]:
              - generic [ref=e190]:
                - generic [ref=e191]:
                  - img [ref=e193]
                  - generic [ref=e197]:
                    - heading "Dr. Brigitte Ng Kuet Leong" [level=3] [ref=e198]
                    - paragraph [ref=e199]: Gynaecologist
                - generic [ref=e200]:
                  - img
                  - text: Verified
              - paragraph [ref=e201]: Gynaecologist practising at St Esprit Clinic, Quatre Bornes. Registered specialist with the Medical Council of Mauritius.
              - generic [ref=e202]:
                - generic [ref=e203]:
                  - img [ref=e204]
                  - text: Quatre Bornes
                - generic [ref=e207]:
                  - img [ref=e208]
                  - text: +230 424 5471
              - generic [ref=e210]:
                - generic [ref=e211]:
                  - img [ref=e212]
                  - img [ref=e214]
                  - img [ref=e216]
                  - img [ref=e218]
                  - img [ref=e220]
                  - generic [ref=e222]: "0"
                  - generic [ref=e223]: (0)
                - generic [ref=e224]:
                  - text: View profile
                  - img [ref=e225]
          - link "Dr. Oomar Cassam Moollan Gynaecologist Verified Obstetrician and gynaecologist in Port Louis. Registered with the Medical Council of Mauritius. Port Louis 0 (0) View profile" [ref=e228] [cursor=pointer]:
            - /url: /en/directory/dr-oomar-cassam-moollan
            - generic [ref=e231]:
              - generic [ref=e232]:
                - generic [ref=e233]:
                  - img [ref=e235]
                  - generic [ref=e239]:
                    - heading "Dr. Oomar Cassam Moollan" [level=3] [ref=e240]
                    - paragraph [ref=e241]: Gynaecologist
                - generic [ref=e242]:
                  - img
                  - text: Verified
              - paragraph [ref=e243]: Obstetrician and gynaecologist in Port Louis. Registered with the Medical Council of Mauritius.
              - generic [ref=e244]:
                - generic [ref=e245]:
                  - img [ref=e246]
                  - text: Port Louis
                - img [ref=e250]
              - generic [ref=e252]:
                - generic [ref=e253]:
                  - img [ref=e254]
                  - img [ref=e256]
                  - img [ref=e258]
                  - img [ref=e260]
                  - img [ref=e262]
                  - generic [ref=e264]: "0"
                  - generic [ref=e265]: (0)
                - generic [ref=e266]:
                  - text: View profile
                  - img [ref=e267]
          - link "Dr. Tapash Kumar Saha Gynaecologist Verified Obstetrician and gynaecologist in Port Louis. Registered with the Medical Council of Mauritius. Port Louis 0 (0) View profile" [ref=e270] [cursor=pointer]:
            - /url: /en/directory/dr-tapash-kumar-saha
            - generic [ref=e273]:
              - generic [ref=e274]:
                - generic [ref=e275]:
                  - img [ref=e277]
                  - generic [ref=e281]:
                    - heading "Dr. Tapash Kumar Saha" [level=3] [ref=e282]
                    - paragraph [ref=e283]: Gynaecologist
                - generic [ref=e284]:
                  - img
                  - text: Verified
              - paragraph [ref=e285]: Obstetrician and gynaecologist in Port Louis. Registered with the Medical Council of Mauritius.
              - generic [ref=e286]:
                - generic [ref=e287]:
                  - img [ref=e288]
                  - text: Port Louis
                - img [ref=e292]
              - generic [ref=e294]:
                - generic [ref=e295]:
                  - img [ref=e296]
                  - img [ref=e298]
                  - img [ref=e300]
                  - img [ref=e302]
                  - img [ref=e304]
                  - generic [ref=e306]: "0"
                  - generic [ref=e307]: (0)
                - generic [ref=e308]:
                  - text: View profile
                  - img [ref=e309]
          - link "Dr. Paramasiven Motay Counsellor Verified Psychiatrist at C-Care Wellkin Hospital. Listed on the UK Government verified medical practitioners directory for Mauritius. Moka +230 453 8719 0 (0) View profile" [ref=e312] [cursor=pointer]:
            - /url: /en/directory/dr-paramasiven-motay
            - generic [ref=e315]:
              - generic [ref=e316]:
                - generic [ref=e317]:
                  - img [ref=e319]
                  - generic [ref=e324]:
                    - heading "Dr. Paramasiven Motay" [level=3] [ref=e325]
                    - paragraph [ref=e326]: Counsellor
                - generic [ref=e327]:
                  - img
                  - text: Verified
              - paragraph [ref=e328]: Psychiatrist at C-Care Wellkin Hospital. Listed on the UK Government verified medical practitioners directory for Mauritius.
              - generic [ref=e329]:
                - generic [ref=e330]:
                  - img [ref=e331]
                  - text: Moka
                - generic [ref=e334]:
                  - img [ref=e335]
                  - text: +230 453 8719
              - generic [ref=e337]:
                - generic [ref=e338]:
                  - img [ref=e339]
                  - img [ref=e341]
                  - img [ref=e343]
                  - img [ref=e345]
                  - img [ref=e347]
                  - generic [ref=e349]: "0"
                  - generic [ref=e350]: (0)
                - generic [ref=e351]:
                  - text: View profile
                  - img [ref=e352]
          - link "Dr. Salickram Dassaye Gynaecologist Verified Obstetrician and gynaecologist in Port Louis. Registered with the Medical Council of Mauritius. Port Louis 0 (0) View profile" [ref=e355] [cursor=pointer]:
            - /url: /en/directory/dr-salickram-dassaye
            - generic [ref=e358]:
              - generic [ref=e359]:
                - generic [ref=e360]:
                  - img [ref=e362]
                  - generic [ref=e366]:
                    - heading "Dr. Salickram Dassaye" [level=3] [ref=e367]
                    - paragraph [ref=e368]: Gynaecologist
                - generic [ref=e369]:
                  - img
                  - text: Verified
              - paragraph [ref=e370]: Obstetrician and gynaecologist in Port Louis. Registered with the Medical Council of Mauritius.
              - generic [ref=e371]:
                - generic [ref=e372]:
                  - img [ref=e373]
                  - text: Port Louis
                - img [ref=e377]
              - generic [ref=e379]:
                - generic [ref=e380]:
                  - img [ref=e381]
                  - img [ref=e383]
                  - img [ref=e385]
                  - img [ref=e387]
                  - img [ref=e389]
                  - generic [ref=e391]: "0"
                  - generic [ref=e392]: (0)
                - generic [ref=e393]:
                  - text: View profile
                  - img [ref=e394]
        - generic [ref=e398]:
          - generic [ref=e399]:
            - generic [ref=e400]:
              - generic [ref=e401]: Featured Clinic
              - heading "Apollo Bramwell Hospital" [level=3] [ref=e402]
              - paragraph [ref=e403]: State-of-the-art maternity ward with 24/7 NICU. Book your maternity package today.
            - generic [ref=e404]: A
          - link "View maternity packages" [ref=e405] [cursor=pointer]:
            - /url: "#"
            - text: View maternity packages
            - img [ref=e406]
  - contentinfo [ref=e410]:
    - generic [ref=e411]:
      - generic [ref=e412]:
        - generic [ref=e413]:
          - link "Manman Moris" [ref=e414] [cursor=pointer]:
            - /url: /en
            - img [ref=e416]
            - generic [ref=e418]: Manman Moris
          - paragraph [ref=e419]: The first all-in-one pregnancy platform for Mauritius.
        - generic [ref=e420]:
          - heading "Platform" [level=3] [ref=e421]
          - list [ref=e422]:
            - listitem [ref=e423]:
              - link "Tracker" [ref=e424] [cursor=pointer]:
                - /url: /en/tracker
            - listitem [ref=e425]:
              - link "Directory" [ref=e426] [cursor=pointer]:
                - /url: /en/directory
            - listitem [ref=e427]:
              - link "Emergency" [ref=e428] [cursor=pointer]:
                - /url: /en/emergency
            - listitem [ref=e429]:
              - link "Postpartum" [ref=e430] [cursor=pointer]:
                - /url: /en/postpartum
        - generic [ref=e431]:
          - heading "Community" [level=3] [ref=e432]
          - list [ref=e433]:
            - listitem [ref=e434]:
              - link "Community" [ref=e435] [cursor=pointer]:
                - /url: /en/forum
            - listitem [ref=e436]:
              - link "Benevolat" [ref=e437] [cursor=pointer]:
                - /url: /en/donate
            - listitem [ref=e438]:
              - link "Marketplace" [ref=e439] [cursor=pointer]:
                - /url: /en/marketplace
            - listitem [ref=e440]:
              - link "Blog" [ref=e441] [cursor=pointer]:
                - /url: /en/blog
        - generic [ref=e442]:
          - heading "Resources" [level=3] [ref=e443]
          - list [ref=e444]:
            - listitem [ref=e445]:
              - link "Food Guide" [ref=e446] [cursor=pointer]:
                - /url: /en/food-guide
            - listitem [ref=e447]:
              - link "Your Rights" [ref=e448] [cursor=pointer]:
                - /url: /en/rights
            - listitem [ref=e449]:
              - link "Contact" [ref=e450] [cursor=pointer]:
                - /url: /en/contact
      - generic [ref=e451]:
        - paragraph [ref=e452]: © 2026 Manman Moris. All rights reserved.
        - paragraph [ref=e453]:
          - text: Made with
          - img [ref=e454]
          - text: in Mauritius
  - button "Open Next.js Dev Tools" [ref=e461] [cursor=pointer]:
    - img [ref=e462]
  - alert [ref=e465]
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
> 72 |     await expect(page.getByText('Dr. Anisha Doorgakant')).toBeVisible();
     |                                                           ^ Error: expect(locator).toBeVisible() failed
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