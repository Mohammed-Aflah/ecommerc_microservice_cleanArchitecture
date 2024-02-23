import { consumer } from ".";

export const watchKafkaConsumer = async () => {
  try {
    await consumer.connect();

    await consumer.subscribe({
      topic: "product-service-topic",
      fromBeginning: true,
    });

    // const subscriber=crea

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log("🚀 ~ eachMessage:async ~ message:", message);
      },
    });
  } catch (error: any | Error) {
    console.log(error);
  }
};

export default async function shutDownConsumer() {
  await consumer.stop();
  await consumer.disconnect();
}
    