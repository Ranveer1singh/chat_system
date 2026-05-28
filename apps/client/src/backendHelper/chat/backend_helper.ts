import apiWrapper from "../../apiHandler/api"
import type { ICreateChat } from "@repo/types";

import * as url from "./urlHelper"

export const createChat = async (payload: ICreateChat) => {
    return await apiWrapper.post<ICreateChat>(url.CREATE_CHAT_URL, payload)
}
export const getChatByUserId = async (userId: string) => {
    return await apiWrapper.get(url.GET_CHAT_BY_USER_ID(userId))
}