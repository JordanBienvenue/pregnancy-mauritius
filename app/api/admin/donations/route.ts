import { requireRole, isAuthError, apiError, apiSuccess } from "@/lib/admin/api-helpers";
import { z } from "zod";

const donationCreateSchema = z.object({
  item_name: z.string().min(2),
  description: z.string().optional(),
  condition: z.enum(["new", "like_new", "good", "fair"]),
  category: z.string().min(2),
  district: z.string().min(2),
  is_available: z.boolean().default(true),
  is_hygiene_verified: z.boolean().default(false),
});

export async function GET() {
  const auth = await requireRole("moderator");
  if (isAuthError(auth)) return auth;

  const { data, error } = await auth.supabase
    .from("donations")
    // disambiguate the profiles embed (donor_id + claimed_by both FK profiles)
    .select("*, profiles!donor_id(full_name)")
    .order("created_at", { ascending: false });

  if (error) return apiError(error.message, 500);
  return apiSuccess(data);
}

export async function POST(request: Request) {
  const auth = await requireRole("moderator");
  if (isAuthError(auth)) return auth;

  const body = await request.json();
  const parsed = donationCreateSchema.safeParse(body);
  if (!parsed.success) return apiError("Validation failed", 400);

  const { data, error } = await auth.supabase
    .from("donations")
    .insert({ ...parsed.data, donor_id: auth.userId })
    .select()
    .single();

  if (error) return apiError(error.message, 500);
  return apiSuccess(data, 201);
}
