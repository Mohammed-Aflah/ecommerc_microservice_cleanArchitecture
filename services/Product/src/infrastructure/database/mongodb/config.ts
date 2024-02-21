import mongoose from "mongoose";

mongoose
  .connect(String(process.env.PRODUCT_SERVICE_MONGODB_URI))
  .then(() => {
    console.log(` __Product service mongodb connected__ `.trim());
  })
  .catch((err) => {
    console.log(`Error during database connection - ${err}`);
  });
