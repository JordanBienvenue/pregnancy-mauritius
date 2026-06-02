# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Authentication >> register page has link to login
- Location: e2e/auth.spec.ts:28:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('a[href*="/login"]')
Expected: visible
Error: strict mode violation: locator('a[href*="/login"]') resolved to 2 elements:
    1) <a tabindex="0" role="button" href="/en/login" data-slot="button" class="group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark…>Log in</a> aka getByRole('button', { name: 'Log in' })
    2) <a href="/en/login" class="font-semibold text-primary hover:text-brand-pink-dark transition-colors">Log in</a> aka getByRole('link', { name: 'Log in' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('a[href*="/login"]')

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
    - generic [ref=e35]:
      - generic [ref=e38]:
        - generic [ref=e39]:
          - heading "Join Manman Moris" [level=1] [ref=e40]
          - paragraph [ref=e41]: Create your free account
        - generic [ref=e42]:
          - generic [ref=e44]:
            - img [ref=e46]
            - generic [ref=e49]: Account
          - generic [ref=e52]:
            - img [ref=e54]
            - generic [ref=e56]: Personal
          - generic [ref=e59]:
            - img [ref=e61]
            - generic [ref=e64]: Pregnancy
        - generic [ref=e65]:
          - generic [ref=e66]:
            - generic [ref=e67]:
              - generic [ref=e68]: Full name
              - generic [ref=e69]:
                - img [ref=e70]
                - textbox "Full name" [ref=e73]:
                  - /placeholder: Priya Ramgoolam
            - generic [ref=e74]:
              - generic [ref=e75]: Email
              - generic [ref=e76]:
                - img [ref=e77]
                - textbox "Email" [ref=e80]:
                  - /placeholder: mama@email.com
            - generic [ref=e81]:
              - generic [ref=e82]: Phone number
              - generic [ref=e83]:
                - img [ref=e84]
                - textbox "Phone number" [ref=e86]:
                  - /placeholder: +230 5XXX XXXX
          - separator [ref=e87]
          - generic [ref=e88]:
            - generic [ref=e89]:
              - generic [ref=e90]: Password
              - generic [ref=e91]:
                - img [ref=e92]
                - textbox "Password" [ref=e95]:
                  - /placeholder: ••••••••
                - button "Show password" [ref=e96]:
                  - img [ref=e97]
            - generic [ref=e100]:
              - generic [ref=e101]: Confirm password
              - generic [ref=e102]:
                - img [ref=e103]
                - textbox "Confirm password" [ref=e106]:
                  - /placeholder: ••••••••
                - button "Show password" [ref=e107]:
                  - img [ref=e108]
          - separator [ref=e111]
          - generic [ref=e112]:
            - generic [ref=e113]:
              - switch [ref=e114] [cursor=pointer]
              - generic [ref=e115]:
                - img [ref=e116]
                - generic [ref=e119] [cursor=pointer]: I already gave birth
            - generic [ref=e121]:
              - generic [ref=e122]: Due date
              - generic [ref=e123]:
                - img [ref=e124]
                - textbox "Due date" [ref=e126]
            - generic [ref=e127] [cursor=pointer]:
              - checkbox [ref=e128]
              - generic [ref=e129]:
                - text: I am a solo mother
                - paragraph [ref=e130]: Join a supportive community of solo mothers in Mauritius
              - img [ref=e131]
          - button "Sign up" [ref=e133]:
            - text: Sign up
            - img
        - paragraph [ref=e134]:
          - text: Already have an account?
          - link "Log in" [ref=e135] [cursor=pointer]:
            - /url: /en/login
      - paragraph [ref=e136]: Manman Moris — Your pregnancy companion in Mauritius
  - contentinfo [ref=e137]:
    - generic [ref=e138]:
      - generic [ref=e139]:
        - generic [ref=e140]:
          - link "Manman Moris" [ref=e141] [cursor=pointer]:
            - /url: /en
            - img [ref=e143]
            - generic [ref=e145]: Manman Moris
          - paragraph [ref=e146]: The first all-in-one pregnancy platform for Mauritius.
        - generic [ref=e147]:
          - heading "Platform" [level=3] [ref=e148]
          - list [ref=e149]:
            - listitem [ref=e150]:
              - link "Tracker" [ref=e151] [cursor=pointer]:
                - /url: /en/tracker
            - listitem [ref=e152]:
              - link "Directory" [ref=e153] [cursor=pointer]:
                - /url: /en/directory
            - listitem [ref=e154]:
              - link "Emergency" [ref=e155] [cursor=pointer]:
                - /url: /en/emergency
            - listitem [ref=e156]:
              - link "Postpartum" [ref=e157] [cursor=pointer]:
                - /url: /en/postpartum
        - generic [ref=e158]:
          - heading "Community" [level=3] [ref=e159]
          - list [ref=e160]:
            - listitem [ref=e161]:
              - link "Community" [ref=e162] [cursor=pointer]:
                - /url: /en/forum
            - listitem [ref=e163]:
              - link "Benevolat" [ref=e164] [cursor=pointer]:
                - /url: /en/donate
            - listitem [ref=e165]:
              - link "Marketplace" [ref=e166] [cursor=pointer]:
                - /url: /en/marketplace
            - listitem [ref=e167]:
              - link "Blog" [ref=e168] [cursor=pointer]:
                - /url: /en/blog
        - generic [ref=e169]:
          - heading "Resources" [level=3] [ref=e170]
          - list [ref=e171]:
            - listitem [ref=e172]:
              - link "Food Guide" [ref=e173] [cursor=pointer]:
                - /url: /en/food-guide
            - listitem [ref=e174]:
              - link "Your Rights" [ref=e175] [cursor=pointer]:
                - /url: /en/rights
            - listitem [ref=e176]:
              - link "Contact" [ref=e177] [cursor=pointer]:
                - /url: /en/contact
      - generic [ref=e178]:
        - paragraph [ref=e179]: © 2026 Manman Moris. All rights reserved.
        - paragraph [ref=e180]:
          - text: Made with
          - img [ref=e181]
          - text: in Mauritius
  - button "Open Next.js Dev Tools" [ref=e188] [cursor=pointer]:
    - img [ref=e189]
  - alert [ref=e192]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Authentication', () => {
  4  |   test('login page renders and accepts credentials', async ({ page }) => {
  5  |     await page.goto('/en/login');
  6  |     await expect(page.getByPlaceholder('mama@email.com')).toBeVisible();
  7  |     await expect(page.getByPlaceholder('••••••••')).toBeVisible();
  8  |   });
  9  | 
  10 |   test('register page renders all fields', async ({ page }) => {
  11 |     await page.goto('/en/register');
  12 |     await expect(page.getByPlaceholder('Priya Ramgoolam')).toBeVisible();
  13 |     await expect(page.getByPlaceholder('mama@email.com')).toBeVisible();
  14 |     await expect(page.getByPlaceholder('+230 5XXX XXXX')).toBeVisible();
  15 |   });
  16 | 
  17 |   test('forgot password page renders', async ({ page }) => {
  18 |     await page.goto('/en/forgot-password');
  19 |     await expect(page.getByPlaceholder('mama@email.com')).toBeVisible();
  20 |   });
  21 | 
  22 |   test('login page has link to register', async ({ page }) => {
  23 |     await page.goto('/en/login');
  24 |     const registerLink = page.locator('a[href*="/register"]');
  25 |     await expect(registerLink).toBeVisible();
  26 |   });
  27 | 
  28 |   test('register page has link to login', async ({ page }) => {
  29 |     await page.goto('/en/register');
  30 |     const loginLink = page.locator('a[href*="/login"]');
> 31 |     await expect(loginLink).toBeVisible();
     |                             ^ Error: expect(locator).toBeVisible() failed
  32 |   });
  33 | 
  34 |   test('login page has link to forgot password', async ({ page }) => {
  35 |     await page.goto('/en/login');
  36 |     const forgotLink = page.locator('a[href*="/forgot-password"]');
  37 |     await expect(forgotLink).toBeVisible();
  38 |   });
  39 | });
  40 | 
```