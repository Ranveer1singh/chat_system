import { Request, Response, NextFunction } from "express";
import { ValidateSignature } from "../utility/accessToken";
import { IAuthUser } from "@repo/types";
import { AppError } from "../utility/appError";

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
        next(new AppError("User not authorized. Invalid or missing token.", 401));
    }
};
