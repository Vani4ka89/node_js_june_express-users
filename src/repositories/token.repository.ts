import { Token } from "../models";
import { IToken, ITokenPair } from "../types";

class TokenRepository {
  public async create(data: Partial<IToken>): Promise<ITokenPair> {
    return await Token.create(data);
  }

  public async getOneByParams(params: Partial<IToken>): Promise<IToken> {
    return await Token.findOne(params);
  }

  public async deleteOneByParams(params: Partial<IToken>): Promise<void> {
    await Token.deleteOne(params);
  }
}

export const tokenRepository = new TokenRepository();
