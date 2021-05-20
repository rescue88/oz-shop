import { useDispatch } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';

import { signIn } from '../redux/reducers/authReducer';
import { getUserData } from '../redux/reducers/userReducer';
import { StorageItemType } from './../types/common';
import { getStorageCart, getStorageItem, setStorageItem } from './../assets/helpers/helpers';
import { getDiscounts } from '../redux/reducers/discountReducer';
import { CartStateType } from '../types/stateTypes';
import { insertWholeCartData } from '../redux/reducers/cartReducer';

export const useAuth = () => {
    const dispatch = useDispatch();
    const [ready, setReady] = useState<boolean>(false);

    const login = useCallback(async (jwtToken: string, id: string) => {
        await dispatch(getUserData(id));
        await dispatch(getDiscounts());

        dispatch(signIn());

        setStorageItem(id, jwtToken);
        setReady(true);
    }, [dispatch]);

    // auto save data from local storage into local state
    useEffect(() => {
        const data: StorageItemType = getStorageItem();
        const cartData: CartStateType | null = getStorageCart();

        // if user has some products in a local storage, load them into state
        if(cartData !== null) {
            dispatch(insertWholeCartData(cartData));
        }
        // if user has token in a local storage, give him all necessary data
        if(data && data.token) {
            login(data.token, data.userId);
        } else {
            setReady(true);
        }
    }, [login]);

    return { login, ready }
}