import { getStorageItem } from './../../assets/helpers/helpers';
import { DefaultResponse, GetUsersResponse } from './../../types/reduxTypes';
import { AdminStateType, ChangeUsersPageType } from '../../types/stateTypes';
import { adminAPI } from './../../api/admin-api';
import { setSnackbar } from './snackbarReducer';

/* ACTIONS */
const SET_USERS: string = 'adminReducer/changeUsers/SET_USERS';

/* INITIAL STATE */
const adminState: AdminStateType = {
    changeUsers: [],
}

/* ACTION CREATORS */
export const setUsers = (payload: Array<ChangeUsersPageType>) => {
    return {
        type: SET_USERS,
        payload
    }
}

/* THUNKS */
export const getUsers = () => async (dispatch: Function) => {
    const data: GetUsersResponse = await adminAPI.getUsers().catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {;
        dispatch(setUsers(data.users));
        dispatch(setSnackbar(true, 'success', data.message));
    }
}

export const deleteUser = (id: string) => async (dispatch: Function) => {
    const userId = getStorageItem()!.userId;
    if(id === userId) {
        console.log("here")
        dispatch(setSnackbar(true, 'error', 'Відмовлено у видаленні свого акаунту'));
        return;
    }
    
    const data: DefaultResponse = await adminAPI.deleteProfile(id).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        await dispatch(getUsers());
        dispatch(setSnackbar(true, 'success', data.message));
    }
}

/* REDUCER */
export const adminReducer = (state: AdminStateType = adminState, action: any) => {
    switch(action.type) {
        case SET_USERS:
            return {
                ...state,
                changeUsers: [...action.payload]
            }
        default:
            return state;
    }
}
