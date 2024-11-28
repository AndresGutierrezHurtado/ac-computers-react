import { Router } from "express";
import userController from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.get("/users", userController.getUsers);
userRoutes.get("/users/:id", userController.getUser);
userRoutes.post("/users", userController.createUser);
userRoutes.put("/users/:id", userController.updateUser);

// auth routes
userRoutes.get("/user/auth/verify", userController.verifyUserSession);
userRoutes.post("/user/login", userController.authUser);
userRoutes.post("/user/logout", userController.logoutUser);

export default userRoutes;