import { SnackbarStateType, SnackbarType } from './../../types/stateTypes';

/* ACTIONS */
const SET_SNACKBAR = 'snackbarReducer/SET_SNACKBAR';

/* INITIAL STATE */
const snackbarState: SnackbarStateType = {
    snackbarOpen: false,
    snackbarType: 'success',
    snackbarMessage: ''
}

/* ACTION CREATORS */
export const setSnackbar = (snackbarOpen: boolean, snackbarType: SnackbarType, snackbarMessage: string) => ({
    type: SET_SNACKBAR,
    snackbarOpen,
    snackbarType,
    snackbarMessage
});

/* REDUCER */
export const snackbarReducer = (state: SnackbarStateType = snackbarState, action: any) => {
    switch(action.type) {
        case SET_SNACKBAR:
            const { snackbarOpen, snackbarType, snackbarMessage } = action;
            return {
                ...state,
                snackbarOpen,
                snackbarType,
                snackbarMessage
            }
        default:
            return state;
    }
}