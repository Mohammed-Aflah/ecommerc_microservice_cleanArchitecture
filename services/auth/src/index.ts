import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import "./infrastructure/database/mongodb/mongodbConfig";
// import './infrastructure/messgebroker/kafka/index'
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routers/authRouters";
import { watchKafkaConsumer } from "./infrastructure/messgebroker/kafka/consumer";
const app: Application = express();
const PORT: number = Number(process.env.AUTH_PORT);
app.use(express.json());
app.use(cookieParser());
app.use(cors());
(async()=>{
    await watchKafkaConsumer()
})()

app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`Auth Service started on port -> ${PORT}`);
});
