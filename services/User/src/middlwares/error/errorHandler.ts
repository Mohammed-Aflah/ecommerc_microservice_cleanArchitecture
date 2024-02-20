import { Response, Request, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message+" ____________>");

  const statusCode = err.statusCode || 500;
  const message = err.message || " Internal Server Error ";

  res.status(statusCode).json({ err: message });
};
export default errorHandler;
