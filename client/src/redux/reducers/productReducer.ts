import { GetProductsResponse, GetSingleProductResponse } from '../../types/reduxTypes';
import { ProductItemType, ProductStateType } from '../../types/stateTypes';
import { productAPI } from './../../api/product-api';
import { setSnackbar } from './snackbarReducer';

/* ACTIONS */
const SET_PRODUCTS: string = 'productReducer/SET_PRODUCTS';
const SET_SINGLE_PRODUCT: string = 'productReducer/SET_SINGLE_PRODUCT';
const CLEAR_SINGLE_PRODUCT: string = 'productReducer/CLEAR_SINGLE_PRODUCT';


/* INITIAL STATE */
const productState: ProductStateType = {
    products: [],
    singleProduct: null,
    filters: null
}

/* ACTION CREATORS */
export const setProducts = (payload: Array<ProductItemType>) => {
    return {
        type: SET_PRODUCTS,
        payload
    }
}

export const setSingleProduct = (payload: ProductItemType) => {
    return {
        type: SET_SINGLE_PRODUCT,
        payload
    }
}

export const clearSingleProduct = () => {
    return {
        type: CLEAR_SINGLE_PRODUCT
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

export const getSingleProduct = (productId: string) => async (dispatch: Function) => {
    const data: GetSingleProductResponse = await productAPI.getSingleProduct(productId).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(setSingleProduct(data.product));
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
        case SET_SINGLE_PRODUCT:
            return {
                ...state,
                singleProduct: action.payload
            }
        case CLEAR_SINGLE_PRODUCT:
            return {
                ...state,
                singleProduct: null
            }
        default:
            return state;
    }
}