import { Router } from "express";
import { userController } from "../controllers/user.controller";

const userRouter = Router();

// Create user
userRouter.post("/", (req, res) => userController.create(req, res));

// Update user
userRouter.put("/:id", (req, res) => userController.update(req, res));

// List all users
userRouter.get("/", (req, res) => userController.list(req, res));

// Get user by ID
userRouter.get("/:id", (req, res) => userController.getById(req, res));

export default userRouter;
