import User from "../models/user.model.js";
import { AppError } from "../utils/app-error.js";
import type { UpdateProfileInput } from "../validations/profile.validation.js";

export async function updateProfile(userId: string, input: UpdateProfileInput) {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: input,
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  if (!updatedUser) {
    throw new AppError(404, "User not found");
  }

  return updatedUser;
}
