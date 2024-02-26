import mongoose from "mongoose";

const CartModel = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId },
  products: [
    {
      productId: mongoose.Types.ObjectId,
      qty: Number,
    },
  ],
});

export default mongoose.model(String(process.env.CART_MODEL), CartModel);
