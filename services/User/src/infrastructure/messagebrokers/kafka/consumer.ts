import { consumer } from ".";
import { UsreInteractor } from "../../../interactors/UserInteractor";
import { UserRepository } from "../../../repositories/userRepository";
import { UserConsumerActions } from "./consumers/allConsumers";

export const watchKafkaConsumer = async () => {
  try {
    console.log("Consumer Running");

    consumer.connect();

    await consumer.subscribe({
      topic: "user-service-topic",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log("🚀 ~ eachMessage: ~ message:", message);

        let { key, value } = message;
        const repository = new UserRepository();
        const interactor = new UsreInteractor(repository);
        const consumerActions = new UserConsumerActions(interactor);

        switch (key?.toString("utf-8")) {
          case "create_user":
            const data = JSON.parse(value?.toString("utf-8") ?? "");
            await consumerActions.createUserAction(data);
            break;
          case "blockunblock_user":
            const blockDetails = JSON.parse(value?.toString("utf-8") ?? "");
            await consumerActions.blockAndUnblock(blockDetails);
            break;
        }
      },
    });
  } catch (error) {
    console.log(`Error found in kafka consumer fn ${error}`);
  }
};

export const stopConsumer = async () => {
  await consumer.stop();
  await consumer.disconnect();
};
