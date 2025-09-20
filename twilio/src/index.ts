import express from "express"
import "dotenv/config"
import router from "./routes"
import cors from "cors";
const app = express()
app.use(cors({
    origin: "http://localhost:5173", // allow requests from React dev server
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use('/api', router)

const PORT = 3003
app.listen(PORT, () => {
    console.log("hello from twilio server port 3003")
})