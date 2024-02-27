import dotenv from "dotenv";
import express from "express";
dotenv.config();
import "./infrstructure/databases/mongodb/config";
import { cartRouter } from "./routers/cartRouter";
///
import {
  stopConsumer,
  watchKafkaConsumer,
} from "./infrstructure/messagebroker/kafka/consumer";
const app = express();
(async () => {
  watchKafkaConsumer();
  process.on("SIGTERM", async () => {
    stopConsumer();
  });
})();
app.use(express.json())
app.use(require('cookie-parser')())

app.use("/", cartRouter);

// for CIDCD
app.listen(process.env.CART_SERVICE_PORT, () =>
  console.log(`Cart service started on port ${process.env.CART_SERVICE_PORT}`)
);
