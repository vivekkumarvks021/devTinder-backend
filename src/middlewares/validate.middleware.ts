import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export function validate(schema: ZodType) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const result = schema.safeParse(request.body);

    if (!result.success) {
      response.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });

      return;
    }

    request.body = result.data;

    next();
  };
}
