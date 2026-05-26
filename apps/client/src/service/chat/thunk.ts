import { createAsyncThunk } from "@reduxjs/toolkit";
import apiWrapper from "../../apiHandler/api";
import { type IChat, type ICreateChat } from "@repo/types"
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