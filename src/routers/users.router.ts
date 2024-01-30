import { Router } from "express";

import { usersController } from "../controllers";
import { ERole } from "../enums";
import { authMiddleware, commonMiddleware } from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.get("/", usersController.getAll);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken(ERole.USER),
  usersController.getById,
);

router.put(
  "/:userId",
  commonMiddleware.isBodyValid(UserValidator.update),
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken(ERole.USER),
  usersController.updateById,
);

router.delete(
  "/:userId",
  // commonMiddleware.isIdValid("userId"),
  // authMiddleware.checkAccessToken(ERole.USER),
  usersController.deleteById,
);

export const usersRouter = router;
