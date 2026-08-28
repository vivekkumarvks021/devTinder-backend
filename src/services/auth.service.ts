import bcrypt from "bcrypt";

import User from "../models/user.model.js";
import type { SignupInput } from "../validations/auth.validation.js";
import { AppError } from "../utils/app-error.js";

const PASSWORD_SALT_ROUNDS = 12;

export async function signupUser(input: SignupInput) {
  const existingUser = await User.exists({
    email: input.email,
  });

  if (existingUser) {
    throw new AppError(409, "Email is already registered here");
  }

  const hashedPassword = await bcrypt.hash(
    input.password,
    PASSWORD_SALT_ROUNDS,
  );

  const user = await User.create({
    ...input,
    password: hashedPassword,
  });

  const userObject = user.toObject();

  // Password ko API response se remove kar rahe hain.
  const { password: _password, ...safeUser } = userObject;

  return safeUser;
}
