import type { NextFunction, Request, Response } from "express";

import { getDeveloperFeed } from "../services/feed.service.js";

import { AppError } from "../utils/app-error.js";

import { feedQuerySchema } from "../validations/feed.validation.js";

export async function getFeed(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!request.user) {
      throw new AppError(401, "Authentication required");
    }

    const validationResult = feedQuerySchema.safeParse(request.query);

    if (!validationResult.success) {
      response.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationResult.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });

      return;
    }

    const feed = await getDeveloperFeed(
      request.user._id.toString(),
      validationResult.data,
    );

    response.status(200).json({
      success: true,
      message: "Developer feed fetched successfully",
      data: feed,
    });
  } catch (error) {
    next(error);
  }
}
