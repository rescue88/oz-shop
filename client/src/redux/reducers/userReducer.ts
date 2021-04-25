enum UserPermissions {
    'user',
    'moder',
    'admin'
}

type UserStateType = {
    permissons: typeof UserPermissions | null;
    name: string | null;
    email: string | null;
    login: string | null;
    phone: string | null;
    created: number | null;
    favorites: Array<any>;
}

/* ACTIONS */
const GET_USER_DATA: string = 'authReducer/SET-USER-DATA';

/* INITIAL STATE */
const userState: UserStateType = {
    permissons: null,
    name: null,
    email: null,
    login: null,
    phone: null,
    created: null,
    favorites: [],
}
/* ACTION CREATORS */
export const getUserDataActionCreator = (payload: any) => {
    return {
        type: GET_USER_DATA,
        payload
    }
}

/* THUNKS */

/* REDUCER */
export const userReducer = (state: UserStateType = userState, action: any) => {
    switch(action.type) {
        case GET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

