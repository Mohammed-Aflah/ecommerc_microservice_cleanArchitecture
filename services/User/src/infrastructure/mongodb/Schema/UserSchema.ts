import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    status: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model(process.env.USER_MODEL || "User", userModel);
