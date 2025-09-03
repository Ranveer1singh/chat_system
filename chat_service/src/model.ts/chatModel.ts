import mongoose, { Schema, model, Types, HydratedDocument } from "mongoose";

/** ---------- Enums ---------- */
export enum ChatType {
  DM = "DM",
  GROUP = "GROUP",
}

/** ---------- Base Interfaces ---------- */
export interface IChatBase {
  type: ChatType;
  participants: Types.ObjectId[];         // All chat members (DM has exactly 2)
  lastMessage?: Types.ObjectId | null;     // Ref to latest message
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDMChat extends IChatBase {
  type: ChatType.DM;
  /** Unique key formed by sorted participant IDs: "<smallerId>:<largerId>" */
  dmKey: string;
}

export interface IGroupChat extends IChatBase {
  type: ChatType.GROUP;
  name: string;
  description?: string;
  avatarUrl?: string;
  admins: Types.ObjectId[];                // Subset of participants
  createdBy: Types.ObjectId;               // Creator/owner
}

/** ---------- Base Schema ---------- */
const ChatBaseSchema = new Schema<IChatBase>(
  {
    type: {
      type: String,
      enum: Object.values(ChatType),
      required: true,
    },
    participants: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
      validate: {
        validator: (arr: Types.ObjectId[]) => Array.isArray(arr) && arr.length > 0,
        message: "participants must contain at least one user",
      },
    },
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
    discriminatorKey: "type",
    collection: "chats",
  }
);

// Common indexes
ChatBaseSchema.index({ updatedAt: -1 });
ChatBaseSchema.index({ "participants": 1 });

/** ---------- Base Model ---------- */
export const ChatModel = model<IChatBase>("Chat", ChatBaseSchema);

/** ---------- DM Discriminator ---------- */
const DMChatExtra = new Schema<IDMChat>({
  dmKey: {
    type: String,
    required: true,
  },
});

// Ensure DM has exactly 2 unique participants and compute dmKey
DMChatExtra.pre("validate", function (next) {
  // `this` is a DM chat doc
  const self = this as HydratedDocument<IDMChat>;
  if (!self.participants || self.participants.length !== 2) {
    return next(new Error("DM chat must have exactly 2 participants"));
  }

  // Sort participant IDs to create stable, order-independent key
  const [a, b] = self.participants.map((id) => id.toString()).sort();
  self.dmKey = `${a}:${b}`;
  next();
});

// Unique DM per user pair (partial index only for DM docs)
DMChatExtra.index(
  { dmKey: 1 },
  { unique: true, partialFilterExpression: { type: ChatType.DM } }
);

export const DMChatModel = ChatModel.discriminator<IDMChat>(ChatType.DM, DMChatExtra);

/** ---------- GROUP Discriminator ---------- */
const GroupChatExtra = new Schema<IGroupChat>({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  avatarUrl: { type: String },
  admins: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Basic guard: admins ⊆ participants
GroupChatExtra.pre("validate", function (next) {
  const self = this as HydratedDocument<IGroupChat>;
  const set = new Set(self.participants.map((id) => id.toString()));
  const allAdminsValid = (self.admins || []).every((id) => set.has(id.toString()));
  if (!allAdminsValid) {
    return next(new Error("All admins must be members of the group (participants)"));
  }
  next();
});

GroupChatExtra.index({ name: 1, createdAt: -1 });

export const GroupChatModel = ChatModel.discriminator<IGroupChat>(ChatType.GROUP, GroupChatExtra);

/** ---------- Helpful Types ---------- */
export type ChatDoc = HydratedDocument<IChatBase>;
export type DMChatDoc = HydratedDocument<IDMChat>;
export type GroupChatDoc = HydratedDocument<IGroupChat>;
