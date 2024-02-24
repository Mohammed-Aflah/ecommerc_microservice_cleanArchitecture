import mongoose from "mongoose";

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
    // unique:[true,'Product name must be unique'],
  },
  status: {type:Boolean,default:true},
  images: [String],
});

export default mongoose.model(String(process.env.PRODUCT_MODEL), ProductModel);
