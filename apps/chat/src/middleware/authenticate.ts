import type { NextFunction, Request, Response } from "express";
import { extractBearerToken, verifyAccessToken } from "@repo/utility";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = extractBearerToken(req.get("Authorization"));

  if (!token) {
    res.status(401).json({ success: false, message: "Authentication token is required" });
    return;
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired authentication token" });
  }
};
