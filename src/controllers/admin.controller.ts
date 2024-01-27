import { NextFunction, Request, Response } from "express";

import { IUser } from "../types";

class AdminController {
  public async getAdmins(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> {
    try {
      const admins = [];
      return res.status(200).json({ data: admins });
    } catch (e) {
      next(e);
    }
  }
}

export const adminController = new AdminController();
