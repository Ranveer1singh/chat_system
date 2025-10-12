// kafka/kafkaClient.ts
import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "socket-service", // Or parametrize it if used by multiple services
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});
