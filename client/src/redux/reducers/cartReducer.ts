import { CartStateType } from "../../types/stateTypes";

/* ACTIONS */
const SET_TOTAL_PRICE = 'cartReducer/SET_TOTAL_PRICE';
const SET_TOTAL_COUNT = 'cartReducer/SET_TOTAL_COUNT';
const ADD_PRODUCT_TO_CART = 'cartReducer/ADD_PRODUCT_TO_CART';

/* INITIAL STATE */
const cartState: CartStateType = {
    items: [],
    totalPrice: 0,
    totalCount: 0,
};

/* ACTION CREATORS */
const setTotalPrice = (payload: number) => {
    return {
        type: SET_TOTAL_PRICE,
        payload
    }
}

const setTotalCount = (payload: number) => {
    return {
        type: SET_TOTAL_COUNT,
        payload
    }
}

const addProductToCart = (payload: any) => {
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
            const id: string = action.payload.id;
            return {
                ...state,
                items: {
                    [id]: [
                        ...state.items[id],
                        action.payload
                    ]
                }
            }
        default:
            return state;
    }
}