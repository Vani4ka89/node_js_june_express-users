import { Router } from "express";

import { usersController } from "../controllers/users.controller";

const router = Router();

router.get("/", usersController.getAll);

router.get("/:id", usersController.getById);

router.post("/", usersController.create);

router.put("/:id", usersController.updateById);

router.patch("/:id", usersController.partialUpdateById);

router.delete("/:id", usersController.deleteById);

export const usersRouter = router;
