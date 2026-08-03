import { Request } from "express"
import { extractBearerToken, signAccessToken, verifyAccessToken } from "@repo/utility";
import type { IAuthUser } from "@repo/types";

export const accessToken = (payload: IAuthUser): string => signAccessToken(payload);

export const ValidateSignature = async (req: Request): Promise<boolean> => {
    try {
        const token = extractBearerToken(req.get("Authorization"));
        if (!token) return false;

        req.user = verifyAccessToken(token)
        return true;
    } catch {
        return false;
    }
};
