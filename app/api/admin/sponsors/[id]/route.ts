import { requireRole, isAuthError, apiError, apiSuccess } from "@/lib/admin/api-helpers";
import { sponsorUpdateSchema } from "@/lib/validations/sponsor";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole("editor");
  if (isAuthError(auth)) return auth;
  const { id } = await params;

  const { data, error } = await auth.supabase.from("sponsors").select("*").eq("id", id).single();
  if (error) return apiError(error.message, 404);
  return apiSuccess(data);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole("admin");
  if (isAuthError(auth)) return auth;
  const { id } = await params;

  const body = await request.json();
  const parsed = sponsorUpdateSchema.safeParse(body);
  if (!parsed.success) return apiError("Validation failed", 400);

  const { data, error } = await auth.supabase.from("sponsors").update(parsed.data).eq("id", id).select().single();
  if (error) return apiError(error.message, 500);
  return apiSuccess(data);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole("admin");
  if (isAuthError(auth)) return auth;
  const { id } = await params;

  const { error } = await auth.supabase.from("sponsors").delete().eq("id", id);
  if (error) return apiError(error.message, 500);
  return apiSuccess({ deleted: true });
}
