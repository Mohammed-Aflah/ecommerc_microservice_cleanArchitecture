import { consumer } from ".";
import { ProductInteractor } from "../../../interactors/productInteractor";
import { ProductRepository } from "../../../repositories/productRepository";
import { AddProductConsumerActions } from "./consumer_actions/productConsumers";

export const watchKafkaConsumer = async () => {
  try {
    await consumer.connect();

    await consumer.subscribe({
      topic: "product-service-topic",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const { key, value } = message;
        const repository = new ProductRepository();
        const interactor = new ProductInteractor(repository);
        const consumerActions = new AddProductConsumerActions(interactor);
        switch (JSON.parse(JSON.stringify(message.key?.toString()))) {
          case "create_product":
            await consumerActions.addProduct(
              JSON.parse(value?.toString("utf-8") ?? "")
            );
            break;
          case "update_product":
            const data = JSON.parse(value?.toString("utf-8") ?? "");
            await consumerActions.updateProduct(
              data?.id,
              JSON.parse(data.body)
            );
            break;
          case "delete_product":
            const productData=JSON.parse(value?.toString('utf-8')??"")
            await consumerActions.deleteProductAction(productData._id)
        }
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
