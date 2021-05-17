import { axiosInstance } from './api';

export const commentAPI = {
    async createComment(userId: string, productId: string, text: string, positive: boolean) {
        const response = await axiosInstance.post<any>('comment/create', { userId, productId, text, positive });
        return response.data;
    },
    async updateComment(userId: string, productId: string, text: string, positive: boolean) {
        const response = await axiosInstance.put<any>('comment/update', { userId, productId, text, positive });
        return response.data;
    },
}