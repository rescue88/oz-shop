import { setSnackbar } from './snackbarReducer';
import { authAPI } from './../../api/auth-api';
import { setUserData } from './userReducer';
import { AuthStateType } from './../../types/stateTypes';
import { LoginResponse, OZshop } from './../../types/reduxTypes';

/* ACTIONS */
const SIGN_IN: string = 'authReducer/SIGN_IN';
const SIGN_OUT: string = 'authReducer/SIGN_OUT';
const SET_LOADING: string = 'authReducer/SET-LOADING';

/* INITIAL STATE */
const authState: AuthStateType = {
    isAuth: false,
    isLoading: false
}

/* ACTION CREATORS */
export const signIn = () => {
    return {
        type: SIGN_IN
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const setLoading = (payload: boolean) => {
    return {
        type: SET_LOADING,
        payload
    }
}

/* THUNKS */
export const login = (login: string, password: string) => async (dispatch: Function) => {
    let data: LoginResponse = await authAPI.login(login, password).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        // write user id and token into local storage
        localStorage.setItem(OZshop, JSON.stringify({
            token: data.token,
            userId: data.userId
        }));
        // set auth flag into true
        dispatch(signIn());
        // set user own data
        dispatch(setUserData(data.user));
        // show a success message
        dispatch(setSnackbar(true, 'success', `Ласкаво просимо, ${data.user.login}`));
    }
}

// export const register = (name: string, email: string, login: string, phone: string, password: string) => dispatch => {
    
// }

/* REDUCER */

export const authReducer = (state: AuthStateType = authState, action: any) => {
    switch(action.type) {
        case SIGN_IN:
            return {
                ...state,
                isAuth: true
            }
        case SIGN_OUT:
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