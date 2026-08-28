import type { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/app-error.js";

function isDuplicateKeyError(error: unknown): error is { code: number } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  );
}

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      success: false,
      message: error.message,
    });

    return;
  }

  // MongoDB unique-index error

  console.log("Error", error);

  if (isDuplicateKeyError(error)) {
    response.status(409).json({
      success: false,
      message: "Email is already registered error",
    });

    return;
  }

  console.error(error);

  response.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
