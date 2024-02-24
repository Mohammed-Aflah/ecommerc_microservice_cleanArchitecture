import { consumer } from ".";

export const watchKafkaConsumer = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: "admin-service-topic",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(`Message in admin service
                ${message}`);
      },
    });
  } catch (error) {
    console.log(`Error in kafka watchconsumer method`);
  }
};




export const stopConsumer=async()=>{
    await consumer.stop()
    await consumer.disconnect()
}