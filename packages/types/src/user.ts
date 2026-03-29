import { z } from "zod";


export enum Role {
    ADMIN = "admin",
    USER = "user",
}


export const UserSchema = z.object({
    _id: z.string(),
    fullName: z.string(),
    userName: z.string(),
    password: z.string(),
    isActive: z.boolean(),
    phone: z.string(),
    role: z.nativeEnum(Role),
});
export const AuthUser = z.object({
    id: z.string(),
    // userName: z.string(),
    phone: z.string(),
    fullName: z.string(),
    role: z.nativeEnum(Role),
});



// ✅ Schema for creating a new user (omit _id)
export const CreateUserSchema = UserSchema.omit({ _id: true, isActive: true, role: true });
export const UpdateUserSchema = UserSchema.pick({ fullName: true, phone: true, userName: true }).partial();

// ✅ TypeScript types inferred from Zod schemas
export type IUser = z.infer<typeof UserSchema>;
export type IAuthUser = z.infer<typeof AuthUser>;
export type ICreateUser = z.infer<typeof CreateUserSchema>;
export type IUpdateUser = z.infer<typeof UpdateUserSchema>;
