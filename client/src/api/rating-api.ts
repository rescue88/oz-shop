import { axiosInstance } from './api';

export const ratingAPI = {
    async getOwnRating(userId: string, productId: string) {
        const response = await axiosInstance.get<any>(`rating/own?userId=${userId}&productId=${productId}`);
        return response.data;
    },
    async addRating(userId: string, productId: string, mark: number) {
        const response = await axiosInstance.post<any>('rating/create', {userId, productId, mark});
        return response.data;
    },
    async updateRating(userId: string, productId: string, mark: number) {
        const response = await axiosInstance.put<any>('rating/update', {userId, productId, mark});
        return response.data;
    },
    async deleteRating(userId: string, productId: string) {
        const response = await axiosInstance.delete<any>(`rating/delete?userId=${userId}&productId=${productId}`);
        return response.data;
    }
}