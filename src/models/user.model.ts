import { model, Schema } from "mongoose";

import { EGenders } from "../enums";
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
    password: {
      type: String,
      // selected: false,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const User = model<IUser>("user", userSchema);
