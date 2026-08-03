import { Request, Response } from "express";
import { userService } from "../service/user";
import { CreateUserSchema, loginSchema, UpdateUserSchema } from "@repo/types"
import { AppError } from "../utility/appError";
import { clearLoginRateLimit } from "../middelwares/loginRateLimit";

const SESSION_MAX_AGE_MS = Number(process.env.JWT_COOKIE_MAX_AGE_MS) || 60 * 60 * 1000;

const sessionCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: SESSION_MAX_AGE_MS,
    path: "/",
};

class UserController {
    // Create
    async create(req: Request, res: Response) {
        const data = CreateUserSchema.parse(req.body)
        const token = await userService.createUser(data);
        clearLoginRateLimit(req);
        res.cookie("token", token, sessionCookieOptions);
        res.status(201).json({ success: true });
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
        clearLoginRateLimit(req);
        res.cookie("token", token, sessionCookieOptions);
        res.status(200).json({ success: true });
    }
    async loginUser(req: Request, res: Response) {
        const { user } = req;

        if (!user) {
            throw new AppError("Authenticated user not found on request.", 401);
        }

        res.status(200).json({ success: true, user : {
            id:user.id,
            fullName: user.fullName,
            phone: user.phone,
            role: user.role
        } });
    }

    async logout(_req: Request, res: Response) {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });
        res.status(204).send();
    }
}

export const userController = new UserController();


//forgot password api 
