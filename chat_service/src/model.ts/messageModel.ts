import { Schema, model, Types, HydratedDocument } from "mongoose";

export enum MessageType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  FILE = "FILE",
}

export interface IReadReceipt {
  userId: Types.ObjectId;
  readAt: Date;
}

export interface IMessage {
  chatId: Types.ObjectId;                 // Ref -> Chat
  senderId: Types.ObjectId;               // Ref -> User
  type: MessageType;
  content?: string;                       // For TEXT
  attachments?: {                         // For IMAGE/FILE
    url: string;
    name?: string;
    sizeBytes?: number;
    mimeType?: string;
  }[];
  readBy?: IReadReceipt[];                 // Per-user read receipts (esp. for groups)
  createdAt?: Date;
  updatedAt?: Date;
}

const ReadReceiptSchema = new Schema<IReadReceipt>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    readAt: { type: Date, required: true, default: Date.now },
  },
  { _id: false }
);

const MessageSchema = new Schema<IMessage>(
  {
    chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true, index: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: { type: String, enum: Object.values(MessageType), required: true, default: MessageType.TEXT },
    content: { type: String, trim: true },
    attachments: [
      {
        url: { type: String, required: true },
        name: { type: String },
        sizeBytes: { type: Number },
        mimeType: { type: String },
      },
    ],
    readBy: { type: [ReadReceiptSchema], default: [] },
  },
  { timestamps: true, collection: "messages" }
);

// High-performance fetch for chat history (supports cursor/createdAt pagination)
MessageSchema.index({ chatId: 1, createdAt: -1 });
// Secondary helpful indexes
MessageSchema.index({ senderId: 1, createdAt: -1 });

export const MessageModel = model<IMessage>("Message", MessageSchema);

export type MessageDoc = HydratedDocument<IMessage>;
