import { Router } from "express";

import { authController } from "../controllers";

const router = Router();

router.post("/sign-up", authController.signUp);

export const authRouter = router;
