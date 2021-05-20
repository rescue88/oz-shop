import { CartProdutType, CartStateType } from "../../types/stateTypes";

/* ACTIONS */
const SET_TOTAL_PRICE = 'cartReducer/SET_TOTAL_PRICE';
const SET_TOTAL_COUNT = 'cartReducer/SET_TOTAL_COUNT';
const ADD_PRODUCT_TO_CART = 'cartReducer/ADD_PRODUCT_TO_CART';

/* INITIAL STATE */
const cartState: CartStateType = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
};

/* ACTION CREATORS */
export const setTotalPrice = (payload: number) => {
    return {
        type: SET_TOTAL_PRICE,
        payload
    }
}

export const setTotalCount = (payload: number) => {
    return {
        type: SET_TOTAL_COUNT,
        payload
    }
}

export const addProductToCart = (payload: CartProdutType) => {
    return {
        type: ADD_PRODUCT_TO_CART,
        payload
    }
}

/* THUNKS */

/* REDUCER */
export const cartReducer = (state: CartStateType = cartState, action: any) => {
    switch(action.type) {
        case SET_TOTAL_PRICE:
            return {
                ...state,
                totalPrice: action.payload
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.payload
            }
        case ADD_PRODUCT_TO_CART:
            const newItems = {
                ...state.items,
                [action.payload._id]: !state.items[action.payload._id]
                    ? [action.payload]
                    : [...state.items[action.payload._id], action.payload]
            }

            const allProducts = [].concat.apply([], Object.values(newItems));
            const totalCount = allProducts.length;
            // @ts-ignore
            const totalPrice = allProducts.reduce((sum, next) => sum + next.price, 0);

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            }
        default:
            return state;
    }
}