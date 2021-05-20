import { StorageItemType } from './../../types/common';
import { OZshop, OZshopCart } from "../../types/reduxTypes";
import { CartProdutType, CartStateType, ProductItemType, UserPermissionType } from '../../types/stateTypes';
import { addToFavorites } from '../../redux/reducers/userReducer';
import { addProductToCart } from '../../redux/reducers/cartReducer';
import { setSnackbar } from '../../redux/reducers/snackbarReducer';

type UserGroupsType = {
    [key in UserPermissionType]: string;
}

export const userGroups: UserGroupsType = {
    user: 'користувач',
    admin: 'адмін',
    moder: 'модератор',
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

export const addToFavoritesHelper = async (dispatch: any, favorite: ProductItemType) => {
    const userId = getStorageItem()!.userId;
    const {_id, image, name, price, amount} = favorite;

    await dispatch(addToFavorites(userId, {_id, image, name, price, amount}));
}

export const addToCartHelper = async (dispatch: any, product: CartProdutType) => {
    dispatch(addProductToCart(product));
    dispatch(setSnackbar(true, 'success', "Товар успішно додано до корзини"));
}

// helpers to work with a cart in local storage
export const getStorageCart = (): CartStateType | null => {
    const data: CartStateType = JSON.parse(localStorage.getItem(OZshopCart) || 'null');

    if(data && data.items) {
        return data;
    }

    return null;
}

export const setStorageCart = (cart: CartStateType): void => {
    localStorage.setItem(OZshopCart, JSON.stringify({
        items: cart.items,
        totalCount: cart.totalCount,
        totalPrice: cart.totalPrice
    } as CartStateType));
}

export const removeStorageCart = (): void => {
    localStorage.removeItem(OZshopCart);
}