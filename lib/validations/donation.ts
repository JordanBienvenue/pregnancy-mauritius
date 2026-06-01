import { z } from "zod";

export const donationUpdateSchema = z.object({
  is_available: z.boolean().optional(),
  is_hygiene_verified: z.boolean().optional(),
});
