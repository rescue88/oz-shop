import { axiosInstance } from './api';

export const userAPI = {
    async getUserInfo(id: string) {
        const response = await axiosInstance.get<any>(`user/${id}`);
        return response.data;
    },
    async updateProfile(id: string, userData: FormData) {
        const response = await axiosInstance.put<any>(`user/update/${id}`, userData);
        return response.data;
    },
    async addToFavorites(userId: string, productId: string) {
        const response = await axiosInstance.post<any>(`user/favorites/add/${userId}`, {productId});
        return response.data;
    },
    async deleteFromFavorites(userId: string, productId: string) {
        const response = await axiosInstance.delete<any>(`user/favorites/delete?id=${userId}&productId=${productId}`);
        return response.data;
    },
    async addOrder(userId: string, products: Array<string>, price: number, deliveryAddress: string) {
        const response = await axiosInstance.post<any>('order/create', {
            user: userId,
            products,
            price,
            deliveryAddress
        });

        return response.data;
    }
}