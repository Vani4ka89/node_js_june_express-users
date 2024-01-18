import { Router } from "express";

import { usersController } from "../controllers";
import { commonMiddleware } from "../middlewares";

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
  commonMiddleware.isIdValid("userId"),
  usersController.updateById,
);

// router.patch(
//   "/:userId",
//   commonMiddleware.isIdValid("userId"),
//   usersController.partialUpdateById,
// );

router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  usersController.deleteById,
);

export const usersRouter = router;
