import { createSlice } from '@reduxjs/toolkit'
import type { IChat } from '@repo/types';
import { createChat, getChatByUserId } from './thunk';

interface ChatState {
    currentChat: IChat | null;
    allChats: { success: boolean, chats: IChat[] }; // Add this line to store all chats
    loading: boolean;
    error: string | null;
}
const initialState: ChatState = {
    currentChat: null,
    allChats: { success: false, chats: [] }, // Initialize the allChats object
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
    },
});

export const { clearCurrentChat, clearChatError } = chatSlice.actions;
export default chatSlice.reducer;