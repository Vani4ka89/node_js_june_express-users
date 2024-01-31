import { Types } from "mongoose";

import { ERole } from "../enums";

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
  accessExpiresIn: string;
  refreshExpiresIn: string;
}

export interface IToken extends ITokenPair {
  _userId: Types.ObjectId;
}

export interface ITokenPayload {
  _userId: string;
  role: ERole;
}
