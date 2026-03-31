import { Request, Response } from "express";
import { messageService } from "../services/message";
import { CreateMessageSchema } from "@repo/types/dist/chat";

class MessageController {
    async sendMessage(req: Request, res: Response) {
        const data = CreateMessageSchema.parse(req.body)
        const message = await messageService.send(req.body)
        res.status(201).json({
            success: true,
            data: message
        })
    }
}

export const messageController = new MessageController()