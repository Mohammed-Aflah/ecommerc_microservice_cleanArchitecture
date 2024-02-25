import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // jwt.verify()
    const token = req.cookies.token;
    if (!token) throw Error("Unautherized user");
    jwt.verify(token, String(process.env.JWT_KEY), (err: Error|any, decoded:{_id:string,rol:"user"|"admin"}|any) => {
        if(err) throw err
        if(decoded?.rol!=='user') throw new Error("Unautherized")
        next()
    });
  } catch (error: any | Error) {
    res.status(500).json({ status: false, err: error.message });
  }
};
