import { Page } from '@playwright/test';

const SUPABASE_URL = 'http://127.0.0.1:54421';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

export const TEST_USER = {
  email: 'testuser@manmanmoris.test',
  password: 'TestPass123!',
  name: 'Test User',
};

export const TEST_ADMIN = {
  email: 'testadmin@manmanmoris.test',
  password: 'AdminPass123!',
  name: 'Test Admin',
};

export async function createTestUser(user: typeof TEST_USER, role: string = 'user') {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      apikey: SERVICE_ROLE_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: { full_name: user.name },
    }),
  });
  const data = await res.json();

  if (role === 'admin' && data.id) {
    await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${data.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        apikey: SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ role: 'admin' }),
    });
  }

  return data;
}

export async function login(page: Page, email: string, password: string) {
  await page.goto('/en/login');
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).first().fill(password);
  await page.getByRole('button', { name: /log in/i }).click();
  await page.waitForURL(/\/tracker/);
}
