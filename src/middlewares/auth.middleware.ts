import { NextFunction, Request, Response } from "express";

import { ERole, ETokenType } from "../enums";
// import { EActionTokenTypes, ETokenType } from "../enums";
import { ApiError } from "../errors";
// import { Action, Token } from "../models";
import { tokenRepository } from "../repositories";
import { tokenService } from "../services";

class AuthMiddleware {
  public checkAccessToken(role: ERole) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const tokenString = req.get("Authorization");
        if (!tokenString) {
          throw new ApiError("No token", 401);
        }
        const accessToken = tokenString.split("Bearer ")[1];
        const payload = tokenService.checkToken(
          accessToken,
          ETokenType.Access,
          role,
        );
        const entity = await tokenRepository.getOneByParams({ accessToken });
        if (!entity) {
          throw new ApiError("Token not valid", 401);
        }
        req.res.locals.oldTokenPair = entity;
        req.res.locals.jwtPayload = { _userId: payload._userId };
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public checkRefreshToken(role: ERole) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const tokenString = req.get("Authorization");
        if (!tokenString) {
          throw new ApiError("No token", 401);
        }
        const refreshToken = tokenString.split("Bearer ")[1];
        const payload = tokenService.checkToken(
          refreshToken,
          ETokenType.Refresh,
          role,
        );
        const entity = await tokenRepository.getOneByParams({ refreshToken });
        if (!entity) {
          throw new ApiError("Token not valid", 401);
        }
        req.res.locals.refreshToken = entity.refreshToken;
        req.res.locals.jwtPayload = { _userId: payload._userId };
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  // public checkActionToken(tokenType: EActionTokenTypes) {
  //     return async (req: Request, res: Response, next: NextFunction) => {
  //         try {
  //             const actionToken = req.params.token;
  //             if (!actionToken) {
  //                 throw new ApiError("Token is not provided", 400);
  //             }
  //             const jwtPayload = tokenService.checkActionToken(
  //                 actionToken,
  //                 tokenType
  //             );
  //             const tokenFromDb = await Action.findOne({ actionToken });
  //             if (!tokenFromDb) {
  //                 throw new ApiError("Token is not valid", 400);
  //             }
  //             req.res.locals = { jwtPayload, tokenFromDb };
  //             next();
  //         } catch (e) {
  //             next(e);
  //         }
  //     };
  // }
}

export const authMiddleware = new AuthMiddleware();
