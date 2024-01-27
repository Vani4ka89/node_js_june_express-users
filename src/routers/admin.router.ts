import { Router } from "express";

import { adminController } from "../controllers";
import { ERole } from "../enums";
import { authMiddleware, userMiddleware } from "../middlewares";

const router = Router();

router.get(
  "/list",
  authMiddleware.checkAccessToken(ERole.ADMIN),
  userMiddleware.haveAccessByRole(ERole.ADMIN),
  adminController.getAdmins,
);

export const adminRouter = router;
