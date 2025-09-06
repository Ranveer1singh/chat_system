import express from "express";
import db from "./utils/db"
const app = express();
db()

const port = 3001;

app.listen(port, ()=>{
    console.log("chat_service is running on 3001")
})