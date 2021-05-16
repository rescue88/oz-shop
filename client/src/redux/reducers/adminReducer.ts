import { getStorageItem } from './../../assets/helpers/helpers';
import { DefaultResponse, GetUsersResponse } from './../../types/reduxTypes';
import { AdminStateType, ChangeUsersPageType } from '../../types/stateTypes';
import { adminAPI } from './../../api/admin-api';
import { setSnackbar } from './snackbarReducer';
import { getProducts } from './productReducer';
import { getDiscounts } from './discountReducer';

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
// users logic
export const getUsers = () => async (dispatch: Function) => {
    const data: GetUsersResponse = await adminAPI.getUsers().catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {;
        dispatch(setUsers(data.users));
    }
}

export const deleteUser = (id: string) => async (dispatch: Function) => {
    const {userId} = getStorageItem()!;
    if(id === userId) {
        dispatch(setSnackbar(true, 'error', 'Відмовлено у видаленні свого акаунту'));
        return;
    }
    
    const data: DefaultResponse = await adminAPI.deleteProfile(id).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(getUsers());
        dispatch(setSnackbar(true, 'success', data.message));
    }
}

// products logic
export const createProduct = (productData: FormData) => async (dispatch: Function) => {
    const data: DefaultResponse = await adminAPI.createProduct(productData).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(getProducts());
        dispatch(setSnackbar(true, 'success', data.message));
    }
}

export const updateProduct = (id: string, productData: FormData) => async (dispatch: Function) => {
    const data: DefaultResponse = await adminAPI.updateProduct(id, productData).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(getProducts());
        dispatch(setSnackbar(true, 'success', data.message));
    }
}

export const deleteProduct = (id: string) => async (dispatch: Function) => {
    const data: DefaultResponse = await adminAPI.deleteProduct(id).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(getProducts());
        dispatch(setSnackbar(true, 'success', data.message));
    }
}

// discounts logic
export const createDiscount = (discountData: FormData) => async (dispatch: Function) => {
    const data: DefaultResponse = await adminAPI.createDiscount(discountData).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(getDiscounts());
        dispatch(setSnackbar(true, 'success', data.message));
    }
}

export const updateDiscount = (discountId: string, discountData: FormData) => async (dispatch: Function) => {
    const data: DefaultResponse = await adminAPI.updateDiscount(discountId, discountData).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(getDiscounts());
        dispatch(setSnackbar(true, 'success', data.message));
    }
}

export const deleteDiscount = (discountId: string) => async (dispatch: Function) => {
    const data: DefaultResponse = await adminAPI.deleteDiscount(discountId).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(getDiscounts());
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

