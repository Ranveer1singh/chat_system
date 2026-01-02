// kafka/consumer.ts
import { getIO } from "../socket";
import { kafka } from "./client"; // 👈 Import the shared client

const consumer = kafka.consumer({ groupId: "chat-group-dev" });

export const startConsumer = async () => {
  try {
    await consumer.connect();
    console.log("✅ Kafka Consumer connected");

    await consumer.subscribe({ topic: "chat-service", fromBeginning: true });
    console.log("📩 Subscribed to topic: chat-messages");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const key = message.key?.toString();
        const value = message.value?.toString();
  if (!value) return;

        const parsedMessage = JSON.parse(value);

        console.log(
          `📥 Received message [${topic} | partition ${partition}] key=${key} value=${value}`
        );

        // Example: emit to socket rooms using chatId as room
        const io = getIO();
        if(!io) throw new Error("socket not initialize")
        io.to(parsedMessage.chatId).emit(topic, parsedMessage);
      },
    });
  } catch (err) {
    console.error("❌ Kafka Consumer error:", err);
  }
};
