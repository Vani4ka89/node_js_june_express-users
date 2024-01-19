import { Router } from "express";

import { usersController } from "../controllers";
import { authMiddleware, commonMiddleware } from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.get("/", usersController.getAll);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  usersController.getById,
);

router.post("/", usersController.create);

router.put(
  "/:userId",
  commonMiddleware.isBodyValid(UserValidator.update),
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  usersController.updateById,
);

// router.patch(
//   "/:userId",
//   usersController.partialUpdateById,
// );

router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  usersController.deleteById,
);

export const usersRouter = router;
