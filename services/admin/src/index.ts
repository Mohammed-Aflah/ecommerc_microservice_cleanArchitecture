import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import "./infrastructure/databases/mongodb/mongo.config";
import productRouter from "./routers/productRouter";
import userRouter from "./routers/userRoute";
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/product", productRouter);
app.use("/user", userRouter);

app.listen(process.env.ADMIN_SERVICE_PORT, () =>
  console.log(
    `Admin service started on port = ${process.env.ADMIN_SERVICE_PORT}`
  )
);
