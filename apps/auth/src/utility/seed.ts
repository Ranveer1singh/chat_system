import mongoose from "mongoose";
import User, { IUser } from "../models/user.model";
import { MongoDb_Uri } from "../constant";
import bcrypt from "bcrypt";
import { exit } from "process";
async function mongoConnection(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri);
    console.log("Connected to database");
  } catch (error) {
    console.error("Issue while connecting with database:", error);
    process.exit(1);
  }
}
async function demoUsers() {
  try {
    mongoConnection(MongoDb_Uri)
    const users: Partial<IUser>[] = [
      {
        fullName: "Rishi Vyas",
        userName: "pigeon.js",
        password:await bcrypt.hash("Rishi@123", 10),
        phone: "8800847406",
        isActive: true,
      },
      {
        fullName: "Ranveer Singh Tomar",
        userName: "ranveersinghtomar",
        password: await bcrypt.hash("Ranveer@123", 10),
        phone: "88899332916",
        isActive: true,
      },
      {
        fullName: "Himanshu Solanki",
        userName: "himanshuSolanki",
        password: await bcrypt.hash("Him@123", 10),
        phone: "7898333656",
        isActive: true,
      },
    ];

    await User.insertMany(users);
    console.log("Successfully inserted demo users");
    process.exit(0);
  } catch (error) {
    console.error("Error while inserting users:", error);
  }
}
demoUsers();
export default demoUsers;