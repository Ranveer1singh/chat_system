import { createSlice } from '@reduxjs/toolkit'
import type { IMessage } from '@repo/types';
import {  sendMessagee } from './thunk';

interface MessageState {
    messages: { success: boolean, messages: IMessage[] };
    loading: boolean;
    error: string | null;
}
const initialState: MessageState = {
    messages: { success: false, messages: [] },
    loading: false,
    error: null,
};
const messageSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        // clearCurrentChat: (state) => {
        //     state.currentChat = null;
        // },
        // clearChatError: (state) => {
        //     state.error = null;
        // },
        addMessage: (state, action) => {
            state.messages.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessagee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendMessagee.fulfilled, (state, action) => {
                state.loading = false;
                state.messages.messages.push(action.payload.messages);
            })
            .addCase(sendMessagee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to send message";
            });
        builder
            .addCase(sendMessagee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendMessagee.fulfilled, (state, action) => {
                state.loading = false;
                state.messages.messages.push(action.payload.messages);
            })
            .addCase(sendMessagee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to send message";
            });
    },
});

export const { addMessage } = messageSlice.actions;
// export const { clearCurrentChat, clearChatError, addMessage } = chatSlice.actions;
export default messageSlice.reducer;