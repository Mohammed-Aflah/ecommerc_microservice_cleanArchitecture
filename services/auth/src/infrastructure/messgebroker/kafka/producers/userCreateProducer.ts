import { producer } from "..";
import { Auth } from "../../../../entities/Auth";

export const userCreateProducer = async (data: Auth) => {
    try {
      console.log("🚀 ~ userCreateProducer ~ data:", data)
    await producer.connect();
    const messages = [
      {
        topic: "user-service-topic",
        messages: [
          {
            key: "create_user",
            value: JSON.stringify(data),
          },
        ],
      },
    ];
    producer.sendBatch({ topicMessages: messages });
  } catch (error) {
    console.log(`Error in user create producer ${error}`);
  } finally {
    producer.disconnect();
  }
};
