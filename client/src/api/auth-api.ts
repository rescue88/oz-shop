import { axiosInstance } from './api';

export const authAPI = {
    login(login: string, password: string) {
        return axiosInstance.post<any>(`auth/login`, {login, password}).then(res => res.data);
    },
    register(name: string, email: string, login: string, phone: string, password: string) {
        return axiosInstance.post<any>(`auth/register`, {name, email, login, phone, password});
    }
}