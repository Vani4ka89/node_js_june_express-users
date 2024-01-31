import { NextFunction, Request, Response } from "express";

import { authService } from "../services";
import { ITokenPair, ITokenPayload, IUser } from "../types";
import { ILogin } from "../types";

class AuthController {
  public async signUpAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const body = req.body as Partial<IUser>;
      const newUser = await authService.signUpAdmin(body);
      return res.json({ data: newUser });
    } catch (e) {
      next(e);
    }
  }

  public async signInAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokenPair>> {
    try {
      const body = req.body as ILogin;
      const jwtTokens = await authService.signInAdmin(body);
      return res.json({ data: jwtTokens });
    } catch (e) {
      next(e);
    }
  }

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

  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokenPair>> {
    try {
      const refreshToken = req.res.locals.refreshToken as string;
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const jwtTokens = await authService.refresh(refreshToken, jwtPayload);
      return res.json({ data: jwtTokens });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
