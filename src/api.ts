import axios from 'axios';

const URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const register = (data: any) => api.post('/accounts/register/', data);
export const login = (data: any) => api.post('/token/', data);
export const applyForInternship = (id: number, data: any, token: string) => {
    api.post(`/internships/${id}/apply/`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}