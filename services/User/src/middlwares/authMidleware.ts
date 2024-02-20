import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unautherized" });
  }
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "  Authentication error  ".trim() });
    }
  });
  next();
};

export default authenticate;
