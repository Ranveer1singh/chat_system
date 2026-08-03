import express, { Application, Request, Response } from "express";
import morgan from "morgan"
import dbConnnection from "./db"
import appRouter from "../routes";
import { createProducer } from "../kafka/producer";
const app = express();
dbConnnection();

class Server{
    private app : Application
    constructor(){
        this.app = express()
    }
    public async start():Promise<void>{
        this.app.use(morgan('dev'))
       this.setupMiddleware();
       this.setupRoute();
       this.listenServer()
       await createProducer();

    }
       private setupMiddleware():void{
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(cookieParser())
    }
     private setupRoute():void{
       this.app.use('/api',appRouter)
    }
       private  listenServer(){
        const port = process.env.PORT || 5001;
        
        this.app.listen(port , ()=>{
            console.log(`connected to Chat server with port ${port}`)
        })
    }
}
// export const server = new Server;
export default Server
