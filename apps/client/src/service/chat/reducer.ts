import { createSlice } from '@reduxjs/toolkit'
import type { IChat, IMessage } from '@repo/types';
import { createChat, getChatByUserId } from './thunk';
import { getMessagesByChat, sendMessage } from './messageThunk';

interface ChatState {
    currentChat: IChat | null;
    allChats: { success: boolean, chats: IChat[] };
    messages: { success: boolean, messages: IMessage[] };
    loading: boolean;
    error: string | null;
}
const initialState: ChatState = {
    currentChat: null,
    allChats: { success: false, chats: [] },
    messages: { success: false, messages: [] },
    loading: false,
    error: null,
};
const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        clearCurrentChat: (state) => {
            state.currentChat = null;
        },
        clearChatError: (state) => {
            state.error = null;
        },
        addMessage: (state, action) => {
            state.messages.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createChat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createChat.fulfilled, (state, action) => {
                state.loading = false;
                state.currentChat = action.payload;
            })
            .addCase(createChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to create chat";
            });
        builder
            .addCase(getChatByUserId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getChatByUserId.fulfilled, (state, action) => {
                state.loading = false;
                state.allChats = action.payload;

            })
            .addCase(getChatByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch user chat";
            });
        builder
            .addCase(getMessagesByChat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMessagesByChat.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(getMessagesByChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch messages";
            });
        builder
            .addCase(sendMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.messages.messages.push(action.payload);
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to send message";
            });
    },
});

export const { clearCurrentChat, clearChatError, addMessage } = chatSlice.actions;
export default chatSlice.reducer;