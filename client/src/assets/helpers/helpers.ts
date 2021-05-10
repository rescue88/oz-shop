import { StorageItemType } from './../../types/common';
import { OZshop } from "../../types/reduxTypes";
import { UserPermissions } from '../../types/stateTypes';

type UserGroupsType = {
    [key in keyof typeof UserPermissions]: string;
}

export const userGroups: UserGroupsType = {
    user: 'користувач',
    admin: 'адмін',
    moder: 'контент-менеджер',
}

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
    bytes.forEach((b) => binary += String.fromCharCode(b));
    
    return `data:image/*;base64, ${btoa(binary)}`;
}