import express from "express"
import {startConsumer } from "./kafka/consumer"
const app = express()


app.listen(3002,async ()=>{
await startConsumer()
    console.log("socket is running on 3002")
})