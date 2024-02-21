import { verifyJwtToken } from "@aflah/jwt_verify";
import { Request, Response, NextFunction } from "express";
const verifyAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      throw new Error(" Unautherized!!!");
    }
    const payload= verifyJwtToken(String(process.env.JWT_KEY), token);
    if(!payload){
        throw new Error(' Unautherized!!!')
    }
    const {userId,rol}=payload
  } catch (error: any | Error) {
    res.status(401).json({ status: false, err: error.message });
  }
};
