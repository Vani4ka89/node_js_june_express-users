import { Token } from "../models";
import { ITokenPair, ITokenPayload } from "../types";

class AuthRepository {
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
