import { model, Schema, Types } from "mongoose";

import { ITokenPair } from "../types";
import { User } from "./user.model";

const tokenSchema = new Schema(
  {
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Token = model<ITokenPair>("token", tokenSchema);