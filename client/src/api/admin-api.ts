import { createDiscount } from '../redux/reducers/adminReducer';
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
    async getDiscounts() {
        const response = await axiosInstance.get<any>('discount/');
        return response.data;
    },
    async createDiscount(discountData: FormData) {
        const response = await axiosInstance.post<any>('discount/create', discountData);
        return response.data;
    }
}