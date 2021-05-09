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

// convert Buffer type into base64
export const convertBuffer = (image: any): string => {
    let binary: string = '';

    let bytes: Array<any> = [].slice.call(new Uint8Array(image));
    console.log('bytes', bytes);
    bytes.forEach((b) => binary += String.fromCharCode(b));
    
    return `data:image/*;base64, ${btoa(binary)}`;
}