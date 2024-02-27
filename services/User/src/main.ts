import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import "./infrastructure/mongodb/dbConnection";
import userRouter from "./routers/userRouter";
import errorHandler from "./middlwares/error/errorHandler";
import {
  stopConsumer,
  watchKafkaConsumer,
} from "./infrastructure/messagebrokers/kafka/consumer";
const app: Application = express();
app.use(express.json());

(async () => {
  watchKafkaConsumer();
  process.on("SIGTERM", async () => {
    stopConsumer();
  });
})();
app.use(errorHandler);
app.use("/", userRouter);

// for CIDCD

app.listen(process.env.USER_SERVICE_PORT, () =>
  console.log(`User service started ${process.env.USER_SERVICE_PORT}`)
);
