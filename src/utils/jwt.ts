import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

import { AppError } from "./app-error.js";

interface TokenPayload extends JwtPayload {
  userId: string;
}

const TOKEN_EXPIRY: SignOptions["expiresIn"] = "7d";

function getJwtSecret(): string {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwtSecret;
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, getJwtSecret(), {
    expiresIn: TOKEN_EXPIRY,
  });
}

export function verifyToken(token: string): TokenPayload {
  try {
    const decoded = jwt.verify(token, getJwtSecret());

    if (typeof decoded === "string" || typeof decoded.userId !== "string") {
      throw new Error("Invalid token payload");
    }

    return decoded as TokenPayload;
  } catch {
    throw new AppError(401, "Invalid or expired authentication token");
  }
}
