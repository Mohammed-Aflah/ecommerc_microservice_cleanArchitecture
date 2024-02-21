import { Kafka, Producer, Consumer } from "kafkajs";

const kafka = new Kafka({
  clientId: String(process.env.KAFKA_CLIENT_ID),
  brokers: [String(process.env.KAFKA_BROKER_URL)],
});

// const producer = kafka.producer();

// const sendMessage = async () => {
//   await producer.connect();

//   await producer.send({
//     topic: "my-topic",
//     messages: [{ value: "Testing" }],
//   });

//   await producer.disconnect();
// };

// const consumer = kafka.consumer({ groupId: "my-group" });
// const consumerMessages = async () => {
//   await consumer.connect();
//   await consumer.subscribe({ topic: "my-topic", fromBeginning: true });

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log(message.value?.toString());
//     },
//   });
// };

// sendMessage(); //send a message
// consumerMessages(); //consume messages

export const producer:Producer=kafka.producer()
export const consumer:Consumer=kafka.consumer({
  groupId:"Authentication-service-group"
})
