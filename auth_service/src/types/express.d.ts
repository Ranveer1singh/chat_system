import { IAuthUser } from "../schemas/userSchemas.dto"

declare global {
    namespace Express {
        interface Request {
            user? : IAuthUser
        }
        interface Response {
            user? : IAuthUser
        }
    }
}
export {};