import { Request, Response } from "express";
import { userService } from "../service/user";
import { CreateUserSchema } from "@repo/types"

class UserController {
    // Create
    async create(req: Request, res: Response) {
        try {
            const data = CreateUserSchema.parse(req.body)
            const user = await userService.createUser(data);
            res.status(201).json({ success: true, token: user });
        } catch (error: any) {
            console.log(error)
            res.status(400).json({ success: false, message: error.message });
        }
    }

    // Update
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const user = await userService.updateUser(id, req.body);
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            res.status(200).json({ success: true, data: user });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    // List all
    async list(req: Request, res: Response) {
        try {
            const users = await userService.listUsers();
            res.status(200).json({ success: true, data: users });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    // Get by ID
    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const user = await userService.getUserById(id);
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            res.status(200).json({ success: true, data: user });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    async login(req: Request, res: Response) {
        try {
            const token = await userService.login(req.body);

            res.status(200).json({ success: true, token });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    async loginUser(req: Request, res: Response) {
        try {
            const { user } = req as any;

            console.log(user)
            res.status(200).json({ success: true, user });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}

export const userController = new UserController();
