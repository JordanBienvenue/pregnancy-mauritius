import { requireRole, isAuthError, apiError, apiSuccess } from "@/lib/admin/api-helpers";
import { sponsorCreateSchema } from "@/lib/validations/sponsor";

export async function GET() {
  const auth = await requireRole("editor");
  if (isAuthError(auth)) return auth;

  const { data, error } = await auth.supabase
    .from("sponsors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return apiError(error.message, 500);
  return apiSuccess(data);
}

export async function POST(request: Request) {
  const auth = await requireRole("admin");
  if (isAuthError(auth)) return auth;

  const body = await request.json();
  const parsed = sponsorCreateSchema.safeParse(body);
  if (!parsed.success) return apiError("Validation failed", 400);

  const { data, error } = await auth.supabase.from("sponsors").insert(parsed.data).select().single();
  if (error) return apiError(error.message, 500);
  return apiSuccess(data, 201);
}
