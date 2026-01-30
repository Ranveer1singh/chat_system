import { ChatModel, ChatType, DMChatModel, GroupChatModel } from "../model.ts/chatModel";

class ChatService {
  async create(body: any) {
    const { type, participants, name, admins, createdBy } = body;

    let chat;

    switch (type) {
      case ChatType.DM:
        // At this stage, Zod already validated participants length = 2
        chat = new DMChatModel({
          type,
          participants,
        });
        break;

      case ChatType.GROUP:
        // Zod should validate name & createdBy existence
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

    await chat.save();

    // populate only safe fields from User
    // return chat.populate("participants", "name email");
    return chat;
  }
  async getById(id: string) {
    const chat = await ChatModel.findById(id)
    if (!chat) throw new Error("Chat not found");
    return chat;
  }

  async update(id: string, updates: any) {
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
