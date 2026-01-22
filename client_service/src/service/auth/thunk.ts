import { createAsyncThunk } from '@reduxjs/toolkit';
import apiWrapper from '../../apiHandler/api';
interface LoginResponse {
    token: string;
}
interface User {
    _id: string;
    userName: string;
    fullName: string;
    phone: string;
    // add other fields your backend returns
}
type AllUsersResponse = User[];
// Async Thunk for Login
export const loginUser = createAsyncThunk<
    LoginResponse,
    { phone: string; password: string },
    { rejectValue: string }
>(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await apiWrapper.post<LoginResponse>(
                'user/signIn',
                credentials
            );
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(
                err?.response?.data?.message ?? 'Login Failed'
            );
        }
    }
);
export const createUser = createAsyncThunk<
    LoginResponse,
    { phone: string; password: string, fullName: string, userName: string },
    { rejectValue: string }
>(
    'auth/regiterUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await apiWrapper.post<LoginResponse>(
                '/user',
                credentials
            );
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(
                err?.response?.data?.message ?? 'Login Failed'
            );
        }
    }
);
export const allUser = createAsyncThunk<
    AllUsersResponse,
    void,
    { rejectValue: string }
>(
    'auth/allUser',
    async (_: void, { rejectWithValue }) => {
        try {
            const response = await apiWrapper.get<{ sucusse: boolean, data: AllUsersResponse }>('/user/allUser');
            return response.data.data
        } catch (err: any) {
            return rejectWithValue(
                err?.response?.data?.message ?? 'Failed to fetch users'
            );
        }
    }
);