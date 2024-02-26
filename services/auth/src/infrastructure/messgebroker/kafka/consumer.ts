import { consumer } from ".";
import { AuthInteractor } from "../../../interactors/userInteractor";
import { AuthRepository } from "../../../repositories/authRepository";
import { UserUnblockAction } from "./consumer_actions/userBlock.consumer";

export const watchKafkaConsumer = async () => {
  try {
    consumer.connect(); // -> Connecting consumer

    await consumer.subscribe({
      topic: "user-service-topic",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log("🚀 @@@ Auth @#", message);
        const { key, value } = message;

        // injecting dependencies
        const repository = new AuthRepository();
        const interactor = new AuthInteractor(repository);
        const userBlockAction = new UserUnblockAction(interactor);

        // await userBlockAction.blockAction({ _id:value._id });
        // console.log(JSON.parse(value?.toString('utf-8')??""),' **');
        
        switch (key?.toString()) {
          case "blockunblock_user":
            const data = JSON.parse(value?.toString("utf8") ?? "");
            await userBlockAction.blockAction(data);
            break;
        }
      },
    });
  } catch (error: Error | any) {
    console.log(`Something went wrong -> Kafka consuemr ${error.message}`);
  }
};

export const stopConsumer = async () => {
  await consumer.stop()
  await consumer.disconnect()
};
