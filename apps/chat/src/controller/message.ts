import { Request, Response } from "express";
import { messageService } from "../services/message";
import { CreateMessageSchema } from "@repo/types";

class MessageController {
    async sendMessage(req: Request, res: Response) {
        if (!req.user) {
            res.status(401).json({ success: false, message: "Authentication is required" });
            return;
        }

        const data = CreateMessageSchema.parse({
            ...req.body,
            senderId: req.user.id,
        });
        const message = await messageService.send(data)
        res.status(201).json({
            success: true,
            data: message
        })
    }

    async getMessageByChatId(req : Request, res: Response){
        const {chatId} = req.params
        console.log("Chat ID received in controller:", chatId);
        const message = await messageService.getMessagesByChat(chatId.toString())
        res.status(200).json({
            success : true,
            data : message
        })
    }
}

export const messageController = new MessageController()
