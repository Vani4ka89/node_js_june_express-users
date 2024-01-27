import { Document } from "mongoose";

import { ERole } from "../enums";

export interface IUser extends Document {
  name?: string;
  age?: number;
  gender?: string;
  role: ERole;
  email: string;
  password: string;
}
