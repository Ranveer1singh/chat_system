import mongoose, { Schema, model, Types, HydratedDocument } from "mongoose";

/** ---------- Enums ---------- */
export enum ChatType {
  DM = "DM",
  GROUP = "GROUP",
}

/** ---------- Base Interfaces ---------- */
export interface IChatBase {
  type: ChatType;
  participants: Types.ObjectId[];   // All chat members
  lastMessage?: Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDMChat extends IChatBase {
  type: ChatType.DM;
  dmKey: string;
}

export interface IGroupChat extends IChatBase {
  type: ChatType.GROUP;
  name: string;
  admins: Types.ObjectId[];
  createdBy: Types.ObjectId;
}

/** ---------- Base Schema ---------- */
const ChatBaseSchema = new Schema<IChatBase>(
  {
    type: { type: String, enum: Object.values(ChatType), required: true },
    participants: [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
    ],
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
    discriminatorKey: "type",
    collection: "chats",
  }
);

// Indexes
ChatBaseSchema.index({ updatedAt: -1 });
ChatBaseSchema.index({ participants: 1 });

// Base model
export const ChatModel = model<IChatBase>("Chat", ChatBaseSchema);

/** ---------- DM Discriminator ---------- */
const DMChatExtra = new Schema<IDMChat>({
  dmKey: { type: String, required: true },
});

// Hook: enforce 2 participants + create dmKey
DMChatExtra.pre("validate", function (next) {
  const self = this as HydratedDocument<IDMChat>;
  if (!self.participants || self.participants.length !== 2) {
    return next(new Error("DM chat must have exactly 2 participants"));
  }
  const [a, b] = self.participants.map((id) => id.toString()).sort();
  self.dmKey = `${a}:${b}`;
  next();
});

// Unique DM per pair
DMChatExtra.index(
  { dmKey: 1 },
  { unique: true, partialFilterExpression: { type: ChatType.DM } }
);

export const DMChatModel = ChatModel.discriminator<IDMChat>(
  ChatType.DM,
  DMChatExtra
);

/** ---------- GROUP Discriminator ---------- */
const GroupChatExtra = new Schema<IGroupChat>({
  name: { type: String, required: true, trim: true },
  admins: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Guard: admins ⊆ participants
GroupChatExtra.pre("validate", function (next) {
  const self = this as HydratedDocument<IGroupChat>;
  const set = new Set(self.participants.map((id) => id.toString()));
  const allAdminsValid = (self.admins || []).every((id) =>
    set.has(id.toString())
  );
  if (!allAdminsValid) {
    return next(new Error("All admins must also be participants"));
  }
  next();
});

export const GroupChatModel = ChatModel.discriminator<IGroupChat>(
  ChatType.GROUP,
  GroupChatExtra
);

/** ---------- Types ---------- */
export type ChatDoc = HydratedDocument<IChatBase>;
export type DMChatDoc = HydratedDocument<IDMChat>;
export type GroupChatDoc = HydratedDocument<IGroupChat>;
