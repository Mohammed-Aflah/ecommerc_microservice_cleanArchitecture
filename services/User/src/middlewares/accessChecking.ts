import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserSchema from "../infrastructure/mongodb/Schema/UserSchema";
export const checkingAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error("Unauthorized not accessible");
    jwt.verify(token, String(process.env.JWT_KEY), async(err: any, decoded:{_id:string,rol:string}|any) => {
        if(err) throw err
        if(!decoded) throw new Error('data not found')
        const {_id}=decoded
        const userData=await UserSchema.findById(_id)
        if(userData?.status){
            next()
        }else{
            throw Error("Your access has been restricted")
        }
    });
  } catch (error: any | Error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
