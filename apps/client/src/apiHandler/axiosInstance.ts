import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const requestUrl = String(error.config?.url ?? '');
        const isPublicAuthRequest = requestUrl.includes('user/signIn') || requestUrl === '/user';

        if (error.response?.status === 401 && !isPublicAuthRequest && window.location.pathname !== '/login') {
            window.location.href = '/login';
        }

        // Customize the error message based on backend response
        const message = error.response?.data?.message || 'Something went wrong';
        return Promise.reject(message);
    }
);

export default axiosInstance;
