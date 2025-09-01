import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { Authenticate } from "../middelwares/commonAuth";

const userRouter = Router();

// Create user
userRouter.post("/",  userController.create);
userRouter.post("/signIn",  userController.login);
userRouter.use(Authenticate)
userRouter.get("/me",  userController.loginUser);

// Update user
userRouter.put("/:id", (req, res) => userController.update(req, res));

// List all users
userRouter.get("/", (req, res) => userController.list(req, res));

// Get user by ID
userRouter.get("/:id", (req, res) => userController.getById(req, res));

export default userRouter;
