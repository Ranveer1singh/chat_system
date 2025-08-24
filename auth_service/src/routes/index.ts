import { Router } from "express";
import userRouter from "./user.route";

const appRouter = Router();

// Create user
appRouter.use("/user", userRouter);



export default appRouter;
