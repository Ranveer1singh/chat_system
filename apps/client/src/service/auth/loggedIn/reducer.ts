import { createSlice } from "@reduxjs/toolkit";
import type { IAuthUser } from "@repo/types";
import { GetLoggedInUser } from "./thunk";

interface LoggedInUserState {
    loggedInUser: IAuthUser | null;
    loading: boolean;
    error: string | null;
}

const initialState: LoggedInUserState = {
    loggedInUser:  null,
    loading: false,
    error: null,    
}
const loggedInUserSlice = createSlice({
    name: "loggedInUser",
    initialState,
    reducers: {
        clearLoggedInUserError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetLoggedInUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetLoggedInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.loggedInUser = action.payload.user;
            })
            .addCase(GetLoggedInUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch logged-in user";
            });
    }

})
export const { clearLoggedInUserError } = loggedInUserSlice.actions;
export default loggedInUserSlice.reducer;
