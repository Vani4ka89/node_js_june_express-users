import { ERole } from "../enums";
import { Token, User } from "../models";
import { ITokenPair, ITokenPayload, IUser } from "../types";

class AuthRepository {
  public async signUpAdmin(
    dto: Partial<IUser>,
    hashedPassword: string,
  ): Promise<IUser> {
    return await User.create({
      ...dto,
      password: hashedPassword,
      role: ERole.ADMIN,
    });
  }

  public async signUp(
    dto: Partial<IUser>,
    hashedPassword: string,
  ): Promise<IUser> {
    return await User.create({
      ...dto,
      password: hashedPassword,
      role: ERole.ADMIN,
    });
  }

  public async refresh(
    jwtTokens: ITokenPair,
    tokenPayload: ITokenPayload,
    oldTokenPair: ITokenPair,
  ): Promise<ITokenPair> {
    await Promise.all([
      Token.deleteOne({ refreshToken: oldTokenPair.refreshToken }),
      Token.create({ _userId: tokenPayload._userId, ...jwtTokens }),
    ]);
    return jwtTokens;
  }
}

export const authRepository = new AuthRepository();
