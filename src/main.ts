import express, { Request, Response } from "express";

import { configs } from "./configs/configs";
import { ApiError } from "./errors/api.error";
import { usersRouter } from "./routers/users.router";

const app = express();
const PORT = configs.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);

app.use("*", (err: ApiError, req: Request, res: Response) => {
  const status = err.status || 500;
  res.json({
    message: err.message,
    status: status,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
