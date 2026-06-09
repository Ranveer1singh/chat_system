import { createAsyncThunk } from "@reduxjs/toolkit";
import apiWrapper from "../../apiHandler/api";
import type { IChat, ICreateChat } from "@repo/types";
export const createChat = createAsyncThunk<
    IChat,
    ICreateChat,
    { rejectValue: string }
>(
    'chat/createChat',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await apiWrapper.post<IChat>(
                '/chat',
                credentials
            );
            return response.data;
        } catch (err: any) {
            return rejectWithValue(
                err?.response?.data?.message ?? 'Failed to create chat'
            );
        }
    }
);
export const getChatByUserId = createAsyncThunk<
    { success: boolean, chats: IChat[] },
    { userId: string },
    { rejectValue: string }
>(
    'chat/getChatByUserId',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await apiWrapper.get<{ success: boolean, data: IChat[] }>(
                '/chat/user/' + credentials.userId
            );
            // console.log("response from getChatByUserId", response.data);
            const data = {
                success: response.data.success,
                chats: response.data.data
            }
            return data;
        } catch (err: any) {
            return rejectWithValue(
                err?.response?.data?.message ?? 'Failed to fetch user chat'
            );
        }
    }
);
