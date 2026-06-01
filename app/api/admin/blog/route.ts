import { requireRole, isAuthError, apiError, apiSuccess } from "@/lib/admin/api-helpers";
import { blogPostCreateSchema } from "@/lib/validations/blog";

export async function GET() {
  const auth = await requireRole("editor");
  if (isAuthError(auth)) return auth;

  const { data, error } = await auth.supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return apiError(error.message, 500);
  return apiSuccess(data);
}

export async function POST(request: Request) {
  const auth = await requireRole("editor");
  if (isAuthError(auth)) return auth;

  const body = await request.json();
  const parsed = blogPostCreateSchema.safeParse(body);
  if (!parsed.success) return apiError("Validation failed", 400);

  const { data, error } = await auth.supabase
    .from("blog_posts")
    .insert({ ...parsed.data, is_published: false })
    .select()
    .single();

  if (error) return apiError(error.message, 500);
  return apiSuccess(data, 201);
}
