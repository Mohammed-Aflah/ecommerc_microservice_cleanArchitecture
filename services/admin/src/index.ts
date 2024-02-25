import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import "./infrastructure/databases/mongodb/mongo.config";
import productRouter from "./routers/productRouter";
import userRouter from "./routers/userRoute";
import {
  stopConsumer,
  watchKafkaConsumer,
} from "./infrastructure/message-brokers/kafka/consumer";
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/product", productRouter);
app.use("/user", userRouter);

(async () => {
  watchKafkaConsumer();
  process.on("SIGTERM", async () => {
    stopConsumer();
  });
})();

app.listen(process.env.ADMIN_SERVICE_PORT, () =>
  console.log(
    `Admin service started on port = ${process.env.ADMIN_SERVICE_PORT}`
  )
);
