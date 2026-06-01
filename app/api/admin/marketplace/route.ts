import { requireRole, isAuthError, apiError, apiSuccess } from "@/lib/admin/api-helpers";
import { z } from "zod";

const marketplaceCreateSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.coerce.number().min(0),
  category: z.string().min(2),
  image_url: z.string().optional(),
  seller_name: z.string().min(2),
  is_available: z.boolean().default(true),
});

export async function GET() {
  const auth = await requireRole("moderator");
  if (isAuthError(auth)) return auth;

  const { data, error } = await auth.supabase
    .from("marketplace_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return apiError(error.message, 500);
  return apiSuccess(data);
}

export async function POST(request: Request) {
  const auth = await requireRole("moderator");
  if (isAuthError(auth)) return auth;

  const body = await request.json();
  const parsed = marketplaceCreateSchema.safeParse(body);
  if (!parsed.success) return apiError("Validation failed", 400);

  const { data, error } = await auth.supabase
    .from("marketplace_items")
    .insert(parsed.data)
    .select()
    .single();

  if (error) return apiError(error.message, 500);
  return apiSuccess(data, 201);
}
