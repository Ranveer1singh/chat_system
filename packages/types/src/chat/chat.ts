import { z } from "zod";

export enum ChatType {
  DM = "DM",
  GROUP = "GROUP",
}

export const ChatSchema = z.object({
  _id: z.string(),
  type: z.nativeEnum(ChatType),
  participants: z.array(z.string()),
  lastMessage: z.string().nullable(),
  dmKey: z.string().optional(),
  name: z.string().optional(),
  admins: z.array(z.string()).optional(),
  createdBy: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export const ParticipantSchema =z.object({
  _id: z.string(),
  fullName : z.string(),
  phone : z.string(),
  userName:z.string(),
})
export const UserChatsSchema = z.object({
  _id: z.string(),
  type: z.nativeEnum(ChatType),
  participants: z.array(z.string()),
  participantsDetails : z.array(ParticipantSchema),
  lastMessage: z.string().nullable(),
  dmKey: z.string().optional(),
  name: z.string().optional(),
  admins: z.array(z.string()).optional(),
  createdBy: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateChatSchema = ChatSchema.omit({
  _id: true,
  lastMessage: true,
  createdAt: true,
  updatedAt: true,
});

export const ChatIdParamsSchema = z.object({
  id: z.string().min(1),
});

export const UserChatsParamsSchema = z.object({
  userId: z.string().min(1),
});

export const UpdateChatSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    participants: z.array(z.string()).min(1).optional(),
    admins: z.array(z.string()).optional(),
    lastMessage: z.string().nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update the chat",
  });

export type IChat = z.infer<typeof ChatSchema>;
export type ICreateChat = z.infer<typeof CreateChatSchema>;
export type IChatIdParams = z.infer<typeof ChatIdParamsSchema>;
export type IUserChatsParams = z.infer<typeof UserChatsParamsSchema>;
export type IUpdateChat = z.infer<typeof UpdateChatSchema>;
export type Participant = z.infer<typeof ParticipantSchema>;
export type UserChat = z.infer<typeof UserChatsSchema>;