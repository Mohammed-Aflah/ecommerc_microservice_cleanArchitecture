import { producer } from "../..";

export const productCreateProducer = async (data: {
  _id: string;
  description: string;
  quantity: number;
  price: number;
  productName: string;
  status: boolean;
}) => {
  try {
    await producer.connect();

    const messages = [
      {
        topic: "product-service-topic",
        messages: [
          {
            key: "create_product",
            value: JSON.stringify(data),
          },
        ],
      },
      {
        topic: "cart-service-topic",
        messages: [
          {
            key: "create_product",
            value: JSON.stringify(data),
          },
        ],
      },
    ];

    await producer.sendBatch({topicMessages:messages})
  } catch (error:any|Error) {
    console.error('kafka produce error : ', error?.message);
  }finally{
    await producer.disconnect()
  }
};
