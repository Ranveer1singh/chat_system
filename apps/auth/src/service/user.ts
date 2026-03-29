import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import { ICreateUser, IUpdateUser, LoginInput } from '@repo/types';
import { accessToken } from "../utility/accessToken";
import { AppError } from "../utility/appError";

class UserService {
    async createUser(data: ICreateUser) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = new UserModel({ ...data, password: hashedPassword });
        await user.save()
        const token = accessToken(
            {
                id: user.id.toString(),
                fullName: user.fullName,
                // userName: user.userName,
                phone: user.phone,
                role: user.role
            }

        )
        return token;
    }

    async updateUser(id: string, data: IUpdateUser) {
        const existingUser = await UserModel.findById(id);
        if (!existingUser) {
            throw new AppError("User not found", 404);
        }

        Object.assign(existingUser, data);
        await existingUser.save();
        return existingUser;
    }

    async listUsers() {
        //filter , sort, pagination 
        return UserModel.find().select("-password");
    }

    async getUserById(id: string) {
        const user = await UserModel.findById(id).select("-password");
        if (!user) {
            throw new AppError("User not found", 404);
        }

        return user;
    }

    async login(body: LoginInput) {
        const { phone, password } = body;

        if (!phone || !password) {
            throw new AppError("Phone and password are required", 400);
        }

        const exitsUser = await UserModel.findOne({ phone });
        if (!exitsUser) {
            throw new AppError("User name is not valid", 401);
        }

        const isMatch = await bcrypt.compare(password, exitsUser.password);
        if (!isMatch) {
            throw new AppError("Invalid credentials", 401);
        }

        const token = accessToken({
            id: exitsUser.id.toString(),
            fullName: exitsUser.fullName,
            phone: exitsUser.phone,
            role: exitsUser.role
        })
        return token;
    }
}

export const userService = new UserService();

//forgot password service
