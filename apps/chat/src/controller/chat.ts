import { Request, Response } from "express";
import { chatService } from "../services/chat";
import {
  ChatIdParamsSchema,
  CreateChatSchema,
  UpdateChatSchema,
  UserChatsParamsSchema,
} from "@repo/types/dist/chat";

class ChatController {

  async createChat(req: Request, res: Response) {
    const data = CreateChatSchema.parse(req.body);
    const chat = await chatService.create(data);
    res.status(201).json({
      success: true,
      data: chat
    })

  }

  async getChat(req: Request, res: Response) {
    try {
      const { id } = ChatIdParamsSchema.parse(req.params);
      const chat = await chatService.getById(id);
      res.status(200).json({ success: true, data: chat });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getUserChats(req: Request, res: Response) {
    try {
      const { userId } = UserChatsParamsSchema.parse(req.params);
      const chats = await chatService.getByUserId(userId);
      res.status(200).json({ success: true, data: chats });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateChat(req: Request, res: Response) {
    try {
      const { id } = ChatIdParamsSchema.parse(req.params);
      const updates = UpdateChatSchema.parse(req.body);
      const chat = await chatService.update(id, updates);
      res.status(200).json({ success: true, message: "Chat updated", data: chat });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteChat(req: Request, res: Response) {
    try {
      const { id } = ChatIdParamsSchema.parse(req.params);
      await chatService.delete(id);
      res.status(200).json({ success: true, message: "Chat deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

export const chatController = new ChatController()
