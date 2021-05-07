import { StorageItemType } from './../../types/common';
import { OZshop } from "../../types/reduxTypes";

// get storage data
export const getStorageItem = (): StorageItemType => {
    const data: StorageItemType = JSON.parse(localStorage.getItem(OZshop) || 'null');

    if(data && data.token) {
        return data;
    }

    return null;
}
// set storage data
export const setStorageItem = (userId: string, token: string): void => {
    localStorage.setItem(OZshop, JSON.stringify({
        userId, token
    }));
}
// remove OZshop key
export const removeStorageItem = (): void => {
    localStorage.removeItem(OZshop);
}