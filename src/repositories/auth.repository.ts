import { User } from "../models";
import { IUser } from "../types";

class AuthRepository {
  public async signUp(dto: Partial<IUser>, hashedPassword: string) {
    return await User.create({ ...dto, password: hashedPassword });
  }
}

export const authRepository = new AuthRepository();
