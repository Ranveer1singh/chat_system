import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { authenticateSocket, AuthenticatedSocket } from "./middleware/authenticate";

let io: Server | null = null;

const chatServiceUrl = process.env.CHAT_SERVICE_URL || "http://localhost:5002";

const canJoinChat = async (chatId: string, accessToken: string): Promise<boolean> => {
  if (!/^[a-f\d]{24}$/i.test(chatId)) return false;

  try {
    const response = await fetch(
      `${chatServiceUrl}/api/chat/${encodeURIComponent(chatId)}/access`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return response.ok;
  } catch {
    return false;
  }
};

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

    socket.on("join-chat", async (data: unknown) => {
      const chatId = typeof (data as { chatId?: unknown })?.chatId === "string"
        ? (data as { chatId: string }).chatId
        : undefined;
      if (!chatId || !socket.accessToken) {
        socket.emit("chat-access-denied", { message: "A valid chat ID is required" });
        return;
      }

      const allowed = await canJoinChat(chatId, socket.accessToken);
      if (!allowed) {
        socket.emit("chat-access-denied", { message: "You do not have access to this chat" });
        return;
      }

      socket.join(chatId);
    });

    socket.on("leave-chat", (data: unknown) => {
      const chatId = typeof (data as { chatId?: unknown })?.chatId === "string"
        ? (data as { chatId: string }).chatId
        : undefined;
      if (chatId) socket.leave(chatId);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:--->>>", socket.id);
    });
  });

};

export const getIO = (): Server | null => io;
