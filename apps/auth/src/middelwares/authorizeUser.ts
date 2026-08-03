import type { NextFunction, Request, Response } from "express";
import { Role } from "@repo/types";
import { AppError } from "../utility/appError";

export const authorizeSelfOrAdmin = (req: Request, _res: Response, next: NextFunction): void => {
  const { id } = req.params;
  const user = req.user;

  if (!user) {
    next(new AppError("Authentication is required", 401));
    return;
  }

  if (user.role === Role.ADMIN || user.id === id) {
    next();
    return;
  }

  next(new AppError("You are not authorized to access this user", 403));
};
