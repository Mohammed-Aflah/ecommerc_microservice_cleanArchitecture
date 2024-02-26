import { producer } from "../..";

export const userBlockAndUnblock = async (data: {
  id: string;
  status: boolean;
}) => {
  try {
    await producer.connect();
    const messages = [
      {
        topic: "user-service-topic",
        messages: [
          {
            key: "blockunblock_user",
            value: JSON.stringify(data),
          },
        ],
      },
      {
        topic: "cart-service-topic",
        messages: [
          {
            key: "blockunblock_user",
            value: JSON.stringify(data),
          },
        ],
      },
    ];

    await producer.sendBatch({ topicMessages: messages });
  } catch (error) {
    console.log(`Errors found in user blocking and unblocking producer`);
  } finally {
    await producer.disconnect();
  }
};
