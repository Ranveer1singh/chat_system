import UserModel from "../models/User.Model";
import bcrypt from "bcrypt";
import { ICreateUser } from "../schemas/userSchemas.dto";
import { accessToken } from "../utils/accessToken";

class UserService {
  async createUser(data: ICreateUser) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new UserModel({...data, password : hashedPassword});
    await user.save()
    const token =  accessToken(user)
    return  token;
  }

  async updateUser(id: string, data: any) {
    return await UserModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async listUsers() {
    return await UserModel.find();
  }

  async getUserById(id: string) {
    return await UserModel.findById(id);
  }
}

export const userService = new UserService();
