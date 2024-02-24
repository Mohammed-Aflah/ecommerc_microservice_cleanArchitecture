import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import './infrastructure/database/mongodb/config'
import productRouter from "./routers/productRouter";
import shutDownConsumer, { watchKafkaConsumer } from "./infrastructure/messageborkers/kafka/consumer";
const app = express();
app.use(express.json());

app.use(cookieParser());


(async()=>{
  await watchKafkaConsumer()
  process.on("SIGTERM",async()=>{
    await shutDownConsumer()
  })
})()

app.use('/',productRouter)


app.listen(process.env.PRODUCT_SERVICE_PORT, () => {
  console.log(
    `Product service started at port = ${process.env.PRODUCT_SERVICE_PORT}`
  );
});
