import { z } from "zod";

export const providerCreateSchema = z.object({
  name: z.string().min(2).max(200),
  type: z.enum(["gynaecologist", "midwife", "counsellor", "photographer", "lactation", "massage"]),
  district: z.string().min(2),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  description: z.string().optional(),
  is_verified: z.boolean().default(false),
  is_public: z.boolean().default(true),
  image_url: z.string().optional(),
});

export const providerUpdateSchema = providerCreateSchema.partial();
