import { UserStateType } from './../../types/stateTypes';

/* ACTIONS */
const SET_USER_DATA: string = 'authReducer/SET-USER-DATA';

/* INITIAL STATE */
const userState: UserStateType = {
    avatar: null,
    permissons: null,
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

/* THUNKS */

/* REDUCER */
export const userReducer = (state: UserStateType = userState, action: any) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

