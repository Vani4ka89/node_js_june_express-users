import { NextFunction, Request, Response } from "express";

import { usersService } from "../services";
import { IUser } from "../types";

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

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const newUser = await usersService.create(req.body as Partial<IUser>);
      return res.status(201).json({ data: newUser });
    } catch (e) {
      next(e);
    }
  }

  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const userId = req.params.userId;
      const updatedUser = await usersService.updateById(userId, req.body);
      return res.status(200).json({ data: updatedUser });
    } catch (e) {
      next(e);
    }
  }

  // public async partialUpdateById(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ): Promise<Response<IUser>> {
  //   try {
  //     const userId = req.params.userId;
  //     const updatedUser = await usersService.partialUpdateById(
  //       userId,
  //       req.body,
  //     );
  //     return res.status(200).json({ data: updatedUser });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const userId = req.params.userId;
      await usersService.deleteById(userId);
      return res.status(204).json({ message: "User deleted" });
    } catch (e) {
      next(e);
    }
  }
}

export const usersController = new UsersController();
