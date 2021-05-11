import { axiosInstance } from './api';

export const productAPI = {
    async getProducts() {
        const response = await axiosInstance.get<any>(`product/`);
        return response.data;
    },
}