import { ChatType } from "@repo/types";
import type { ICreateChat, IUpdateChat } from "@repo/types";
import { ChatModel, DMChatModel, GroupChatModel } from "../model.ts/chatModel";
import { chatCreated } from "../kafka/producer";
import mongoose, { PipelineStage } from "mongoose";

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
    const chat = await ChatModel.findById(id);
    if (!chat) throw new Error("Chat not found");
    return chat;
  }

  async getByIdForParticipant(id: string, userId: string) {
    const chat = await ChatModel.findOne({ _id: id, participants: userId });
    if (!chat) throw new Error("Chat not found or access denied");
    return chat;
  }

  async assertParticipant(id: string, userId: string): Promise<void> {
    await this.getByIdForParticipant(id, userId);
  }

  async getByUserId(userId: string) {
    try {
      const pipeline: PipelineStage[] = [
  {
    $match: {
      participants: new mongoose.Types.ObjectId(userId),
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "participants",
      foreignField: "_id",
      pipeline: [
        {
          $project: {
            fullName: 1,
            userName: 1,
            phone: 1,
          },
        },
      ],
      as: "participantsDetails",
    },
  },
  // exclude logged in user 
  {
    $addFields: {
      participantsDetails: {
        $filter: {
          input: "$participantsDetails",
          as: "participant",
          cond: {
            $ne: [
              "$$participant._id",
              new mongoose.Types.ObjectId(userId),
            ],
          },
        },
      },
    },
  },
];
      return await ChatModel.aggregate(pipeline);
    } catch (error) {
      throw new Error(`Failed to fetch chats + ${(error as any).message}`);
    }
  }

  async update(id: string, userId: string, updates: IUpdateChat) {
    const chat = await GroupChatModel.findOne({
      _id: id,
      participants: userId,
      admins: userId,
    });

    if (!chat) throw new Error("Chat not found or access denied");

    Object.assign(chat, updates);

    const isStillParticipant = chat.participants.some((participant) =>
      participant.toString() === userId
    );
    const isStillAdmin = chat.admins.some((admin) => admin.toString() === userId);
    if (!isStillParticipant || !isStillAdmin) {
      throw new Error("A group admin cannot remove their own access");
    }

    await chat.save();
    await chat.populate("participants", "fullName userName");
    await chat.populate("lastMessage");
    return chat;
  }
  async delete(id: string, userId: string) {
    const deleted = await GroupChatModel.findOneAndDelete({
      _id: id,
      participants: userId,
      admins: userId,
    });
    if (!deleted) throw new Error("Chat not found or access denied");
    return deleted;
  }
}

export const chatService = new ChatService();
