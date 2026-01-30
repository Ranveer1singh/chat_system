import apiWrapper from "../../apiHandler/api"

import * as url from "./urlHelper"

export const login = async (credentials: { phone: string; password: string }) => {
    return await apiWrapper.post<{ token: string }>(url.LOGIN_URL, credentials)
}