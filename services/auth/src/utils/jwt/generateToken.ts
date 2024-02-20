import jwt from "jsonwebtoken";
export const generateToken = (payload: {
  userId: string;
  rol: "admin" | "user";
}) => {
  const jwtKey: string = String(process.env.JWT_KEY);
  const token = jwt.sign(payload, jwtKey, { expiresIn: 1000 * 60 * 60 * 24 });
  return token;
};
