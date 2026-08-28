import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must contain at least 2 characters")
      .max(50, "First name cannot exceed 50 characters"),

    lastName: z
      .string()
      .trim()
      .min(2, "Last name must contain at least 2 characters")
      .max(50, "Last name cannot exceed 50 characters"),

    email: z
      .string()
      .trim()
      .email("Please provide a valid email address")
      .toLowerCase(),

    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .max(72, "Password cannot exceed 72 characters")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[0-9]/, "Password must contain a number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain a special character"),

    age: z
      .number()
      .int("Age must be a whole number")
      .min(18, "User must be at least 18 years old")
      .max(100, "Age cannot exceed 100")
      .optional(),

    gender: z.enum(["male", "female", "other"]).optional(),

    about: z
      .string()
      .trim()
      .max(500, "About cannot exceed 500 characters")
      .optional(),

    photoUrl: z
      .string()
      .trim()
      .url("Please provide a valid photo URL")
      .optional(),

    skills: z
      .array(
        z
          .string()
          .trim()
          .min(1, "Skill cannot be empty")
          .max(50, "Skill cannot exceed 50 characters"),
      )
      .max(20, "A maximum of 20 skills is allowed")
      .optional(),
  })
  .strict();

export type SignupInput = z.infer<typeof signupSchema>;
