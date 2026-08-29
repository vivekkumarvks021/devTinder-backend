import { z } from "zod";

export const sendConnectionRequestParamsSchema = z
  .object({
    status: z.enum(["interested", "ignored"], {
      message: "Status must be interested or ignored",
    }),

    toUserId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"),
  })
  .strict();

export type SendConnectionRequestParams = z.infer<
  typeof sendConnectionRequestParamsSchema
>;

export const reviewConnectionRequestParamsSchema = z
  .object({
    status: z.enum(["accepted", "rejected"], {
      message: "Status must be accepted or rejected",
    }),

    requestId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid connection request ID"),
  })
  .strict();

export type ReviewConnectionRequestParams = z.infer<
  typeof reviewConnectionRequestParamsSchema
>;
