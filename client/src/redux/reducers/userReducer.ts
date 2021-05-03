import { UserStateType } from './../../types/stateTypes';

/* ACTIONS */
const SET_USER_DATA: string = 'userReducer/SET-USER-DATA';
const CLEAR_USER_DATA: string = 'userReducer/CLEAR_USER_DATA';

/* INITIAL STATE */
const userState: UserStateType = {
    avatar: null,
    name: null,
    email: null,
    login: null,
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
                ...userState
            }
        default:
            return state;
    }
}

