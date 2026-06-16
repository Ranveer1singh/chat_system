import apiWrapper from "../../apiHandler/api"
import type { IChat, ICreateChat } from "@repo/types";

import * as url from "./urlHelper"

export const create_Chat= async (payload: ICreateChat) => {
    return await apiWrapper.post<{success : boolean ,data :IChat}>(url.CREATE_CHAT_URL, payload)
}
export const getChatByUserId = async (userId: string) => {
    return await apiWrapper.get(url.GET_CHAT_BY_USER_ID(userId))
}