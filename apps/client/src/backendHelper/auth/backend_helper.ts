import apiWrapper from "../../apiHandler/api"

import * as url from "./urlHelper"

export const login = async (credentials: { phone: string; password: string }) => {
    return await apiWrapper.post<{ token: string }>(url.LOGIN_URL, credentials)
}
export const getAllUsers = async () => {
    return await apiWrapper.get<unknown>(url.ALL_USERS_URL)
}