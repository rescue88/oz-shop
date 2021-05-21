import { OrderStatusType } from '../types/stateTypes';
import { axiosInstance } from './api';

export const adminAPI = {
    // users
    async getUsers() {
        const response = await axiosInstance.get<any>(`user/`);
        return response.data;
    },
    async deleteProfile(id: string) {
        const response = await axiosInstance.delete<any>(`user/delete/${id}`);
        return response.data;
    },
    // products
    async createProduct(productData: FormData) {
        const response = await axiosInstance.post<any>(`product/create/`, productData);
        return response.data;
    }, 
    async updateProduct(id: string, productData: FormData) {
        const response = await axiosInstance.put<any>(`product/update/${id}`, productData);
        return response.data;
    }, 
    async deleteProduct(id: string) {
        const response = await axiosInstance.delete<any>(`product/delete/${id}`);
        return response.data;
    },
    // discounts
    async createDiscount(discountData: FormData) {
        const response = await axiosInstance.post<any>('discount/create', discountData);
        return response.data;
    },
    async updateDiscount(discountId: string, discountData: FormData) {
        const response = await axiosInstance.put<any>(`discount/update/${discountId}`, discountData);
        return response.data;
    },
    async deleteDiscount(discountId: string) {
        const response = await axiosInstance.delete<any>(`discount/delete/${discountId}`);
        return response.data;
    },
    // orders
    async getOrders(status: OrderStatusType | null = null) {
        let queryStr: string = 'order';
        if(status !== null) queryStr = `order?status=${status}`;

        const response = await axiosInstance.get<any>(queryStr);

        return response.data;
    },
}