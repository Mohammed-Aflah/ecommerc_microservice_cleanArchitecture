import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    status: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model(process.env.USER_MODEL || "User", userModel);
