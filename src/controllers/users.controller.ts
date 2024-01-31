import { NextFunction, Request, Response } from "express";

import { usersService } from "../services";
import { ITokenPayload, IUser } from "../types";

class UsersController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> {
    try {
      const users = await usersService.getAll();
      return res.status(200).json({ data: users });
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const userId = req.params.userId;
      const user = await usersService.getById(userId);
      return res.status(200).json({ data: user });
    } catch (e) {
      next(e);
    }
  }

  public async getMe(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const user = await usersService.getMe(jwtPayload);
      return res.status(200).json({ data: user });
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const body = req.body as Partial<IUser>;
      const updatedUser = await usersService.updateMe(jwtPayload, body);
      return res.status(200).json({ data: updatedUser });
    } catch (e) {
      next(e);
    }
  }

  public async deleteMe(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      await usersService.deleteMe(jwtPayload);
      return res.status(204).json({ message: "User deleted" });
    } catch (e) {
      next(e);
    }
  }
}

export const usersController = new UsersController();
