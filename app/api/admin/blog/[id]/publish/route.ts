import { requireRole, isAuthError, apiError, apiSuccess } from "@/lib/admin/api-helpers";
import { blogPublishSchema } from "@/lib/validations/blog";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole("admin");
  if (isAuthError(auth)) return auth;
  const { id } = await params;

  const body = await request.json();
  const parsed = blogPublishSchema.safeParse(body);
  if (!parsed.success) return apiError("Validation failed", 400);

  const updateData: Record<string, unknown> = { is_published: parsed.data.is_published };
  if (parsed.data.is_published) {
    updateData.published_at = new Date().toISOString();
  }

  const { data, error } = await auth.supabase.from("blog_posts").update(updateData).eq("id", id).select().single();
  if (error) return apiError(error.message, 500);
  return apiSuccess(data);
}
