import express, { Request, Response } from "express";
import dbConnnection from "./utils/db"
const app = express();
dbConnnection();
const Port = 3000

app.get("/", (req : Request, res : Response)=>{
    return res.json({
        message : "Here i set up and install basic dependency"
    })
})

app.listen(Port , ()=>{
    console.log("server is running on port 3000s")
})