import { axiosInstance } from './api';

export const productAPI = {
    async getProducts() {
        const response = await axiosInstance.get<any>('product/');
        return response.data;
    },
    async getSingleProduct(productId: string) {
        const response = await axiosInstance.get<any>(`product/${productId}`);
        return response.data;
    }
}