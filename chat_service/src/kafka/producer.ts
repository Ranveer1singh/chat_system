import { Kafka, Producer } from "kafkajs";

let producer: Producer;

export const createProducer = async () => {
        console.log(process.env.KAFKA_BROKER,"process.env.KAFKA_BROKER")

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
