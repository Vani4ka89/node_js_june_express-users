import { Router } from "express";

import { authController } from "../controllers";
import { ERole } from "../enums";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { ILogin } from "../types";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/admin/sign-up",
  // commonMiddleware.isBodyValid(UserValidator.create),
  // userMiddleware.findAndThrow("email"),
  authController.signUpAdmin,
);

router.post(
  "/admin/sign-in",
  commonMiddleware.isBodyValid(UserValidator.login),
  userMiddleware.isUserExist<ILogin>("email"),
  authController.signInAdmin,
);

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
  authMiddleware.checkRefreshToken(ERole.USER),
  authController.refresh,
);

export const authRouter = router;
