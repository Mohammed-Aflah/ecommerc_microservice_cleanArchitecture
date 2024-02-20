import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const unAuthenticationMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtKey: string = String(process.env.JWT_KEY);
  if (req.cookies?.token) {
    jwt.verify(req.cookies?.token, jwtKey, (err: any, decoded: any) => {
      if (err) {
        console.log(`Error in jwt decoding`);

        next();
        return;
      }
      res.status(200).json({
        status: false,
        autherizationStatus: true,
        message: `${decoded.rol} already Autherized`,
      });
    });
  } else {
    next();
  }
};
