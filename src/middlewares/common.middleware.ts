import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
  public isIdValid(field: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.params[field];
        if (!isObjectIdOrHexString(userId)) {
          throw new ApiError("Wrong ID param", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isBodyValid(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error, value } = validator.validate(req.body);
        if (error) {
          throw new ApiError(error.message, 400);
        }
        req.body = value;
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
