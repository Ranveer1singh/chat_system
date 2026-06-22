// import { createAsyncThunk } from "@reduxjs/toolkit";
// import apiWrapper from "../../apiHandler/api";
// import type { IMessage, ICreateMessage } from "@repo/types";

// export const getMessagesByChat = createAsyncThunk<
//     { success: boolean, messages: IMessage[] },
//     { chatId: string },
//     { rejectValue: string }
// >(
//     'chat/getMessagesByChat',
//     async (credentials, { rejectWithValue }) => {
//         try {
//             const response = await apiWrapper.get<{ success: boolean, data: IMessage[] }>(
//                 `/chat/${credentials.chatId}/messages`
//             );
//             const data = {
//                 success: response.data.success,
//                 messages: response.data.data
//             }
//             return data;
//         } catch (err: any) {
//             return rejectWithValue(
//                 err?.response?.data?.message ?? 'Failed to fetch messages'
//             );
//         }
//     }
// );

// export const sendMessage = createAsyncThunk<
//     IMessage,
//     ICreateMessage,
//     { rejectValue: string }
// >(
//     'chat/sendMessage',
//     async (messagePayload, { rejectWithValue }) => {
//         try {
//             const response = await apiWrapper.post<IMessage>(
//                 '/message',
//                 messagePayload
//             );
//             return response.data;
//         } catch (err: any) {
//             return rejectWithValue(
//                 err?.response?.data?.message ?? 'Failed to send message'
//             );
//         }
//     }
// );
