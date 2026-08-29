import type { NextFunction, Request, Response } from "express";

import User from "../models/user.model.js";
import { AUTH_COOKIE_NAME } from "../utils/auth-cookie.js";
import { AppError } from "../utils/app-error.js";
import { verifyToken } from "../utils/jwt.js";

export async function requireAuth(
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token: unknown = request.cookies?.[AUTH_COOKIE_NAME];

    if (typeof token !== "string" || !token) {
      throw new AppError(401, "Authentication required");
    }

    const payload = verifyToken(token);

    const user = await User.findById(payload.userId);

    if (!user) {
      throw new AppError(
        401,
        "User associated with this token no longer exists",
      );
    }

    request.user = user;

    next();
  } catch (error) {
    next(error);
  }
}
