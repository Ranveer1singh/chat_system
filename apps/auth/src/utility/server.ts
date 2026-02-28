import express, { Application, Request, Response } from "express";
// import dbConnnection from "./db"
// import appRouter from "../routes";
import "dotenv/config"
// import cors from "cors";

const app = express();
// dbConnnection();

class Server {
    private app: Application
    constructor() {
        this.app = express()

    }
    public start(): void {
        this.setupMiddleware();
        this.setupRoute();
        this.listenServer()

    }
    private setupMiddleware(): void {
        // this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(cookieParser())
    }
    private setupRoute(): void {
        this.app.use('/api', (req: Request, res: Response) => {
            res.send("Auth server is running")
        })
    }
    private listenServer() {
        const port = process.env.PORT || 5000;

        this.app.listen(port, () => {
            console.log(`connected to Auth server with port ${port}`)
        })
    }
}
// export const server = new Server;
export default Server