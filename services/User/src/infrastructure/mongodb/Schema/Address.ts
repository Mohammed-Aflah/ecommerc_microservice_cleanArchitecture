import mongoose from "mongoose";

const AddrssModel = new mongoose.Schema({
  userId:{
    type:mongoose.Types.ObjectId
  },
  email: {
    type: String,
    required:[true,"Email mustbe need in address"]
  },
  name: {
    type: String,
    required:[true,"Name is required"]
  },
  district: {
    type: String,
    required:[true,"Mustbe Provide Your District"]
  },
  mobile: {
    type: String,
    required:[true,"Mobile Number is required"]
  },
  state: {
    type: String,
    required:[true,"State is required"]
  },
  building: {type:String,
    required:[true,"Please provide building"]
  },
  street: {type:String,
    required:[true,"Please provide street"]
  },
  status: {
    type: Boolean,
    default: true,
  },
});
export default mongoose.model(String(process.env.ADDRESS_MODEL), AddrssModel);
