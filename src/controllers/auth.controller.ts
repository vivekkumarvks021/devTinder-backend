import type { NextFunction, Request, Response } from "express";

import { signupUser } from "../services/auth.service.js";
import type { SignupInput } from "../validations/auth.validation.js";

export async function signup(
  request: Request<Record<string, never>, unknown, SignupInput>,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user = await signupUser(request.body);

    response.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
}
