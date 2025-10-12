// kafka/consumer.ts
import { kafka } from "./client"; // 👈 Import the shared client

const consumer = kafka.consumer({ groupId: "chat-group-dev" });

export const startConsumer = async () => {
  try {
    await consumer.connect();
    console.log("✅ Kafka Consumer connected");

    await consumer.subscribe({ topic: "chat-messages", fromBeginning: true });
    console.log("📩 Subscribed to topic: chat-messages");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const key = message.key?.toString();
        const value = message.value?.toString();

        console.log(
          `📥 Received message [${topic} | partition ${partition}] key=${key} value=${value}`
        );

        // Example: emit to socket rooms using chatId as room
        // io.to(key).emit("message", JSON.parse(value));
      },
    });
  } catch (err) {
    console.error("❌ Kafka Consumer error:", err);
  }
};
