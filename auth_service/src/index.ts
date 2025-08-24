import express, { Request, Response } from "express";
import dbConnnection from "./utils/db"
import appRouter from "./routes";
const app = express();
dbConnnection();
const Port = 3000

app.use('/api', appRouter)


app.listen(Port , ()=>{
    console.log("server is running on port 3000s")
})