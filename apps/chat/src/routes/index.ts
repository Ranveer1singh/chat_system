import { Router } from "express";
import chatRoute from "./chatroutes";
import messageRoute from "./messageroutes";

const appRouter = Router();

// Create user
appRouter.use("/chat", chatRoute);
appRouter.use("/message", messageRoute);



export default appRouter;
