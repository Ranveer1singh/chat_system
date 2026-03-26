import { IAuthUser } from '@repo/types'

declare global {
    namespace Express {
        interface Request {
            user?: IAuthUser
        }
        interface Response {
            user?: IAuthUser
        }
    }
}
export { };