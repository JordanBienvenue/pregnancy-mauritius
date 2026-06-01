import { requireRole, isAuthError, apiError, apiSuccess } from "@/lib/admin/api-helpers";
import { siteSettingsBatchSchema } from "@/lib/validations/settings";

export async function GET() {
  const auth = await requireRole("editor");
  if (isAuthError(auth)) return auth;

  const { data, error } = await auth.supabase.from("site_settings").select("*");
  if (error) return apiError(error.message, 500);

  const settings: Record<string, unknown> = {};
  for (const row of data ?? []) {
    settings[row.key] = row.value;
  }
  return apiSuccess(settings);
}

export async function PATCH(request: Request) {
  const auth = await requireRole("admin");
  if (isAuthError(auth)) return auth;

  const body = await request.json();
  const parsed = siteSettingsBatchSchema.safeParse(body);
  if (!parsed.success) return apiError("Validation failed", 400);

  const updates = Object.entries(parsed.data);
  for (const [key, value] of updates) {
    await auth.supabase
      .from("site_settings")
      .upsert({ key, value: JSON.parse(JSON.stringify(value)), updated_at: new Date().toISOString() });
  }

  return apiSuccess({ updated: true });
}
