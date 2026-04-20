import axiosInstance from './axiosInstance';

// Define a consistent return type for all API calls
export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    status: number;
}

const apiWrapper = {
    get: async <T>(url: string, params?: object): Promise<ApiResponse<T>> => {
        const response = await axiosInstance.get<T>(url, { params });
        return {
            data: response.data,
            status: response.status,
        };
    },

    post: async <T>(url: string, body: object): Promise<ApiResponse<T>> => {
        const response = await axiosInstance.post<T>(url, body);
        return {
            data: response.data,
            status: response.status,
        };
    },

    put: async <T>(url: string, body: object): Promise<ApiResponse<T>> => {
        const response = await axiosInstance.put<T>(url, body);
        return {
            data: response.data,
            status: response.status,
        };
    },

    patch: async <T>(url: string, body: object): Promise<ApiResponse<T>> => {
        const response = await axiosInstance.patch<T>(url, body);
        return {
            data: response.data,
            status: response.status,
        };
    },

    delete: async <T>(url: string): Promise<ApiResponse<T>> => {
        const response = await axiosInstance.delete<T>(url);
        return {
            data: response.data,
            status: response.status,
        };
    },
};

export default apiWrapper;