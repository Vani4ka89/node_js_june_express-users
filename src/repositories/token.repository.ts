import { Token } from "../models";
import { IToken, ITokenPair } from "../types";

class TokenRepository {
  public async create(data: Partial<IToken>): Promise<ITokenPair> {
    return await Token.create(data);
  }
}

export const tokenRepository = new TokenRepository();
