import { Router } from "express";
import chatRoute from "./chatroutes";

const appRouter = Router();

// Create user
appRouter.use("/chat", chatRoute);



export default appRouter;
