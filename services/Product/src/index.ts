import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import './infrastructure/database/mongodb/config'
import productRouter from "./routers/productRouter";
const app = express();
app.use(express.json());

app.use(cookieParser());


app.use('/',productRouter)

app.listen(process.env.PRODUCT_SERVICE_PORT, () => {
  console.log(
    `Product service started at port = ${process.env.PRODUCER_SERVICE_PORT}`
  );
});
