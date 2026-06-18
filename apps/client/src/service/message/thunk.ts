import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICreateMessage, IMessage } from "@repo/types";
import { get_MessagesByChatId, send_Message } from "../../backendHelper/message/backend_helper";

export const sendMessagee = createAsyncThunk<
  { success: boolean; messages: IMessage },
  ICreateMessage,
  { rejectValue: string }
>("chat/createChat", async (credentials, { rejectWithValue }) => {
  try {
    const response = await send_Message(credentials)
    return response.data;
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message ?? "Failed to create chat",
    );
  }
});
export const getMessagesByChatId = createAsyncThunk<
    { success: boolean, messages: IMessage[] },
    { chatId: string },
    { rejectValue: string }
>(
    'chat/getMessagesByChat',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await get_MessagesByChatId(credentials.chatId)
            const data = {
                success: response.data.success,
                messages: response.data.data
            }
            return data;
        } catch (err: any) {
            return rejectWithValue(
                err?.response?.data?.message ?? 'Failed to fetch messages'
            );
        }
    }
);