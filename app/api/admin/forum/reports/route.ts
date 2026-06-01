import { requireRole, isAuthError, apiError, apiSuccess } from "@/lib/admin/api-helpers";

export async function GET() {
  const auth = await requireRole("moderator");
  if (isAuthError(auth)) return auth;

  const { data, error } = await auth.supabase
    .from("forum_reports")
    .select("*, forum_posts(title, category), profiles(full_name)")
    .order("created_at", { ascending: false });

  if (error) return apiError(error.message, 500);
  return apiSuccess(data);
}
