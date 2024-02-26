import mongoose from "mongoose";

const AddrssModel = new mongoose.Schema({
  userId:{
    type:mongoose.Types.ObjectId
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  district: {
    type: String,
  },
  mobile: {
    type: String,
  },
  state: {
    type: String,
  },
  building: String,
  street: String,
  status: {
    type: Boolean,
    default: true,
  },
});
export default mongoose.model(String(process.env.ADDRESS_MODEL), AddrssModel);
