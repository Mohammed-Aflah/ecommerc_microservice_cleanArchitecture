import mongoose from "mongoose";

interface IPrductSchem extends mongoose.Document {
  description: string;
  quantity: number;
  price: number;
  productName: string;
  status?: boolean;
  images?: string[];
}
const ProductModel = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  productName: {
    type: String,
    trim: true,
    required: [true, "Product name  is required"],
    // unique:[true,'Product name must be unique'],
  },
  status: { type: Boolean, default: true },
  images: [String],
});

export default mongoose.model<IPrductSchem>(String(process.env.PRODUCT_MODEL)+"H", ProductModel);
