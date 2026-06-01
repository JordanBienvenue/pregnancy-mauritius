import { requireRole, isAuthError, apiError, apiSuccess } from "@/lib/admin/api-helpers";
import { bookingUpdateSchema } from "@/lib/validations/booking";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole("moderator");
  if (isAuthError(auth)) return auth;
  const { id } = await params;

  const body = await request.json();
  const parsed = bookingUpdateSchema.safeParse(body);
  if (!parsed.success) return apiError("Validation failed", 400);

  const { data, error } = await auth.supabase.from("bookings").update(parsed.data).eq("id", id).select().single();
  if (error) return apiError(error.message, 500);
  return apiSuccess(data);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole("admin");
  if (isAuthError(auth)) return auth;
  const { id } = await params;

  const { error } = await auth.supabase.from("bookings").delete().eq("id", id);
  if (error) return apiError(error.message, 500);
  return apiSuccess({ deleted: true });
}
