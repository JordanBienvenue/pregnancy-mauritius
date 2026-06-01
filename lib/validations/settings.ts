import { z } from "zod";

export const siteSettingUpdateSchema = z.object({
  key: z.string().min(1),
  value: z.unknown(),
});

export const siteSettingsBatchSchema = z.record(z.string(), z.unknown());
