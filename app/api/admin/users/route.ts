import { requireRole, isAuthError, apiError, apiSuccess } from "@/lib/admin/api-helpers";
import { userRoleUpdateSchema } from "@/lib/validations/user";

export async function GET() {
  const auth = await requireRole("admin");
  if (isAuthError(auth)) return auth;
  const { supabase } = auth;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, phone, locale, role, due_date, is_postpartum, is_solo_mother, created_at")
    .order("created_at", { ascending: false });

  if (error) return apiError(error.message, 500);
  return apiSuccess(data);
}

export async function PATCH(request: Request) {
  const auth = await requireRole("admin");
  if (isAuthError(auth)) return auth;
  const { supabase } = auth;

  const body = await request.json();
  const parsed = userRoleUpdateSchema.safeParse(body);
  if (!parsed.success) return apiError("Validation failed", 400);

  const userId = new URL(request.url).searchParams.get("id");
  if (!userId) return apiError("Missing user id", 400);

  const { error } = await supabase
    .from("profiles")
    .update({ role: parsed.data.role })
    .eq("id", userId);

  if (error) return apiError(error.message, 500);
  return apiSuccess({ updated: true });
}
