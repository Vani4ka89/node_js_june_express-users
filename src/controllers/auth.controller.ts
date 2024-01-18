import { NextFunction, Request, Response } from "express";

import { authService } from "../services";
import { IUser } from "../types";

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
}

export const authController = new AuthController();
