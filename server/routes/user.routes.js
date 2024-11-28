import { Router } from "express";
import userController from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.get("/users", userController.getUsers);
userRoutes.get("/users/:id", userController.getUser);
userRoutes.post("/users", userController.createUser);
userRoutes.put("/users/:id", userController.updateUser);

export default userRoutes;