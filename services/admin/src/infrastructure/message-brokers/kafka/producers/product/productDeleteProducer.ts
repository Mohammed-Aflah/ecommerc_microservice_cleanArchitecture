import { producer } from "../..";

export const productDeleteProducer = async (productId: string) => {
  try {
    await producer.connect();
    const messsages = [
      {
        topic: "product-service-topic",
        messages: [
          {
            key: "delete_product",
            value: JSON.stringify({ _id: productId }),
          },
        ],
      },
    ];

    await producer.sendBatch({ topicMessages: messsages });
  } catch (error) {
    console.log(`Error in delete product consumer ${error}`);
  } finally {
    await producer.disconnect();
  }
};
