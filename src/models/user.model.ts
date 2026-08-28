import { model, Schema, type HydratedDocument } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age?: number;
  gender?: "male" | "female" | "other";
  about: string;
  photoUrl?: string;
  skills: string[];
}

export type UserDocument = HydratedDocument<IUser>;

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    age: {
      type: Number,
      min: 18,
      max: 100,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    about: {
      type: String,
      default: "This developer has not added an introduction yet.",
      maxLength: 500,
    },

    photoUrl: {
      type: String,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const User = model<IUser>("User", userSchema);

export default User;
