import * as jwt from "jsonwebtoken";

import { configs } from "../configs";
import { ERole, ETokenType } from "../enums";
import { ApiError } from "../errors";
import { ITokenPair, ITokenPayload } from "../types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload, role: ERole): ITokenPair {
    let accessTokenSecret: string;
    let accessExpiresIn: string;
    let refreshTokenSecret: string;
    let refreshExpiresIn: string;

    switch (role) {
      case ERole.ADMIN:
        accessTokenSecret = configs.JWT_ADMIN_ACCESS_SECRET;
        accessExpiresIn = configs.JWT_ADMIN_ACCESS_EXPIRES_IN;
        refreshTokenSecret = configs.JWT_ADMIN_REFRESH_SECRET;
        refreshExpiresIn = configs.JWT_ADMIN_REFRESH_EXPIRES_IN;
        break;
      case ERole.USER:
        accessTokenSecret = configs.JWT_ACCESS_SECRET;
        accessExpiresIn = configs.JWT_ACCESS_EXPIRES_IN;
        refreshTokenSecret = configs.JWT_REFRESH_SECRET;
        refreshExpiresIn = configs.JWT_REFRESH_EXPIRES_IN;
        break;
    }

    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: accessExpiresIn,
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: refreshExpiresIn,
    });

    return {
      accessToken,
      accessExpiresIn,
      refreshToken,
      refreshExpiresIn,
    };
  }

  public checkToken(
    token: string,
    type: ETokenType,
    role: ERole,
  ): ITokenPayload {
    switch (role) {
      case ERole.ADMIN:
        return this.checkTokenAdmin(token, type);
      case ERole.USER:
        return this.checkTokenUser(token, type);
    }
  }

  private checkTokenAdmin(token: string, type: ETokenType): ITokenPayload {
    try {
      let secret: string;
      switch (type) {
        case ETokenType.Access:
          secret = configs.JWT_ADMIN_ACCESS_SECRET;
          break;
        case ETokenType.Refresh:
          secret = configs.JWT_ADMIN_REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  private checkTokenUser(token: string, type: ETokenType): ITokenPayload {
    try {
      let secret: string;
      switch (type) {
        case ETokenType.Access:
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case ETokenType.Refresh:
          secret = configs.JWT_REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
