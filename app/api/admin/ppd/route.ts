import { requireRole, isAuthError, apiError, apiSuccess } from "@/lib/admin/api-helpers";

export async function GET() {
  const auth = await requireRole("moderator");
  if (isAuthError(auth)) return auth;

  // Aggregated stats (moderator+)
  const { data: all } = await auth.supabase.from("ppd_checkins").select("score");
  const scores = all?.map((r: { score: number }) => r.score) ?? [];
  const avg = scores.length ? scores.reduce((a: number, b: number) => a + b, 0) / scores.length : 0;
  const flaggedCount = scores.filter((s: number) => s >= 13).length;

  const stats = {
    totalCheckins: scores.length,
    averageScore: Math.round(avg * 10) / 10,
    flaggedCount,
    distribution: {
      normal: scores.filter((s: number) => s < 10).length,
      borderline: scores.filter((s: number) => s >= 10 && s < 13).length,
      flagged: flaggedCount,
    },
  };

  // Individual records only for admin
  let flaggedRecords: unknown[] = [];
  if (auth.role === "admin") {
    const { data } = await auth.supabase
      .from("ppd_checkins")
      .select("*, profiles(full_name)")
      .gte("score", 13)
      .order("created_at", { ascending: false })
      .limit(50);
    flaggedRecords = data ?? [];
  }

  return apiSuccess({ stats, flaggedRecords });
}
