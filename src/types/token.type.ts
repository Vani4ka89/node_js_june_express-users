import { Types } from "mongoose";

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface IToken extends ITokenPair {
  _userId: Types.ObjectId;
}

export interface ITokenPayload {
  _userId: Types.ObjectId;
}
