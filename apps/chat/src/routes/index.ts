import { Router } from "express";
import chatRoute from "./chatroutes";
import messageRoute from "./messageroutes";
import { authenticate } from "../middleware/authenticate";

const appRouter = Router();

appRouter.use(authenticate);
appRouter.use("/chat", chatRoute);
appRouter.use("/message", messageRoute);



export default appRouter;
