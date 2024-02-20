import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import "./infrastructure/database/mongodb/mongodbConfig";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routers/authRouters";
const app: Application = express();
const PORT: number = Number(process.env.AUTH_PORT);
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`Auth Service started on port -> ${PORT}`);
});
