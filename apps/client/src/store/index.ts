import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../service/auth/reducer.ts';
import chatReducer from '../service/chat/reducer.ts';
import messageReducer from "../service/message/reducer.ts"
import loggedInUserReducer from '../service/auth/loggedIn/reducer.ts';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        loggedInUser: loggedInUserReducer,
        chat: chatReducer,
        message: messageReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
