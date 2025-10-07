import { Kafka } from "kafkajs";
// 1. Create Kafka client
const kafka = new Kafka({
  clientId: "socket-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"], // from .env
});

// 2. Create a consumer (give groupId)
const consumer = kafka.consumer({ groupId: "chat-group-dev-" });

export const startConsumer  = async () => {
  // 3. Connect
  await consumer.connect();
  console.log("✅ Kafka Consumer connected 1");

  // 4. Subscribe to topic
  await consumer.subscribe({ topic: "chat-messages", fromBeginning: true });
  console.log("📩 Subscribed to topic: chat-messages");

  // 5. Run consumer loop
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const key = message.key?.toString();
      const value = message.value?.toString();

      console.log(
        `📥 Received message [${topic} | partition ${partition}] key=${key} value=${value}`
      );

      // TODO: here you can emit via socket.io / ws
      // Example: io.to(key /*chatId*/).emit("message", JSON.parse(value));
    },
  });
};

// run().catch(console.error);
