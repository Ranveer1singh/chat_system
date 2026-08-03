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
  const secret = process.env.JWT_SECRET?.trim();

  if (!secret) {
    throw new Error("JWT_SECRET must be configured");
  }

  return secret;
};

/**
 * Call during service startup so missing JWT configuration fails fast instead
 * of surfacing as an authentication error on the first protected request.
 */
export const validateJwtConfig = (): void => {
  getJwtSecret();
};

export const extractBearerToken = (authorization?: string): string | null => {
  if (!authorization) return null;

  const [scheme, token] = authorization.trim().split(/\s+/, 2);
  return scheme === "Bearer" && token ? token : null;
};

export const extractCookieToken = (cookieHeader?: string): string | null => {
  if (!cookieHeader) return null;

  const tokenCookie = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("token="));

  if (!tokenCookie) return null;

  const token = tokenCookie.slice("token=".length);
  return token ? decodeURIComponent(token) : null;
};

export const extractAccessToken = (
  authorization?: string,
  cookieHeader?: string,
): string | null => extractBearerToken(authorization) ?? extractCookieToken(cookieHeader);

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
