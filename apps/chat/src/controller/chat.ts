import { Request, Response } from "express";
import { chatService } from "../services/chat";

class ChatController {

  async createChat(req: Request, res: Response) {
    const chat = await chatService.create(req.body)
    res.status(201).json({
      success: true,
      data: chat
    })

  }

  async getChat(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const chat = await chatService.getById(id);
      res.status(200).json({ success: true, data: chat });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getUserChats(req: Request, res: Response) {
    try {
      const id = req.params.userId as string;
      const chats = await chatService.getById(id);
      res.status(200).json({ success: true, data: chats });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateChat(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const chat = await chatService.update(id, req.body);
      res.status(200).json({ success: true, message: "Chat updated", data: chat });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteChat(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      await chatService.delete(id);
      res.status(200).json({ success: true, message: "Chat deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

export const chatController = new ChatController()