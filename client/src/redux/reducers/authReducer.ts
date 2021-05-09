import { removeStorageItem, setStorageItem } from './../../assets/helpers/helpers';
import { setSnackbar } from './snackbarReducer';
import { authAPI } from './../../api/auth-api';
import { AuthStateType } from './../../types/stateTypes';
import { LoginResponse, OZshop, DefaultResponse } from './../../types/reduxTypes';
import { getUserData } from './userReducer';

/* ACTIONS */
const SIGN_IN: string = 'authReducer/SIGN_IN';
const SIGN_OUT: string = 'authReducer/SIGN_OUT';
const SET_LOADING: string = 'authReducer/SET-LOADING';

/* INITIAL STATE */
const authState: AuthStateType = {
    token: null,
    userId: null,
    isAuth: false,
    isLoading: false
}

/* ACTION CREATORS */
export const signIn = (token: string, id: string) => {
    return {
        type: SIGN_IN,
        token,
        id
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const setAuthLoading = (payload: boolean) => {
    return {
        type: SET_LOADING,
        payload
    }
}

/* THUNKS */
export const login = (login: string, password: string) => async (dispatch: Function) => {
    const data: LoginResponse = await authAPI.login(login, password).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        // write user id and token into local storage
        setStorageItem(data.userId, data.token);
        // set user data
        await dispatch(getUserData(data.userId));
        // set auth data
        dispatch(signIn(data.token, data.userId));
        // show a success message
        dispatch(setSnackbar(true, 'success', 'Успішна авторизація! Ласкаво просимо'));
    }
}

export const register = (login: string, email: string, name: string, phone: string, password: string) => async (dispatch: Function) => {
    const data: DefaultResponse = await authAPI.register(login, email, name, phone, password).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        // tell that user is created
        dispatch(setSnackbar(true, 'success', data.message));
    }
}

/* REDUCER */
export const authReducer = (state: AuthStateType = authState, action: any) => {
    switch(action.type) {
        case SIGN_IN:
            return {
                ...state,
                isAuth: true,
                token: action.token,
                userId: action.id
            }
        case SIGN_OUT:
            // clear local storage
            removeStorageItem();
            return {
                ...state,
                ...authState
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state;
    }
}