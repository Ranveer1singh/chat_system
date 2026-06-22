import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IAuthUser } from "@repo/types";
import { getLogedInUser } from "../../../backendHelper/auth/backend_helper";

export const GetLoggedInUser = createAsyncThunk<
    { sucess: boolean, user: IAuthUser },
    void,
    { rejectValue: string }
>(
    'auth/getLoggedInUser',
    async (_: void, { rejectWithValue }) => {
        try {
            const response = await getLogedInUser();
            return response.data
        } catch (err: any) {
            return rejectWithValue(
                err?.response?.data?.message ?? 'Failed to fetch logged-in user'
            );
        }
    }
);