import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyAdminAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) throw new Error("_ Unauthorized admin!!");

    const decoded = jwt.verify(token, String(process.env.JWT_KEY)) as { _id: string; rol: "admin" | "user" };

    if (!decoded) throw new Error("something went wrong");

    if (decoded.rol === "admin") {
      next();
    } else {
      throw new Error("Admin not authorized");
    }
  } catch (error) {
    let errorMessage = "An error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({ status: false, err: errorMessage });
  }
};
