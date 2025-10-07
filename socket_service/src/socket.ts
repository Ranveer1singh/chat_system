import { Server, Socket } from "socket.io";
import { Application } from "express";
import http, { Server as HttpServer } from "http";
import { AuthenticatedSocket, authenticateSocket } from "./middleware/authenticate";

let io: Server | null = null;
let httpServer: HttpServer | null = null;

export const initSocket = (server: HttpServer): void => {
  // Create HTTP server from express app
  httpServer = http.createServer(server);

  io = new Server(httpServer, {
    cors: {
      origin: "*", // restrict to your frontend domain in production
    },
  });
  io.use(authenticateSocket);

 io.on("connection", (socket: AuthenticatedSocket) => {
    console.log("✅ Client connected:", socket.id, "User:", socket.user);

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

};

// Export for other files to emit events
export const getIO = (): Server | null => io;
