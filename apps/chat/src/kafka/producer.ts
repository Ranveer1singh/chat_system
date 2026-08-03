// producer.ts
import { Producer } from "kafkajs";
import { kafka } from "./client";
import { Types } from "mongoose";

let producer: Producer;

export const createProducer = async () => {
  producer = kafka.producer();
  await producer.connect();
  console.log("Kafka Producer connected");
  return producer;
};

export const getProducer = () => {
  if (!producer) throw new Error("Producer not initialized");
  return producer;
};

export const sendMessage = async (message: {
  messageId: string;
  chatId: string;
  senderId: string;
  type: string;
  content?: string;
  attachments?: any[];
  createdAt?: Date;
}) => {
  // console.log("message", message);
  const prod = getProducer();
  await prod.send({
    topic: "send-messages",
    messages: [
      {
        key: message.chatId.toString(),
        value: JSON.stringify(message),
      },
    ],
  });
  console.log(`📤 Message ${message.messageId} sent to Kafka`);
};
export const chatCreated = async (message:
  {
    type: string;
    participants: Types.ObjectId[];
    name?: string;
    admins?: string[];
    createdBy: string;
  }) => {
  const prod = getProducer();
  await prod.send({
    topic: "chat-created",
    messages: [
      {
        key: message.createdBy,
        value: JSON.stringify(message),
      }
    ]
  });
  console.log(`📤 Chat ${message.name} created`);
};

export const getMessagesByChat = async(chatId:string, messages : any[])=>{
  const prod = getProducer();
  await prod.send({
    topic: "get-messages-by-chat",
    messages: [
      {
        key: chatId,
        value: JSON.stringify(messages),
      }
    ]
  });
  console.log(`📤 Messages for chat ${chatId} sent to Kafka`);
}
