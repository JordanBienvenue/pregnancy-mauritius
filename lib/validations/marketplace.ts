import { z } from "zod";

export const marketplaceItemUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().optional(),
  price: z.coerce.number().min(0).optional(),
  category: z.string().optional(),
  image_url: z.string().optional(),
  seller_name: z.string().optional(),
  is_available: z.boolean().optional(),
});
