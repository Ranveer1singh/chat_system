import { Kafka, Producer } from "kafkajs";
let producer: Producer;

export const createProducer = async () => {

  const kafka = new Kafka({
    clientId: "chat-service",
    brokers: [process.env.KAFKA_BROKER || "localhost:9092"], // 👈 use env
  });

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
  console.log("message", message)
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