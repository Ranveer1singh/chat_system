import { Socket } from "socket.io";
import { extractAccessToken, verifyAccessToken } from "@repo/utility";
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
  const bearerToken = typeof rawToken === "string" ? rawToken : undefined;
  const token = extractAccessToken(bearerToken, socket.handshake.headers.cookie);

  if (!token) {
    return next(new Error("Authentication error: No token provided"));
  }

  try {
    socket.user = verifyAccessToken(token);
    socket.accessToken = token;
    next();
  } catch {
    next(new Error("Authentication error: Invalid token"));
  }
};
