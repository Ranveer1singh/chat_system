import express, { Request, Response, Application } from 'express'
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import "dotenv/config"
import { IncomingMessage, ServerResponse } from "http";
import { Socket } from "net";
import cors from "cors";
class Server {
    private app: Application
    private authServiceUrl: string
    private chatServiceUrl: string
    constructor() {
        this.app = express()
        this.authServiceUrl = process.env.AUTH_SERVICE_URL || "http://localhost:8080"
        this.chatServiceUrl = process.env.CHAT_SERVICE_URL || "http://localhost:5002"
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
            console.log(`Auth service target: ${this.authServiceUrl}`)
            console.log(`Chat service target: ${this.chatServiceUrl}`)
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
        // this.app.use(express.json())
        // this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(cookieParser())
    }
    private setupRoute(): void {
        console.log("Setting up proxy routes...");
        this.app.use(
            "/api/user",
            createProxyMiddleware({
                target: this.authServiceUrl,
                changeOrigin: true,
                on: {
                    // proxyReq: fixRequestBody,
                    error: (err: Error, req: IncomingMessage, res: ServerResponse<IncomingMessage> | Socket) => {
                        console.error(`[Gateway] Auth proxy error for ${req.method} ${req.url}:`, err.message)
                        if ("writeHead" in res) {
                            if (!res.headersSent) {
                                res.writeHead(502, { "Content-Type": "application/json" })
                            }
                            res.end(JSON.stringify({ message: "Auth service unavailable" }))
                        }
                    }
                }
            })
        );
        this.app.use(
            "/api/chat",
            createProxyMiddleware({
                target: this.chatServiceUrl,
                changeOrigin: true,
                on: {
                    proxyReq: fixRequestBody,
                    error: (err: Error, req: IncomingMessage, res: ServerResponse<IncomingMessage> | Socket) => {
                        console.error(`[Gateway] Chat proxy error for ${req.method} ${req.url}:`, err.message)
                        if ("writeHead" in res) {
                            if (!res.headersSent) {
                                res.writeHead(502, { "Content-Type": "application/json" })
                            }
                            res.end(JSON.stringify({ message: "Chat service unavailable" }))
                        }
                    }
                }
            })
        );
    }
}
export default Server
