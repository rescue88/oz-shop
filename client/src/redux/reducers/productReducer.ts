import { GetProductsResponse } from '../../types/reduxTypes';
import { ProductItemType, ProductStateType } from '../../types/stateTypes';
import { productAPI } from './../../api/product-api';
import { setSnackbar } from './snackbarReducer';

/* ACTIONS */
const SET_PRODUCTS: string = 'productReducer/SET_PRODUCTS';

/* INITIAL STATE */
const productState: ProductStateType = {
    products: [],
    filters: null
}

/* ACTION CREATORS */
export const setProducts = (payload: Array<ProductItemType>) => {
    return {
        type: SET_PRODUCTS,
        payload
    }
}

/* THUNKS */
export const getProducts = () => async (dispatch: Function) => {
    const data: GetProductsResponse = await productAPI.getProducts().catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(setProducts(data.products));
    }
}

/* REDUCER */
export const productReducer = (state: ProductStateType = productState, action: any) => {
    switch(action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            } as ProductStateType;
        default:
            return state;
    }
}