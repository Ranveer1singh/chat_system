// producer.ts
import { Producer } from "kafkajs";
import { kafka } from "./client";

let producer: Producer;

export const createProducer = async () => {
  producer = kafka.producer();
  await producer.connect();
  console.log("✅ Kafka Producer connected");
  return producer;
};

export const getProducer = () => {
  if (!producer) throw new Error("Producer not initialized");
  return producer;
};

export const produceChatMessage = async (message: {
  messageId: string;
  chatId: string;
  senderId: string;
  type: string;
  content?: string;
  attachments?: any[];
  createdAt?: Date;
}) => {
  console.log("message", message);
  const prod = getProducer();
  await prod.send({
    topic: "chat-messages",
    messages: [
      {
        key: message.chatId.toString(),
        value: JSON.stringify(message),
      },
    ],
  });
  console.log(`📤 Message ${message.messageId} sent to Kafka`);
};
