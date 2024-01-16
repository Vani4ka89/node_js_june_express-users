import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { usersService } from "../services/users.service";

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
      const id = Number(req.params.id);
      const user = await usersService.getById(id);
      return res.json({ data: user });
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
      const newUser = await usersService.create(req.body);
      return res.json({ data: newUser });
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
      const id = Number(req.params.id);
      const updatedUser = await usersService.updateById(id, req.body);
      return res.json({ data: updatedUser });
    } catch (e) {
      next(e);
    }
  }

  public async partialUpdateById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const id = Number(req.params.id);
      const updatedUser = await usersService.partialUpdateById(id, req.body);
      return res.status(201).json({ data: updatedUser });
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const id = Number(req.params.id);
      await usersService.deleteById(id);
      return res.status(204).json({ message: "User deleted" });
    } catch (e) {
      next(e);
    }
  }
}

export const usersController = new UsersController();
