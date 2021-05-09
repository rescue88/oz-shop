import { axiosInstance } from './api';

export const userAPI = {
    async getUserInfo(id: string) {
        const response = await axiosInstance.get<any>(`user/${id}`);
        return response.data;
    },
    async updateProfile(id: string, userData: FormData) {
        const response = await axiosInstance.put<any>(`user/update/${id}`, userData);
        return response.data;
    }
}