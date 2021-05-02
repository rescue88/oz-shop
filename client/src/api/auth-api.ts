import { axiosInstance } from './api';

export const authAPI = {
    async login(login: string, password: string) {
        let response = await axiosInstance.post<any>('auth/login', { login, password });
        return response.data;
    },
    async register(login: string, email: string, name: string, phone: string, password: string) {
        let response = await axiosInstance.post<any>(`auth/register`, { login, email, name, phone, password });
        return response.data;
    },
}