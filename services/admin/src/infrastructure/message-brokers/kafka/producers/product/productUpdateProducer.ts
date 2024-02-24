import { producer } from "../..";

export const productUpdateProducer = async (
  productId: string,
  body: {
    productName?: string;
    quantity?: number;
    price?: number;
    status?: boolean;
    description?: string;
  }
) => {
  producer
    .connect()
    .then(async () => {
      const messages = [
        {
          topic: "product-service-topic",
          messages: [
            {
              key: "update_product",
              value: JSON.stringify({body:JSON.stringify(body),id:productId}),
            },
          ],
        },
      ];

      await producer.sendBatch({ topicMessages: messages });
    })
    .catch((err) => {
      console.log(`Error in product update consumer ${err}`);
    })
    .finally(async () => {
      await producer.disconnect();
    });
};
