import { useDispatch } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';

import { signIn } from '../redux/reducers/authReducer';
import { getUserData } from '../redux/reducers/userReducer';
import { StorageItemType } from './../types/common';
import { getStorageItem, setStorageItem } from './../assets/helpers/helpers';

export const useAuth = () => {
    const dispatch = useDispatch();
    const [ready, setReady] = useState<boolean>(false);

    const login = useCallback(async (jwtToken: string, id: string) => {
        await dispatch(getUserData(id));

        dispatch(signIn(jwtToken, id));

        setStorageItem(id, jwtToken);
        setReady(true);
    }, []);

    // auto save data from local storage into local state
    useEffect(() => {
        const data: StorageItemType = getStorageItem();

        if(data && data.token) {
            login(data.token, data.userId);
        } else {
            setReady(true);
        }
    }, [login]);

    return { login, ready }
}