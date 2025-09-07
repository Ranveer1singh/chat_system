import { Request, Response } from "express";
import { chatService } from "../services/chat";

class ChatController {

    async createChat(req : Request , res : Response){
        const chat = await chatService.create(req.body)
        res.status(201).json({
            success : true,
            data : chat
        })

    }

  async getChat(req: Request, res: Response) {
    try {
      const chat = await chatService.getById(req.params.id);
      res.status(200).json({ success: true, data: chat });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getUserChats(req: Request, res: Response) {
    try {
      const chats = await chatService.getById(req.params.userId);
      res.status(200).json({ success: true, data: chats });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateChat(req: Request, res: Response) {
    try {
      const chat = await chatService.update(req.params.id, req.body);
      res.status(200).json({ success: true, message: "Chat updated", data: chat });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteChat(req: Request, res: Response) {
    try {
      await chatService.delete(req.params.id);
      res.status(200).json({ success: true, message: "Chat deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

export const chatController = new ChatController()