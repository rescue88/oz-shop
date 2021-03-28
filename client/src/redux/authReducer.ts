type AuthStateType = {
    userId: string | null,
    email: string | null,
    login: string | null,
    token: string | null,
    isAuth: boolean,
    isFetching?: boolean
}
/* ACTIONS */
const SET_USER_DATA: string = 'authReducer/SET-USER-DATA';

/* INITIAL STATE */
let authState: AuthStateType = {
    userId: null,
    email: null,
    login: null,
    token: null,
    isAuth: false
}

/* ACTION CREATORS */

/* THUNKS */

/* REDUCER */

export const authReducer = (state: AuthStateType = authState, action: any) => {
    switch(action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.playload
            }
        }
        default:
            return state;
    }
}