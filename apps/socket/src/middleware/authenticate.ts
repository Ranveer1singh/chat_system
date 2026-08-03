import { Socket } from "socket.io";
import { extractBearerToken, verifyAccessToken } from "@repo/utility";
import type { AuthUserPayload } from "@repo/utility";

export interface AuthenticatedSocket extends Socket {
  user?: AuthUserPayload;
  accessToken?: string;
}

/**
 * Middleware to authenticate socket connections using JWT
 */
export const authenticateSocket = (socket: AuthenticatedSocket, next: (err?: Error) => void): void => {
  const rawToken = socket.handshake.auth?.token || socket.handshake.query?.token;
  const token = typeof rawToken === "string" ? rawToken : undefined;

  if (!token) {
    return next(new Error("Authentication error: No token provided"));
  }

  try {
    const accessToken = extractBearerToken(token) ?? token;
    socket.user = verifyAccessToken(accessToken);
    socket.accessToken = accessToken;
    next();
  } catch {
    next(new Error("Authentication error: Invalid token"));
  }
};
