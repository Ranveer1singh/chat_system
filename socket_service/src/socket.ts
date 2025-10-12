import { Server, Socket } from "socket.io";
import http, { Server as HttpServer } from "http";
import { AuthenticatedSocket, authenticateSocket } from "./middleware/authenticate";

let io: Server | null = null;
let httpServer: HttpServer | null = null;

export const initSocket = (server: HttpServer): void => {
  httpServer = http.createServer(server);

  io = new Server(httpServer, {
    cors: {
      origin: "*",
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

export const getIO = (): Server | null => io;
