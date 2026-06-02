# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Authentication >> login page has link to register
- Location: e2e/auth.spec.ts:22:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('a[href*="/register"]')
Expected: visible
Error: strict mode violation: locator('a[href*="/register"]') resolved to 2 elements:
    1) <a tabindex="0" role="button" data-slot="button" href="/en/register" class="group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 d…>Sign up</a> aka getByRole('button', { name: 'Sign up' })
    2) <a href="/en/register" class="font-semibold text-primary hover:text-brand-pink-dark transition-colors">Sign up</a> aka getByRole('link', { name: 'Sign up' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('a[href*="/register"]')

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
          - heading "Welcome back" [level=1] [ref=e40]
          - paragraph [ref=e41]: Log in to continue your journey
        - generic [ref=e42]:
          - generic [ref=e43]:
            - generic [ref=e44]: Email
            - generic [ref=e45]:
              - img [ref=e46]
              - textbox "Email" [ref=e49]:
                - /placeholder: mama@email.com
          - generic [ref=e50]:
            - generic [ref=e51]:
              - generic [ref=e52]: Password
              - link "Forgot password?" [ref=e53] [cursor=pointer]:
                - /url: /en/forgot-password
            - generic [ref=e54]:
              - img [ref=e55]
              - textbox "Password" [ref=e58]:
                - /placeholder: ••••••••
              - button "Show password" [ref=e59]:
                - img [ref=e60]
          - button "Log in" [ref=e63]:
            - text: Log in
            - img
        - paragraph [ref=e64]:
          - text: Don't have an account?
          - link "Sign up" [ref=e65] [cursor=pointer]:
            - /url: /en/register
      - paragraph [ref=e66]: Manman Moris — Your pregnancy companion in Mauritius
  - contentinfo [ref=e67]:
    - generic [ref=e68]:
      - generic [ref=e69]:
        - generic [ref=e70]:
          - link "Manman Moris" [ref=e71] [cursor=pointer]:
            - /url: /en
            - img [ref=e73]
            - generic [ref=e75]: Manman Moris
          - paragraph [ref=e76]: The first all-in-one pregnancy platform for Mauritius.
        - generic [ref=e77]:
          - heading "Platform" [level=3] [ref=e78]
          - list [ref=e79]:
            - listitem [ref=e80]:
              - link "Tracker" [ref=e81] [cursor=pointer]:
                - /url: /en/tracker
            - listitem [ref=e82]:
              - link "Directory" [ref=e83] [cursor=pointer]:
                - /url: /en/directory
            - listitem [ref=e84]:
              - link "Emergency" [ref=e85] [cursor=pointer]:
                - /url: /en/emergency
            - listitem [ref=e86]:
              - link "Postpartum" [ref=e87] [cursor=pointer]:
                - /url: /en/postpartum
        - generic [ref=e88]:
          - heading "Community" [level=3] [ref=e89]
          - list [ref=e90]:
            - listitem [ref=e91]:
              - link "Community" [ref=e92] [cursor=pointer]:
                - /url: /en/forum
            - listitem [ref=e93]:
              - link "Benevolat" [ref=e94] [cursor=pointer]:
                - /url: /en/donate
            - listitem [ref=e95]:
              - link "Marketplace" [ref=e96] [cursor=pointer]:
                - /url: /en/marketplace
            - listitem [ref=e97]:
              - link "Blog" [ref=e98] [cursor=pointer]:
                - /url: /en/blog
        - generic [ref=e99]:
          - heading "Resources" [level=3] [ref=e100]
          - list [ref=e101]:
            - listitem [ref=e102]:
              - link "Food Guide" [ref=e103] [cursor=pointer]:
                - /url: /en/food-guide
            - listitem [ref=e104]:
              - link "Your Rights" [ref=e105] [cursor=pointer]:
                - /url: /en/rights
            - listitem [ref=e106]:
              - link "Contact" [ref=e107] [cursor=pointer]:
                - /url: /en/contact
      - generic [ref=e108]:
        - paragraph [ref=e109]: © 2026 Manman Moris. All rights reserved.
        - paragraph [ref=e110]:
          - text: Made with
          - img [ref=e111]
          - text: in Mauritius
  - button "Open Next.js Dev Tools" [ref=e118] [cursor=pointer]:
    - img [ref=e119]
  - alert [ref=e122]
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
> 25 |     await expect(registerLink).toBeVisible();
     |                                ^ Error: expect(locator).toBeVisible() failed
  26 |   });
  27 | 
  28 |   test('register page has link to login', async ({ page }) => {
  29 |     await page.goto('/en/register');
  30 |     const loginLink = page.locator('a[href*="/login"]');
  31 |     await expect(loginLink).toBeVisible();
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