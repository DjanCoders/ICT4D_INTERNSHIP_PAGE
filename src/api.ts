import axios from 'axios';
import { useAuth } from './contexts/AuthContext';

const URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    config => {
        const { token } = useAuth();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    async error => {
        const { config, response } = error;
        const originalRequest = config;

        if (response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { refreshAccessToken } = useAuth();
                await refreshAccessToken();
                const newToken = localStorage.getItem('token');

                if (newToken) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const register = (data: any) => api.post('/accounts/register/', data);
export const login = (data: any) => api.post('/token/', data);
export const refreshToken = (refreshToken: string) => api.post('/token/refresh/', { refresh: refreshToken });
export const getInternships = () => api.get('/internships/');
export const applyForInternship = (id: number, data: any, token: string) => {
    return api.post(`/internships/${id}/apply/`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
