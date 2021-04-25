type AuthStateType = {
    token: null | string,
    isAuth: boolean,
    isLoading?: boolean
}
/* ACTIONS */
const SIGN_IN: string = 'authReducer/SET-USER-DATA';

/* INITIAL STATE */
const authState: AuthStateType = {
    token: null,
    isAuth: false,
    isLoading: false
}

/* ACTION CREATORS */
export const signInActionCreator = (payload: any) => {
    return {
        type: SIGN_IN,
        payload
    }
}

/* THUNKS */
export const login = () => {
    
}

/* REDUCER */

export const authReducer = (state: AuthStateType = authState, action: any) => {
    switch(action.type) {
        case SIGN_IN:
            return {
                ...state,
                ...action.playload
            }
        default:
            return state;
    }
}