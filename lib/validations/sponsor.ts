import { z } from "zod";

export const sponsorCreateSchema = z.object({
  name: z.string().min(2).max(200),
  logo_url: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  package: z.enum(["basic", "standard", "premium", "exclusive"]),
  category: z.string().min(2),
  active_from: z.string().optional(),
  active_to: z.string().optional(),
  is_active: z.boolean().default(true),
});

export const sponsorUpdateSchema = sponsorCreateSchema.partial();
