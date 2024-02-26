import mongoose from "mongoose";

mongoose
  .connect(String(process.env.CART_SERVICE_MONGODB_URI))
  .then(() => {
    console.log(`Cart Service db connected`);
  })
  .catch((err) => {
    console.log(`Error found in cart db connection ${err}`);
  });
