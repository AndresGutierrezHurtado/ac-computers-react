import { Router } from "express";
import userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/users", userController.getUsers);
userRouter.get("/users/:id", userController.getUser);
userRouter.post("/users", userController.createUser);
userRouter.put("/users/:id", userController.updateUser);

export default userRouter;