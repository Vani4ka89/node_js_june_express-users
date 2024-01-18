import { Token } from "../models";
import { IToken } from "../types";

class TokenRepository {
  public async create(data: Partial<IToken>) {
    return await Token.create(data);
  }
}

export const tokenRepository = new TokenRepository();
