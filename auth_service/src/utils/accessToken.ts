import jwt from "jsonwebtoken";
import { Request } from "express"

import { IAuthUser } from "../schemas/userSchemas.dto";
const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; 
const EXPIRES_IN = "1h"; // configurable

export const accessToken = (payload: IAuthUser): string => {
  const token=  jwt.sign({
    fullName : payload.fullName,
    userName : payload.userName,
    role : payload.role
  }, JWT_SECRET, { expiresIn: EXPIRES_IN })
  return token;
};

export const ValidateSignature = async (req: Request): Promise<boolean> => {
    try {
        const signature = req.get("Authorization"); // Get the Authorization header
        // console.log("Authorization header:", signature)

        if (!signature) {
            console.error("Authorization header is missing");
            return false;
        }

        const token = signature.split(" ")[1]; // Extract the token
        if (!token) {
            console.error("Token is missing in Authorization header");
            return false;
        }

        const payload = await jwt.verify(token, JWT_SECRET) as IAuthUser; // Verify the token
    //    req.user = payload
        (req as any).user = payload; 

        return true;
    } catch (error) {
        console.error("Error verifying token:", error);
        return false;
    }
};