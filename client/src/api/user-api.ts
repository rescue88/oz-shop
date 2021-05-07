import { axiosInstance } from './api';

export const userAPI = {
    async getUserInfo(id: string) {
        const response = await axiosInstance.get<any>(`user/${id}`);
        return response.data;
    },
    async updateProfile(id: string, photo: any, login: string, email: string, name: string, phone: string) {
        const response = await axiosInstance.put<any>(`user/update/${id}`, {photo, login, email, name, phone});
        return response.data;
    }
}