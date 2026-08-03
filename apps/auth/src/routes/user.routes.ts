import { Router } from "express";
import { userController } from "../controller/user.controller";
import { Authenticate } from "../middelwares/commonAuth";
import { loginRateLimit } from "../middelwares/loginRateLimit";
import { authorizeSelfOrAdmin } from "../middelwares/authorizeUser";

const userRouter = Router();

// Create user
userRouter.post("/", loginRateLimit, userController.create);
userRouter.post("/signIn", loginRateLimit, userController.login);
userRouter.post("/logout", userController.logout);
userRouter.use(Authenticate)
userRouter.get("/me", userController.loginUser);

// Update user
userRouter.put("/:id", authorizeSelfOrAdmin, userController.update);

// List all users
userRouter.get("/allUser", userController.list);

// Get user by ID
userRouter.get("/:id", authorizeSelfOrAdmin, userController.getById);

export default userRouter;
