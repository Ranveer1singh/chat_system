import { Request, Response } from "express";
import { chatService } from "../services/chat";
import { messageService } from "../services/message";
import {
  ChatIdParamsSchema,
  CreateChatSchema,
  UpdateChatSchema,
  UserChatsParamsSchema,
} from "@repo/types"

const getAuthenticatedUserId = (req: Request): string | null => req.user?.id ?? null;

class ChatController {
  async createChat(req: Request, res: Response) {
    const data = CreateChatSchema.parse(req.body);
    const userId = getAuthenticatedUserId(req);
    if (!userId) {
      res.status(401).json({ success: false, message: "Authentication is required" });
      return;
    }

    const participants = [...new Set([...data.participants, userId])];
    if (data.type === "DM" && participants.length !== 2) {
      res.status(400).json({
        success: false,
        message: "A direct message must have exactly two participants",
      });
      return;
    }

    const chat = await chatService.create({
      ...data,
      participants,
      createdBy: data.type === "GROUP" ? userId : undefined,
      admins: data.type === "GROUP" ? [...new Set([userId, ...(data.admins ?? [])])] : undefined,
    });
    res.status(201).json({
      success: true,
      data: chat
    })

  }

  async getChat(req: Request, res: Response) {
    try {
      const { id } = ChatIdParamsSchema.parse(req.params);
      const userId = getAuthenticatedUserId(req);
      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication is required" });
        return;
      }
      const chat = await chatService.getByIdForParticipant(id, userId);
      res.status(200).json({ success: true, data: chat });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getUserChats(req: Request, res: Response) {
    try {
      const { userId } = UserChatsParamsSchema.parse(req.params);
      const authenticatedUserId = getAuthenticatedUserId(req);
      if (!authenticatedUserId) {
        res.status(401).json({ success: false, message: "Authentication is required" });
        return;
      }
      if (userId !== authenticatedUserId) {
        res.status(403).json({ success: false, message: "You can only view your own chats" });
        return;
      }
      const chats = await chatService.getByUserId(userId);
      res.status(200).json({ success: true, data: chats });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getMessages(req: Request, res: Response) {
    try {
      const { id } = ChatIdParamsSchema.parse(req.params);
      const userId = getAuthenticatedUserId(req);
      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication is required" });
        return;
      }
      await chatService.assertParticipant(id, userId);
      const messages = await messageService.getMessagesByChat(id);
      res.status(200).json({ success: true, data: messages });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateChat(req: Request, res: Response) {
    try {
      const { id } = ChatIdParamsSchema.parse(req.params);
      const updates = UpdateChatSchema.parse(req.body);
      const userId = getAuthenticatedUserId(req);
      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication is required" });
        return;
      }
      const chat = await chatService.update(id, userId, updates);
      res.status(200).json({ success: true, message: "Chat updated", data: chat });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteChat(req: Request, res: Response) {
    try {
      const { id } = ChatIdParamsSchema.parse(req.params);
      const userId = getAuthenticatedUserId(req);
      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication is required" });
        return;
      }
      await chatService.delete(id, userId);
      res.status(200).json({ success: true, message: "Chat deleted" });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async checkAccess(req: Request, res: Response) {
    try {
      const { id } = ChatIdParamsSchema.parse(req.params);
      const userId = getAuthenticatedUserId(req);
      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication is required" });
        return;
      }
      await chatService.assertParticipant(id, userId);
      res.status(200).json({ success: true });
    } catch {
      res.status(404).json({ success: false, message: "Chat not found or access denied" });
    }
  }
}

export const chatController = new ChatController()
