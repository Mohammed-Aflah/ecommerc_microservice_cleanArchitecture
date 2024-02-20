import mongoose from "mongoose";
const mongodbUri: string = process.env.USER_MONGODB_URI ?? "";
mongoose
  .connect(mongodbUri)
  .then((res) => {
    console.log(`User service db connected`);
  })
  .catch((err) => {
    console.log(`User service db error ${err.message}`);
  });
