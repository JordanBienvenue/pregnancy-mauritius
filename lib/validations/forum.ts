import { z } from "zod";

export const forumPostModerateSchema = z.object({
  is_pinned: z.boolean().optional(),
  is_moderated: z.boolean().optional(),
});

export const forumReportResolveSchema = z.object({
  status: z.enum(["resolved", "dismissed"]),
});
