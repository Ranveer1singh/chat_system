import UserModel from "../models/User.Model";
import bcrypt from "bcrypt";
import { ICreateUser, Role } from "../schemas/userSchemas.dto";
import { accessToken } from "../utils/accessToken";
import { exit } from "process";

class UserService {
  async createUser(data: ICreateUser) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new UserModel({ ...data, password: hashedPassword });
    await user.save()
    const token = accessToken(
      {
        fullName: user.fullName,
        // userName: user.userName,
        phone: user.phone,
        role: user.role
      }

    )
    return token;
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

  async login(body: any) {
    try {
      const { phone, password } = body;
      const exitsUser = await UserModel.findOne({ phone })
      if (!exitsUser) throw new Error("User name is not valid")

      const isMatch = bcrypt.compare(password, exitsUser.password)
      if (!isMatch) throw new Error("Invaild credentials")
      const token = accessToken({
        fullName: exitsUser.fullName,
        phone: exitsUser.phone,
        role: exitsUser.role
      })
      return token;
    } catch (error) {

    }
  }
}

export const userService = new UserService();
