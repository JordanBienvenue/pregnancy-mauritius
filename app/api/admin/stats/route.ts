import { requireRole, isAuthError, apiSuccess } from "@/lib/admin/api-helpers";

export async function GET() {
  const auth = await requireRole("editor");
  if (isAuthError(auth)) return auth;
  const { supabase } = auth;

  const [users, providers, bookings, ppdFlagged, reports, posts] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("providers").select("id", { count: "exact", head: true }).eq("is_public", true),
    supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("ppd_checkins").select("id", { count: "exact", head: true }).gte("score", 13),
    supabase.from("forum_reports").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }).eq("is_published", true),
  ]);

  return apiSuccess({
    totalUsers: users.count ?? 0,
    activeProviders: providers.count ?? 0,
    pendingBookings: bookings.count ?? 0,
    flaggedPPD: ppdFlagged.count ?? 0,
    unresolvedReports: reports.count ?? 0,
    publishedPosts: posts.count ?? 0,
  });
}
