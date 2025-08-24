import { z } from "zod";

// ✅ Define Role enum
export enum Role {
  ADMIN = "admin",
  USER = "user",
}

// ✅ Zod schema
export const UserSchema = z.object({
  _id: z.string(),
  fullName: z.string(),
  userName: z.string(),
  password: z.string(),
  isActive: z.boolean(),
  role: z.nativeEnum(Role), 
});

// ✅ Schema for creating a new user (omit _id)
export const CreateUserSchema = UserSchema.omit({ _id: true });

// ✅ TypeScript types inferred from Zod schemas
export type IUser = z.infer<typeof UserSchema>;
export type ICreateUser = z.infer<typeof CreateUserSchema>;
