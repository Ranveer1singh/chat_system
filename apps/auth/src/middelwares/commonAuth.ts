import { Request, Response, NextFunction } from "express";
import { ValidateSignature } from "../utility/accessToken";
import { IAuthUser } from "@repo/types";

// declare global {
//     namespace Express {
//         interface Request {
//             user? : IAuthUser
//         }
//     }
// }

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const isValid = await ValidateSignature(req);

    if (isValid) {
        next();
    } else {
        res.status(401).json({
            message: "User not authorized. Invalid or missing token.",
        });
    }
};