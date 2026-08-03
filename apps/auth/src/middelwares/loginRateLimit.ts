import type { NextFunction, Request, Response } from "express";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

type LoginAttempt = {
  count: number;
  resetAt: number;
};

const attempts = new Map<string, LoginAttempt>();

const getClientKey = (req: Request): string => req.ip || req.socket.remoteAddress || "unknown";

export const loginRateLimit = (req: Request, res: Response, next: NextFunction): void => {
  const key = getClientKey(req);
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    next();
    return;
  }

  if (current.count >= MAX_ATTEMPTS) {
    const retryAfterSeconds = Math.ceil((current.resetAt - now) / 1000);
    res.set("Retry-After", String(retryAfterSeconds));
    res.status(429).json({
      success: false,
      message: "Too many authentication attempts. Please try again later.",
    });
    return;
  }

  current.count += 1;
  next();
};

export const clearLoginRateLimit = (req: Request): void => {
  attempts.delete(getClientKey(req));
};
