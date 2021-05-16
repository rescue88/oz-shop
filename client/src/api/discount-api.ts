import { axiosInstance } from './api';

export const discountAPI = {
    async getDiscounts() {
        const response = await axiosInstance.get<any>('discount/');
        return response.data;
    },
}