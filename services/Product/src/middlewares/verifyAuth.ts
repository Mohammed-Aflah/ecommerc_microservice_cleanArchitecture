// import { verifyJwtToken } from "@aflah/jwt_verify";
import { log } from "console";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const verifyAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      throw new Error(" Unautherized!!!");
    }
    jwt.verify(token, String(process.env.JWT_KEY), (err: any, payload: any) => {
      console.log("🚀 ~ jwt.verify ~ payload:", payload);

      if (err) {
        throw new Error(" Unautherized!!!");
      }
      const { _id, rol } = payload;
      console.log(payload);
      if (rol === "admin") {
        next();
      }
    });
  } catch (error: any | Error) {
    res.status(401).json({ status: false, err: error.message });
  }
};
