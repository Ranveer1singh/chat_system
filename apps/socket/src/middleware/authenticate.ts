import { Socket } from "socket.io";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedSocket extends Socket {
  user?: string | JwtPayload;
}

/**
 * Middleware to authenticate socket connections using JWT
 */
export const authenticateSocket = (socket: AuthenticatedSocket, next: (err?: Error) => void): void => {
  const token = socket.handshake.auth?.token || socket.handshake.query?.token;

  if (!token) {
    return next(new Error("Authentication error: No token provided"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "development");
    socket.user = decoded;
    next();
  } catch (err) {
    console.log("JWT verification failed:", err);
    next(new Error("Authentication error: Invalid token"));
  }
};
