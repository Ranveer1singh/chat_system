import { Router } from "express";
import userRouter from "./user.routes";

const appRouter = Router();

// Create user
appRouter.use("/user", userRouter);



export default appRouter;
