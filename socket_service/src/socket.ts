import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { authenticateSocket, AuthenticatedSocket } from "./middleware/authenticate";

let io: Server | null = null;

export const initSocket = (httpServer: HttpServer): void => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
  });


  io.use(authenticateSocket);

  io.on("connection", (socket: AuthenticatedSocket) => {
    console.log("Client connected:--->>>", socket.id,);

    socket.on("disconnect", () => {
      console.log("Client disconnected:--->>>", socket.id);
    });
  });

};

export const getIO = (): Server | null => io;