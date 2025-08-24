import jwt from "jsonwebtoken";
import  { IUser } from "../models/User.Model"
const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; 
const EXPIRES_IN = "1h"; // configurable

export const accessToken = (payload: IUser): string => {
  const token=  jwt.sign({
    fullName : payload.fullName,
    userName : payload.userName,
    isActive : payload.isActive,
    role : payload.role
  }, JWT_SECRET, { expiresIn: EXPIRES_IN })
  return token;
};
