import { DefaultResponse } from './../../types/reduxTypes';
import { userAPI } from '../../api/user-api';
import { UserDataResponse } from '../../types/reduxTypes';
import { UserStateType } from './../../types/stateTypes';
import { setSnackbar } from './snackbarReducer';

/* ACTIONS */
const SET_USER_DATA: string = 'userReducer/SET-USER-DATA';
const CLEAR_USER_DATA: string = 'userReducer/CLEAR_USER_DATA';

/* INITIAL STATE */
const userState: UserStateType = {
    avatar: null,
    name: null,
    email: null,
    login: null,
    permissons: 'user',
    phone: null,
    created: null,
    favorites: [],
}
/* ACTION CREATORS */
export const setUserData = (payload: UserStateType) => {
    return {
        type: SET_USER_DATA,
        payload
    }
}

export const clearUserData = () => {
    return {
        type: CLEAR_USER_DATA
    }
}

/* THUNKS */
export const getUserData = (id: string) => async (dispatch: Function) => {
    const data: UserDataResponse = await userAPI.getUserInfo(id).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    // console.log(data);
    if(data && data.success) {
        dispatch(setUserData(data.user));
    }
}

export const updateUserData = (id: string, photo: any, login: string, email: string, name: string, phone: string) => async (dispatch: Function) => {
    const data: DefaultResponse = await userAPI.updateProfile(id, photo, login, email, name, phone).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message)); 
    });

    // console.log(data);
    if(data && data.success) {
        dispatch(setSnackbar(true, 'success', data.message));
    }
}

/* REDUCER */
export const userReducer = (state: UserStateType = userState, action: any) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case CLEAR_USER_DATA:
            return {
                ...state,
                ...userState
            }
        default:
            return state;
    }
}

