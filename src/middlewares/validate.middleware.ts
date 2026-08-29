import type { NextFunction, Request, Response } from "express";

import type { ZodType } from "zod";

type RequestSource = "body" | "params";

export function validate(schema: ZodType, source: RequestSource = "body") {
  return (request: Request, response: Response, next: NextFunction): void => {
    const result = schema.safeParse(request[source]);

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

    if (source === "params") {
      request.params = result.data as Request["params"];
    } else {
      request.body = result.data;
    }

    next();
  };
}
