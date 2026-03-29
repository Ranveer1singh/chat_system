import { Request, Response } from "express";
import { userService } from "../service/user";
import { CreateUserSchema, loginSchema, UpdateUserSchema } from "@repo/types"
import { AppError } from "../utility/appError";

class UserController {
    // Create
    async create(req: Request, res: Response) {
        const data = CreateUserSchema.parse(req.body)
        const user = await userService.createUser(data);
        res.status(201).json({ success: true, token: user });
    }

    // Update
    async update(req: Request, res: Response) {
        const data = UpdateUserSchema.parse(req.body)
        const { id } = req.params as { id: string };
        const user = await userService.updateUser(id, data);
        res.status(200).json({ success: true, data: user });
    }

    // List all
    async list(req: Request, res: Response) {
        const users = await userService.listUsers();
        res.status(200).json({ success: true, data: users });
    }

    // Get by ID
    async getById(req: Request, res: Response) {
        const { id } = req.params as { id: string };
        const user = await userService.getUserById(id);
        res.status(200).json({ success: true, data: user });
    }
    async login(req: Request, res: Response) {
        const loginData = loginSchema.parse(req.body);
        const token = await userService.login(loginData);
        res.status(200).json({ success: true, token });
    }
    async loginUser(req: Request, res: Response) {
        const { user } = req as any;

        if (!user) {
            throw new AppError("Authenticated user not found on request.", 401);
        }

        res.status(200).json({ success: true, user });
    }
}

export const userController = new UserController();


//forgot password api 
