import { Router } from "express";
import { userController } from "../controller/user.controller";
import { Authenticate } from "../middelwares/commonAuth";

const userRouter = Router();

// Create user
userRouter.post("/", userController.create);
userRouter.post("/signIn", userController.login);
userRouter.use(Authenticate)
userRouter.get("/me", userController.loginUser);

// Update user
userRouter.put("/:id", userController.update);

// List all users
userRouter.get("/allUser", userController.list);

// Get user by ID
userRouter.get("/:id", userController.getById);

export default userRouter;
