import { axiosInstance } from './api';

export const adminAPI = {
    async getUsers() {
        const response = await axiosInstance.get<any>(`user/`);
        return response.data;
    },
    async deleteProfile(id: string) {
        const response = await axiosInstance.delete<any>(`user/delete/${id}`);
        return response.data;
    }
}