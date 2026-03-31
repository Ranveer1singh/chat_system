import "dotenv/config";
import express, { Request, Response } from "express";
import { createServer } from "http";
import { startConsumer } from "./kafka/consumer";
import { initSocket } from "./socket";

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3002;
initSocket(httpServer);
httpServer.listen(PORT, async () => {
  console.log(`🚀 Socket service running on port ${PORT}`);

  // Initialize Socket.io
  
  app.get("/",(req: Request, res : Response)=>{
    res.send("hello")
  })
  // Start Kafka Consumer
  try {
    await startConsumer();
  } catch (err) {
    console.error("❌ Kafka consumer failed:", err);
  }
});
