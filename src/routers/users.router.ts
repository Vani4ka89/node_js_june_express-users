import { Router } from "express";

import { usersController } from "../controllers";
import { ERole } from "../enums";
import { authMiddleware, commonMiddleware } from "../middlewares";
// import { UserValidator } from "../validators";

const router = Router();

router.get("/", usersController.getAll);

router.get(
  "/me",
  authMiddleware.checkAccessToken(ERole.USER),
  usersController.getMe,
);

router.put(
  "/me",
  // commonMiddleware.isBodyValid(UserValidator.update),
  authMiddleware.checkAccessToken(ERole.USER),
  usersController.updateMe,
);

router.delete(
  "/me",
  authMiddleware.checkAccessToken(ERole.USER),
  usersController.deleteMe,
);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  // authMiddleware.checkAccessToken(ERole.USER),
  usersController.getById,
);

export const usersRouter = router;
