import { requireRole, isAuthError, apiError, apiSuccess } from "@/lib/admin/api-helpers";

export async function GET(request: Request) {
  const auth = await requireRole("moderator");
  if (isAuthError(auth)) return auth;

  const url = new URL(request.url);
  const filter = url.searchParams.get("filter");

  let query = auth.supabase
    .from("forum_posts")
    .select("*, profiles(full_name)")
    .order("created_at", { ascending: false });

  if (filter === "reported") {
    // Posts that have pending reports
    const { data: reportedIds } = await auth.supabase
      .from("forum_reports")
      .select("post_id")
      .eq("status", "pending");
    const ids = reportedIds?.map((r: { post_id: string }) => r.post_id) ?? [];
    if (ids.length > 0) query = query.in("id", ids);
    else return apiSuccess([]);
  } else if (filter === "moderated") {
    query = query.eq("is_moderated", true);
  } else if (filter === "pinned") {
    query = query.eq("is_pinned", true);
  }

  const { data, error } = await query;
  if (error) return apiError(error.message, 500);
  return apiSuccess(data);
}
