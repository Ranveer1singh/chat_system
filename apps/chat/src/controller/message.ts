import { Request, Response } from "express";
import { messageService } from "../services/message";
import { CreateMessageSchema } from "@repo/types";
import { chatService } from "../services/chat";

class MessageController {
    async sendMessage(req: Request, res: Response) {
        if (!req.user) {
            res.status(401).json({ success: false, message: "Authentication is required" });
            return;
        }

        try {
            const data = CreateMessageSchema.parse({
                ...req.body,
                senderId: req.user.id,
            });
            await chatService.assertParticipant(data.chatId, req.user.id);
            const message = await messageService.send(data)
            res.status(201).json({
                success: true,
                data: message
            })
        } catch {
            res.status(404).json({ success: false, message: "Chat not found or access denied" });
        }
    }

    async getMessageByChatId(req : Request, res: Response){
        const chatId = Array.isArray(req.params.chatId)
            ? req.params.chatId[0]
            : req.params.chatId;
        if (!chatId) {
            res.status(400).json({ success: false, message: "A chat ID is required" });
            return;
        }
        if (!req.user) {
            res.status(401).json({ success: false, message: "Authentication is required" });
            return;
        }
        try {
            await chatService.assertParticipant(chatId, req.user.id);
            const message = await messageService.getMessagesByChat(chatId)
            res.status(200).json({
                success : true,
                data : message
            })
        } catch {
            res.status(404).json({ success: false, message: "Chat not found or access denied" });
        }
    }
}

export const messageController = new MessageController()
