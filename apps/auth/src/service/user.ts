import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import { ICreateUser, IUpdateUser } from '@repo/types';
import { accessToken } from "../utility/accessToken";
import { isDataView } from "node:util/types";

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
        try {
            const existingUser = await UserModel.findById(id);
            if (!existingUser) {
                throw new Error("User not found");
            }
            // const updatedUser = await UserModel.updateOne({ _id: id }, { $set: data });
            // return updatedUser;
            Object.assign(existingUser, data);
            await existingUser.save();
            return existingUser;
        } catch (error) {
            throw new Error("Error updating user");
        }
    }

    async listUsers() {
        try {
            //filter , sort, pagination 
            const users = await UserModel.find().select("-password");
            if (users.length === 0) {
                throw new Error("No users found");
            }
            return users;
        } catch (error) {
            throw new Error("Error fetching users");
        }
    }

    async getUserById(id: string) {
        try {
            const user = await UserModel.findById(id).select("-password");
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            throw new Error("Error fetching user");
        }
    }

    async login(body: any) {
        try {
            const { phone, password } = body;
            const exitsUser = await UserModel.findOne({ phone })
            if (!exitsUser) throw new Error("User name is not valid")

            const isMatch = bcrypt.compare(password, exitsUser.password)
            if (!isMatch) throw new Error("Invaild credentials")
            const token = accessToken({
                id: exitsUser.id.toString(),
                fullName: exitsUser.fullName,
                phone: exitsUser.phone,
                role: exitsUser.role
            })
            return token;
        } catch (error) {
            console.log("error-->> ", error);
        }
    }
}

export const userService = new UserService();

//forgot password service