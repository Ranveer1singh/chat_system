import UserModel from "../models/User.Model";
import { ICreateUser } from "../schemas/userSchemas.dto";

class UserService {
  async createUser(data: ICreateUser) {
    const user = new UserModel(data);
    return await user.save();
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
