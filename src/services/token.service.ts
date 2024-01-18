import * as jwt from "jsonwebtoken";

import { configs } from "../configs";
import { ITokenPair, ITokenPayload } from "../types";

class TokenService {
  public async generateTokenPair(payload: ITokenPayload): Promise<ITokenPair> {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: "14d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export const tokenService = new TokenService();
