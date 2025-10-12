import "dotenv/config"
import express from "express";
import { createServer } from "http";
import { startConsumer } from "./kafka/consumer";
import { initSocket } from "./socket";
import { error } from "console";

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT
httpServer.listen(PORT, async () => {
  console.log(`🚀 Socket service running on ${PORT}`);

  initSocket(httpServer);

  try {
    await startConsumer().catch(console.error);
  } catch (err) {
    console.error("❌ Kafka consumer failed:", err);
  }
});
