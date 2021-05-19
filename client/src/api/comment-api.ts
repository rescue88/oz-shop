import { getUserComments } from '../redux/reducers/commentReducer';
import { axiosInstance } from './api';

export const commentAPI = {
    async getProductComments(productId: string) {
        const response = await axiosInstance.get<any>(`comment/product?productId=${productId}`);
        return response.data;
    },
    async getUserComments(userId: string) {
        const response = await axiosInstance.get<any>(`comment/own?user=${userId}`);
        return response.data;
    },
    async createComment(userId: string, productId: string, text: string, positive: boolean) {
        const response = await axiosInstance.post<any>('comment/create', { userId, productId, text, positive });
        return response.data;
    },
    async updateComment(userId: string, productId: string, text: string, positive: boolean) {
        const response = await axiosInstance.put<any>('comment/update', { userId, productId, text, positive });
        return response.data;
    },
    async removeComment(userId: string, productId: string) {
        const response = await axiosInstance.delete<any>(`comment/delete?user=${userId}&product=${productId}`);
        return response.data;
    }
}