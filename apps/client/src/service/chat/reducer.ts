import { createSlice } from '@reduxjs/toolkit'
import type { IChat } from '@repo/types';
import { createChat } from './thunk';

interface ChatState {
    currentChat: IChat | null;
    loading: boolean;
    error: string | null;
}
const initialState: ChatState = {
    currentChat: null,
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
    },
});

export const { clearCurrentChat, clearChatError } = chatSlice.actions;
export default chatSlice.reducer;