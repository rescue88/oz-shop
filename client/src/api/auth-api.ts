import { axiosInstance } from './api';

export const authAPI = {
    async login(login: string, password: string) {
        let response = await axiosInstance.post<any>('auth/login', { login, password });
        return response.data;
    },
    async register(name: string, email: string, login: string, phone: string, password: string) {
        let response = await axiosInstance.post<any>(`auth/register`, { name, email, login, phone, password });
        return response.data;
    },
}