import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../service/auth/reducer.ts';
import chatReducer from '../service/chat/reducer.ts';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
