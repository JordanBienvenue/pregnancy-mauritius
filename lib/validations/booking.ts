import { z } from "zod";

export const bookingUpdateSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
  notes: z.string().optional(),
});
