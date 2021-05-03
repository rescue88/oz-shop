import { setSnackbar } from './snackbarReducer';
import { authAPI } from './../../api/auth-api';
import { setUserData } from './userReducer';
import { AuthStateType, UserPermissions } from './../../types/stateTypes';
import { LoginResponse, OZshop, DefaultResponse } from './../../types/reduxTypes';

/* ACTIONS */
const SIGN_IN: string = 'authReducer/SIGN_IN';
const SIGN_OUT: string = 'authReducer/SIGN_OUT';
const SET_LOADING: string = 'authReducer/SET-LOADING';

/* INITIAL STATE */
const authState: AuthStateType = {
    token: null,
    userId: null,
    permissons: 'user',
    isAuth: false,
    isLoading: false
}

/* ACTION CREATORS */
export const signIn = (token: string, id: string, permissions: keyof typeof UserPermissions) => {
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
        localStorage.setItem(OZshop, JSON.stringify({
            token: data.token,
            userId: data.userId,
            permissions: data.permissions
        }));
        // set auth data
        dispatch(signIn(data.token, data.userId, data.permissions));
        // set user data
        dispatch(setUserData(data.user));
        // show a success message
        dispatch(setSnackbar(true, 'success', `Ласкаво просимо, ${data.user.login}.`));
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
            localStorage.removeItem(OZshop);
            return {
                ...state,
                isAuth: false
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