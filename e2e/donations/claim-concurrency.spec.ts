import { test, expect, type APIRequestContext } from "@playwright/test";

/**
 * Data-layer multi-user tests for the donation-claim security fix
 * (migration 20260408000006). Talks to the local Supabase REST API as two
 * different authenticated users to prove:
 *   1. Claim hijack is impossible (RLS WITH CHECK forces claimed_by = self).
 *   2. Concurrent claims have exactly one winner (no double-claim).
 */

const SUPABASE_URL = "http://127.0.0.1:54421";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
const SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU";

// Deterministic seeded user ids (supabase/seed.sql).
const USER_A = "00000000-0000-0000-0000-0000000000b2"; // user@test.com
const USER_B = "00000000-0000-0000-0000-0000000000e5"; // mama2@test.com
const ADMIN = "00000000-0000-0000-0000-0000000000a1";

async function token(req: APIRequestContext, email: string): Promise<string> {
  const res = await req.post(
    `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      headers: { apikey: ANON_KEY, "Content-Type": "application/json" },
      data: { email, password: "test123456" },
    }
  );
  expect(res.ok()).toBeTruthy();
  return (await res.json()).access_token as string;
}

// Create a fresh available donation as service role; return its id.
async function freshDonation(req: APIRequestContext): Promise<string> {
  const res = await req.post(`${SUPABASE_URL}/rest/v1/donations`, {
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    data: {
      donor_id: ADMIN,
      item_name: "Concurrency test item",
      category: "clothing",
      condition: "good",
      district: "port_louis",
      is_available: true,
    },
  });
  expect(res.ok()).toBeTruthy();
  return (await res.json())[0].id as string;
}

function claim(
  req: APIRequestContext,
  jwt: string,
  id: string,
  claimedBy: string
) {
  return req.fetch(
    `${SUPABASE_URL}/rest/v1/donations?id=eq.${id}&is_available=eq.true`,
    {
      method: "PATCH",
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      data: {
        claimed_by: claimedBy,
        claimed_at: new Date().toISOString(),
        is_available: false,
      },
    }
  );
}

test("donation claim cannot be hijacked for another user", async ({
  request,
}) => {
  const id = await freshDonation(request);
  const jwtA = await token(request, "user@test.com");

  // User A tries to claim, but sets claimed_by = User B → must be rejected
  // by the RLS WITH CHECK (claimed_by = auth.uid()).
  const res = await claim(request, jwtA, id, USER_B);
  expect(res.ok()).toBeFalsy(); // 403, new row violates RLS

  // Item must still be available.
  const check = await request.get(
    `${SUPABASE_URL}/rest/v1/donations?id=eq.${id}&select=is_available,claimed_by`,
    { headers: { apikey: ANON_KEY, Authorization: `Bearer ${jwtA}` } }
  );
  const [row] = await check.json();
  expect(row.is_available).toBe(true);
  expect(row.claimed_by).toBeNull();
  console.log("[result] claim hijack rejected, item still available -> OK");
});

test("concurrent claims have exactly one winner", async ({ request }) => {
  const id = await freshDonation(request);
  const [jwtA, jwtB] = await Promise.all([
    token(request, "user@test.com"),
    token(request, "mama2@test.com"),
  ]);

  // Both users claim the same item at the same time, each for themselves.
  const [resA, resB] = await Promise.all([
    claim(request, jwtA, id, USER_A),
    claim(request, jwtB, id, USER_B),
  ]);

  const wonA = resA.ok() ? (await resA.json()).length : 0;
  const wonB = resB.ok() ? (await resB.json()).length : 0;
  expect(wonA + wonB).toBe(1); // exactly one row claimed

  // DB reflects a single winner among the two contenders.
  const check = await request.get(
    `${SUPABASE_URL}/rest/v1/donations?id=eq.${id}&select=is_available,claimed_by`,
    { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } }
  );
  const [row] = await check.json();
  expect(row.is_available).toBe(false);
  expect([USER_A, USER_B]).toContain(row.claimed_by);
  console.log(
    `[result] exactly one winner (A=${wonA} B=${wonB}), claimed_by=${row.claimed_by} -> OK`
  );
});
