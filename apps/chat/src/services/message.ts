import { Request } from "express";
import { ChatModel } from "../model.ts/chatModel";
import { MessageModel } from "../model.ts/messageModel";
import { produceChatMessage } from "../kafka/producer";
import { ICreateMessage } from "@repo/types/dist/chat";

class MessageService {

  async send(payload: ICreateMessage) {
    const { chatId, senderId, type, content, attachments } = payload;
    const chat = await ChatModel.findById(chatId).lean();
    if (!chat) throw new Error("Chat not found");
    const isParticipant = (chat.participants || []).some(
      (p: any) => p.toString() === senderId.toString()
    );
    if (!isParticipant) throw new Error("Sender is not a participant of this chat");
    const messageDoc = new MessageModel({
      chatId,
      senderId,
      type,
      content: content ? content.trim() : undefined,
      attachments: attachments ?? [],
      readBy: [],
    });

    const savedMessage = await messageDoc.save();
    await produceChatMessage({
      messageId: savedMessage._id.toString(),
      chatId,
      senderId,
      type,
      content: savedMessage.content,
      attachments: savedMessage.attachments,
      createdAt: savedMessage.createdAt,
    });
    return savedMessage

  }

  /**
   * 
   * @param messageId 
   * @param userId 
   */
  //when we find message by particular id need to find in DB which takes time for update read by 
  async readBy(messageId: string, userId: string) {
    //inprogress
  }
  /*
  send message --->> done 
  read message --->> In progress
  delete message --->> pending 
  edit message --->> pending 
  
  */
}

export const messageService = new MessageService()