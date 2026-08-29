import { z } from "zod";

export const feedQuerySchema = z
  .object({
    page: z.coerce
      .number()
      .int("Page must be a whole number")
      .min(1, "Page must be at least 1")
      .default(1),

    limit: z.coerce
      .number()
      .int("Limit must be a whole number")
      .min(1, "Limit must be at least 1")
      .max(50, "Limit cannot exceed 50")
      .default(10),
  })
  .strict();

export type FeedQuery = z.infer<typeof feedQuerySchema>;
