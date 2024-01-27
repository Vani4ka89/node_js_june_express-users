import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./configs";
import { ApiError } from "./errors";
import { adminRouter, authRouter, usersRouter } from "./routers";

const app = express();
const PORT = configs.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

app.use("*", (err: ApiError, req: Request, res: Response) => {
  const status = err.status || 500;
  res.json({
    message: err.message,
    status: status,
  });
});

app.listen(PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  console.log(`Server started on port ${PORT}`);
});
