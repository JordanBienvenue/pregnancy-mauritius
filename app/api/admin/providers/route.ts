import { requireRole, isAuthError, apiError, apiSuccess } from "@/lib/admin/api-helpers";
import { providerCreateSchema } from "@/lib/validations/provider";

export async function GET() {
  const auth = await requireRole("moderator");
  if (isAuthError(auth)) return auth;
  const { supabase } = auth;

  const { data, error } = await supabase
    .from("providers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return apiError(error.message, 500);
  return apiSuccess(data);
}

export async function POST(request: Request) {
  const auth = await requireRole("moderator");
  if (isAuthError(auth)) return auth;
  const { supabase } = auth;

  const body = await request.json();
  const parsed = providerCreateSchema.safeParse(body);
  if (!parsed.success) return apiError("Validation failed", 400);

  const { data, error } = await supabase.from("providers").insert(parsed.data).select().single();
  if (error) return apiError(error.message, 500);
  return apiSuccess(data, 201);
}
