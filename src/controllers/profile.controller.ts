import type { NextFunction, Request, Response } from "express";

import { updateProfile } from "../services/profile.service.js";

import { AppError } from "../utils/app-error.js";

import type { UpdateProfileInput } from "../validations/profile.validation.js";

export function viewProfile(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (!request.user) {
    next(new AppError(401, "Authentication required"));

    return;
  }

  response.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    data: {
      user: request.user,
    },
  });
}

export async function editProfile(
  request: Request<Record<string, never>, unknown, UpdateProfileInput>,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!request.user) {
      throw new AppError(401, "Authentication required");
    }

    const updatedUser = await updateProfile(
      request.user._id.toString(),
      request.body,
    );

    response.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
}
