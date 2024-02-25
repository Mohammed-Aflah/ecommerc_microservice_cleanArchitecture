import { consumer } from ".";
import { UserInteractor } from "../../../interactor/user/userInteractor";
import { UserRepository } from "../../../repositories/userRepo";
import { UserConsumers } from "./consumer_actions/userConsumers";

export const watchKafkaConsumer = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: "user-service-topic",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(`Message in admin service
                ${message}`);
        const { key, value } = message;
        const repository = new UserRepository();
        const interactor = new UserInteractor(repository);
        const userConsumerActions = new UserConsumers(interactor);
        switch (key?.toString()) {
          case "create_user":
            const data = JSON.parse(value?.toString("utf-8") ?? "");
            userConsumerActions.createUserAction(data);
        }
      },
    });
  } catch (error) {
    console.log(`Error in kafka watchconsumer method`);
  }
};

export const stopConsumer = async () => {
  await consumer.stop();
  await consumer.disconnect();
};
