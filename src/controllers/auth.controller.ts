import type { NextFunction, Request, Response } from "express";

import { loginUser, signupUser } from "../services/auth.service.js";
import type {
  LoginInput,
  SignupInput,
} from "../validations/auth.validation.js";
import { setAuthCookie, clearAuthCookie } from "../utils/auth-cookie.js";
import { generateToken } from "../utils/jwt.js";
import { AppError } from "../utils/app-error.js";

export async function signup(
  request: Request<Record<string, never>, unknown, SignupInput>,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user = await signupUser(request.body);

    const token = generateToken(user._id.toString());

    setAuthCookie(response, token);

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

export async function login(
  request: Request<Record<string, never>, unknown, LoginInput>,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user = await loginUser(request.body);

    const token = generateToken(user._id.toString());
    setAuthCookie(response, token);

    response.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
}

export function getCurrentUser(
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
    message: "Current user fetched successfully",
    data: {
      user: request.user,
    },
  });
}

export function logout(_request: Request, response: Response): void {
  clearAuthCookie(response);

  response.status(200).json({
    success: true,
    message: "Logout successful",
  });
}
