import mongoose from "mongoose";
const mongodbConnectionURI: string = String(process.env.MONGODB_CONNECTION_URI);
mongoose
  .connect(mongodbConnectionURI)
  .then(() => {
    console.log(`__ Auth service mongodb connected __`);
  })
  .catch((err) => {
    console.log(`__ Error occured while mongodb connection ${err} __`);
  });
