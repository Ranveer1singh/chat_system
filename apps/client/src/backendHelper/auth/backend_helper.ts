import type { IAuthUser } from "@repo/types";
import apiWrapper from "../../apiHandler/api"

import * as url from "./urlHelper"

export const login = async (credentials: { phone: string; password: string }) => {
    return await apiWrapper.post<{ token: string }>(url.LOGIN_URL, credentials)
}
export const getAllUsers = async () => {
    return await apiWrapper.get<unknown>(url.ALL_USERS_URL)
}
export const getLogedInUser = async () => {
    return await apiWrapper.get<{ sucess: boolean, user: IAuthUser }>(url.LOGED_IN_USER_URL)
}