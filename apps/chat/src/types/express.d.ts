import type { IAuthUser } from "@repo/types";

declare global {
  namespace Express {
    interface Request {
      user?: IAuthUser;
    }
  }
}

export {};
