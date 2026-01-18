import { createAsyncThunk } from '@reduxjs/toolkit';
import apiWrapper from '../../apiHandler/api';
interface LoginResponse {
    token: string;
}
// Async Thunk for Login
export const loginUser = createAsyncThunk<
    LoginResponse,
    { email: string; password: string },
    { rejectValue: string }
>(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await apiWrapper.post<LoginResponse>(
                '/auth/login',
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