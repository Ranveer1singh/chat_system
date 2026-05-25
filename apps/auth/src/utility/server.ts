import express, { Application } from "express";
import dbConnnection from "./db"
import appRouter from "../routes";
import "dotenv/config"
import cors from "cors";
import { errorHandler, notFoundHandler } from "../middelwares/errorHandler";

dbConnnection();

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
        this.app.use(cors(
            {
                origin: ["http://localhost:5173", "http://192.168.1.88:5173"],
                methods: ["GET", "POST", "PUT", "DELETE"],
                credentials: true
            }
        ))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(cookieParser())
    }
    private setupRoute(): void {
        this.app.get('/health', (req, res) => {
            res.status(200).json({ status: 'ok' });
        });
        this.app.use('/api', appRouter)
        this.app.use(notFoundHandler);
        this.app.use(errorHandler);
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
