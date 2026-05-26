import { ChatType } from "@repo/types/dist/chat";
import type { ICreateChat, IUpdateChat } from "@repo/types/dist/chat";
import { ChatModel, DMChatModel, GroupChatModel } from "../model.ts/chatModel";
import { chatCreated } from "../kafka/producer";

class ChatService {
  async create(body: ICreateChat) {
    const { type, participants, name, admins, createdBy } = body;

    let chat;

    switch (type) {
      case ChatType.DM:
        chat = new DMChatModel({
          type,
          participants,
        });
        break;

      case ChatType.GROUP:
        chat = new GroupChatModel({
          type,
          participants,
          name,
          admins: admins || [],
          createdBy,
        });
        break;

      default:
        throw new Error("Invalid chat type");
    }

    const savedChat = await chat.save();
    // populate only safe fields from User
    // return chat.populate("participants", "name email");
    return chat;
  }
  async getById(id: string) {
    const chat = await ChatModel.findById(id)
    if (!chat) throw new Error("Chat not found");
    return chat;
  }

  async getByUserId(userId: string) {
    return ChatModel.find({ participants: userId }).sort({ updatedAt: -1 });
  }

  async update(id: string, updates: IUpdateChat) {
    const chat = await GroupChatModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })
      .populate("participants", "name email")
      .populate("lastMessage");

    if (!chat) throw new Error("Chat not found or not a group chat");
    return chat;
  }
  async delete(id: string) {
    const deleted = await ChatModel.findByIdAndDelete(id);
    if (!deleted) throw new Error("Chat not found");
    return deleted;
  }
}

export const chatService = new ChatService();
