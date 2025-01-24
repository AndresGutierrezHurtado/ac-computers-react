import { Router } from "express";
import userController from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.get("/users", userController.getUsers);
userRoutes.get("/users/:id", userController.getUser);
userRoutes.post("/users", userController.createUser);
userRoutes.put("/users/:id", userController.updateUser);
userRoutes.delete("/users/:id", userController.deleteUser)

// auth routes
userRoutes.get("/auth/session", userController.verifyUserSession);
userRoutes.post("/auth/login", userController.authUser);
userRoutes.post("/auth/logout", userController.logoutUser);

// user Feedback routes
userRoutes.post("/user/feedback", userController.sendFeedback);

export default userRoutes;