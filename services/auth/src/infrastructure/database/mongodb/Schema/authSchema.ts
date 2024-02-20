import mongoose from "mongoose";

const authModel = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  name: String,
});
const modelName = String(process.env.AUTH_MODEL);
export default mongoose.model(modelName, authModel);
