import { useDispatch } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';
import { signIn } from '../redux/reducers/authReducer';
import { OZshop } from '../types/reduxTypes';
import { UserPermissions } from '../types/stateTypes';

export const useAuth = () => {
    const dispatch = useDispatch();
    const [ready, setReady] = useState<boolean>(false);

    const login = useCallback((jwtToken: string, id: string, permissions: keyof typeof UserPermissions) => {
        dispatch(signIn(jwtToken, id, permissions));

        localStorage.setItem(OZshop, JSON.stringify({
            userId: id, token: jwtToken, permissions
        }));
    }, []);

    // auto save data from local storage into local state
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(OZshop) || '{}');

        if(data && data.token) {
            login(data.token, data.userId, data.permissions);
        }
        setReady(true);
    }, [login]);

    return { login, ready }
}