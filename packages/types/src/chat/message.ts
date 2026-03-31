import { z } from 'zod';


export enum MessageType {
    TEXT = "TEXT",
    IMAGE = "IMAGE",
    FILE = "FILE",
}

export const MessageSchema = z.object({
    _id: z.string(),
    chatId: z.string(),
    senderId: z.string(),
    type: z.nativeEnum(MessageType),
    content: z.string().optional(),
    attachments: z.array(z.object({
        url: z.string(),
        name: z.string().optional(),
    })).optional(),
    readBy: z.array(z.object({
        userId: z.string(),
        readAt: z.date(),
    })).optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const CreateMessageSchema = MessageSchema.omit({
    _id: true,
    readBy: true,
    createdAt: true,
    updatedAt: true,
});
export type IMessage = z.infer<typeof MessageSchema>;
export type ICreateMessage = z.infer<typeof CreateMessageSchema>;