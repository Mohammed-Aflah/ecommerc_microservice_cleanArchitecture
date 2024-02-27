import { consumer } from ".";
import { ProductConsumerActions } from "./consumer_actions/productConsumers";
import { UserConsumerActions } from "./consumer_actions/userConsumers";

export const watchKafkaConsumer = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: "cart-service-topic",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(`Cart service consumer called`);
        const { key, value } = message;
        console.log("🚀 ~ eachMessage: ~ key:", key?.toString("utf-8"))
        const userConsumerAction = new UserConsumerActions();
        const productConsumerAction = new ProductConsumerActions();
        switch (key?.toString("utf-8")) {
          case "create_user":
            const userData = JSON.parse(value?.toString("utf-8") ?? "");
            await userConsumerAction.createUser(userData);
            break;
          case "blockunblock_user":
            const blockData = JSON.parse(value?.toString("utf-8") ?? "");
            await userConsumerAction.blockUser(blockData);
            break;
          case "create_product":
            const productData = JSON.parse(value?.toString("utf-8") ?? "");
            await productConsumerAction.addProdcut(productData);
            break;

          case "update_product":
            const updationData = JSON.parse(value?.toString("utf-8") ?? "");
            await productConsumerAction.updateProduct(updationData);
            break;

          case "delete_product":
            const deleteData = JSON.parse(value?.toString("utf-8") ?? "");
            await productConsumerAction.deleteProduct(deleteData);
        }
      },
    });
  } catch (error) {
    console.log(`Error found in watchkafka consumer`);
  }
};

export const stopConsumer = async () => {
  await consumer.stop();
  await consumer.disconnect();
};
