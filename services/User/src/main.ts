import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import "./infrastructure/mongodb/dbConnection";
import userRouter from "./routers/userRouter";
import errorHandler from "./middlwares/error/errorHandler";
const app: Application = express();
app.use(express.json());

app.use(errorHandler)
app.use("/", userRouter);

app.listen(process.env.USER_SERVICE_PORT, () =>
  console.log(`User service started ${process.env.USER_SERVICE_PORT}`)
);
