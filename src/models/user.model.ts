import { model, Schema } from "mongoose";

import { EGenders, ERole } from "../enums";
import { IUser } from "../types";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 1,
      max: 100,
      required: true,
    },
    gender: {
      type: String,
      enum: EGenders,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: ERole,
      default: ERole.USER,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const User = model<IUser>("user", userSchema);
