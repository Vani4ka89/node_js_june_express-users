import { Router } from "express";

import { authController } from "../controllers";
import { authMiddleware, commonMiddleware } from "../middlewares";
import { userMiddleware } from "../middlewares/user.middleware";
import { ILogin } from "../types";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.isBodyValid(UserValidator.create),
  userMiddleware.findAndThrow("email"),
  authController.signUp,
);

router.post(
  "/sign-in",
  commonMiddleware.isBodyValid(UserValidator.login),
  userMiddleware.isUserExist<ILogin>("email"),
  authController.signIn,
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

export const authRouter = router;
