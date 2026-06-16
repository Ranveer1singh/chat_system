import type { ICreateMessage, IMessage } from "@repo/types"
import apiWrapper from "../../apiHandler/api"

import * as url from "./urlHelper"

export const send_Message = async (credentials: ICreateMessage) => {
    return await apiWrapper.post<{ success: boolean; messages: IMessage }>(url.SENDMESSAGE, credentials)
}