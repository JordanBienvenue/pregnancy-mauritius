import { z } from "zod";

export const blogPostCreateSchema = z.object({
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  title: z.string().min(3).max(300),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(10),
  cover_image: z.string().optional(),
  author: z.string().min(2),
  reviewer: z.string().optional(),
  category: z.string().min(2),
  read_time: z.coerce.number().int().min(1).max(60).default(5),
});

export const blogPostUpdateSchema = blogPostCreateSchema.partial();

export const blogPublishSchema = z.object({
  is_published: z.boolean(),
});
