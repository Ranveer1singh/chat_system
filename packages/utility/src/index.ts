import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { AuthUser } from "@repo/types";
import type { IAuthUser } from "@repo/types";

const DEFAULT_TOKEN_EXPIRY = "1h";

export type AuthUserPayload = IAuthUser;

export class TokenValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TokenValidationError";
  }
}

export const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET must be configured");
  }

  return secret;
};

export const extractBearerToken = (authorization?: string): string | null => {
  if (!authorization) return null;

  const [scheme, token] = authorization.trim().split(/\s+/, 2);
  return scheme === "Bearer" && token ? token : null;
};

export const signAccessToken = (payload: AuthUserPayload): string => {
  const expiresIn = (process.env.JWT_EXPIRES_IN ||
    DEFAULT_TOKEN_EXPIRY) as SignOptions["expiresIn"];

  return jwt.sign(payload, getJwtSecret(), {
    expiresIn,
  });
};

export const verifyAccessToken = (token: string): AuthUserPayload => {
  let decoded: unknown;

  try {
    decoded = jwt.verify(token, getJwtSecret());
  } catch {
    throw new TokenValidationError("Invalid or expired access token");
  }

  const result = AuthUser.safeParse(decoded);
  if (!result.success) {
    throw new TokenValidationError("Access token contains invalid claims");
  }

  return result.data;
};
