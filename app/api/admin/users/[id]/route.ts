import { requireRole, isAuthError, apiError, apiSuccess } from "@/lib/admin/api-helpers";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole("admin");
  if (isAuthError(auth)) return auth;
  const { supabase } = auth;
  const { id } = await params;

  const { error } = await supabase.from("profiles").delete().eq("id", id);
  if (error) return apiError(error.message, 500);
  return apiSuccess({ deleted: true });
}
