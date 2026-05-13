import express, { Request, Response, Application } from 'express'
import "dotenv/config"
import cors from "cors";
class Server {
    private app: Application
    constructor() {
        this.app = express()
    }

    public start(): void {
        this.setupMiddleware()
        this.setupRoute()
        this.listenServer()
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Hello from Gateway Server!')
        })


    }
    private listenServer() {
        const port = process.env.PORT || 5000;

        this.app.listen(port, () => {
            console.log(`Api Gateway is running on port ${port}`)
        })
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
        // this.app.use('/api', appRouter)
        // this.app.use(notFoundHandler);
        // this.app.use(errorHandler);
    }
}
// const server = new Server()
export default Server