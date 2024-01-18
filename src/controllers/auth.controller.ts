import { NextFunction, Request, Response } from "express";

import { authService } from "../services";
import { ITokenPair, IUser } from "../types";
import { ILogin } from "../types";

class AuthController {
  public async signUp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const body = req.body as Partial<IUser>;
      const newUser = await authService.signUp(body);
      return res.json({ data: newUser });
    } catch (e) {
      next(e);
    }
  }

  public async signIn(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokenPair>> {
    try {
      const body = req.body as ILogin;
      const jwtTokens = await authService.signIn(body);
      return res.json({ data: jwtTokens });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
