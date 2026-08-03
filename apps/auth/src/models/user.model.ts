import mongoose, { Document, Schema } from "mongoose";
import { Role } from "@repo/types";

// 1. Define the interface
export interface IUser extends Document {
    fullName: string;
    userName: string;
    password: string;
    isActive: boolean;
    phone: string;
    role: Role;   // use lowercase for consistency
}

// 2. Define the schema
const userSchema: Schema<IUser> = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        role: {
            type: String,
            enum: Object.values(Role),
            default: Role.USER,
        },
    },
    { timestamps: true } // adds createdAt & updatedAt
);

// 3. Create and export the model
const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
