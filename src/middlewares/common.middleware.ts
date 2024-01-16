import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
  public isIdValid(field: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = Number(req.params[field]);
        if (!Number.isInteger(userId)) {
          throw new ApiError("Wrong ID param", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isBodyValid() {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
