import axios from 'axios';

const URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to attach the token
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
    response => response,
    async error => {
        const { config, response } = error;
        const originalRequest = config;

        if (response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Refresh token logic
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Refresh token request
                const refreshResponse = await axios.post('http://localhost:8000/api/token/refresh/', { refresh: refreshToken });
                const { access } = refreshResponse.data;

                // Save new token and retry original request
                localStorage.setItem('token', access);
                api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                // Optionally: redirect to login or clear authentication state
            }
        }

        return Promise.reject(error);
    }
);

export const login = async (data: { email: string, password: string }) => {
    const response = await api.post('/token/', data);
    const { refresh, access } = response.data;
    // Store tokens in localStorage
    localStorage.setItem('token', access);
    localStorage.setItem('refreshToken', refresh);
    return response;
};

export const register = (data: { email: string, password:string,username: string, first_name: string, last_name: string }) => api.post('/accounts/register/', data);
export const refreshToken = (refreshToken: string) => api.post('/token/refresh/', { refresh: refreshToken });
export const getInternships = () => api.get('/internships/');
export const getProfile = () => api.get('/accounts/profiles/');
export const applyForInternship = (id: number, data: any, token: string) => {
    return api.post(`/internships/${id}/apply/`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export default api;