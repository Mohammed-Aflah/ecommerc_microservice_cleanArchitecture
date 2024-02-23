import mongoose from "mongoose";

mongoose
  .connect(String(process.env.ADMIN_SERVICE_MONODB_URI))
  .then(() => {
    console.log(` _Admin Service Database Connected_  `.trim());
  })
  .catch((err) => {
    console.log(` _Admin Service Database Error  ${err}`);
  });
