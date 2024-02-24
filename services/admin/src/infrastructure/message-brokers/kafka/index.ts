import { Kafka, Producer, Consumer } from "kafkajs";

export const kafka = new Kafka({
  //_ Configuration of kafka
  clientId: String(process.env.KAFKA_CLIENT_ID),
  brokers: [String(process.env.KAFKA_BROKER_URL)],
});

export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({
  groupId: "admin-service-kafka-group",
});
