import { DefaultResponse, FavoritesResponse, OrderGetOwnResponseType, UserDataResponse } from './../../types/reduxTypes';
import { userAPI } from '../../api/user-api';
import { OrderUserItemType, UserFavoritesType, UserStateType } from './../../types/stateTypes';
import { setSnackbar } from './snackbarReducer';
import { clearCart } from './cartReducer';

/* ACTIONS */
const SET_USER_DATA: string = 'userReducer/SET-USER-DATA';
const CLEAR_USER_DATA: string = 'userReducer/CLEAR_USER_DATA';
const SET_FAVORITES: string = 'userReducer/SET_FAVORITES';
const DELETE_FAVORITES: string = 'userReducer/DELETE_FAVORITES';
const SET_ORDERS: string = 'userReducer/SET_ORDERS';
const CLEAR_ORDERS: string = 'userReducer/CLEAR_ORDERS';

/* INITIAL STATE */
const userState: UserStateType = {
    avatar: null,
    name: null,
    email: null,
    login: null,
    permissions: 'user',
    phone: null,
    created: null,
    favorites: [],
    orders: [],
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

export const setFavorites = (payload: UserFavoritesType) => {
    return {
        type:  SET_FAVORITES,
        payload
    }
}

export const deleteFavorites = (payload: string) => {
    return {
        type: DELETE_FAVORITES,
        payload
    }
}

export const setOrders = (payload: Array<OrderUserItemType>) => {
    return {
        type: SET_ORDERS,
        payload
    }
}

export const clearOrders = () => {
    return {
        type: CLEAR_ORDERS
    }
}

/* THUNKS */
export const getUserData = (id: string) => async (dispatch: Function) => {
    const data: UserDataResponse = await userAPI.getUserInfo(id).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(setUserData(data.user));
    }
}

export const updateUserData = (id: string, userData: FormData) => async (dispatch: Function) => {
    const data: DefaultResponse = await userAPI.updateProfile(id, userData).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message)); 
    });

    if(data && data.success) {
        await dispatch(getUserData(id));
        dispatch(setSnackbar(true, 'success', data.message));
    }
}

export const addToFavorites = (userId: string, userFavorite: UserFavoritesType) => async (dispatch: Function) => {
    const data: FavoritesResponse = await userAPI.addToFavorites(userId, userFavorite._id).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message)); 
    });

    if(data && data.success) {
        dispatch(setFavorites(userFavorite));
        dispatch(setSnackbar(true, 'success', data.message));
    }
}

export const deleteFromFavorites = (userId: string, productId: string) => async (dispatch: Function) => {
    const data: FavoritesResponse = await userAPI.deleteFromFavorites(userId, productId).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message)); 
    });

    if(data && data.success) {
        dispatch(deleteFavorites(data.productId));
        dispatch(setSnackbar(true, 'success', data.message));
    }
}

export const addOrder = (userId: string, products: Array<string>, price: number, deliveryAddress: string) => async (dispatch: Function) => {
    const data: DefaultResponse = await userAPI.addOrder(userId, products, price, deliveryAddress).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(clearCart());
        dispatch(setSnackbar(true, 'success', data.message));
    }
}

export const addOrderGuest = (products: Array<string>, name: string, email: string, phone: string, price: number, deliveryAddress: string) => async (dispatch: Function) => {
    const data: DefaultResponse = await userAPI.addOrderGuest(products, name, email, phone, price, deliveryAddress).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(clearCart());
        dispatch(setSnackbar(true, 'success', data.message));
    }
}

export const getOwnOrders = (userId: string) => async (dispatch: Function) => {
    const data: OrderGetOwnResponseType = await userAPI.getOwnOrders(userId).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(setOrders(data.orders));
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
        case SET_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        case DELETE_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites.filter(item => item._id !== action.payload)]
            }
        case SET_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case CLEAR_ORDERS:
            return {
                ...state,
                orders: []
            }
        default:
            return state;
    }
}

