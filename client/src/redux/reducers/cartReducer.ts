import { CartProdutType, CartStateType } from "../../types/stateTypes";

/* ACTIONS */
const SET_TOTAL_PRICE = 'cartReducer/SET_TOTAL_PRICE';
const SET_TOTAL_COUNT = 'cartReducer/SET_TOTAL_COUNT';
const ADD_PRODUCT_TO_CART = 'cartReducer/ADD_PRODUCT_TO_CART';
const DECREASE_PRODUCT_AMOUNT = 'cartReducer/DECREASE_PRODUCT_AMOUNT';
const CLEAR_CART = 'cartReducer/CLEAR_CART';
const DELETE_PRODUCT_FROM_CART = 'cartReducer/DELETE_PRODUCT_FROM_CART';

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

export const deacreaseProductAmount = (payload: string) => {
    return {
        type: DECREASE_PRODUCT_AMOUNT,
        payload
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}

export const deleteProductFromCart = (payload: string) => {
    return {
        type: DELETE_PRODUCT_FROM_CART,
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
        case ADD_PRODUCT_TO_CART: {
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
        }
        case DECREASE_PRODUCT_AMOUNT: {
            const newItems = {...state.items}
            const deletedItem = newItems[action.payload].pop();

            return {
                ...state,
                items: newItems,
                totalCount: state.totalCount - 1,
                totalPrice: state.totalPrice - deletedItem!.price
            }
        }
        case DELETE_PRODUCT_FROM_CART: {
            // make items copy
            const newItems = {...state.items};
            // extract and delete field
            const deletedItem = newItems[action.payload];
            delete newItems[action.payload];
            // get amount and price of a deleted field
            const deleteItemCount = deletedItem.length;
            const deletedItemPrice = deletedItem.reduce((sum, next) => sum + next.price, 0);

            return {
                ...state,
                items: newItems,
                totalCount: state.totalCount - deleteItemCount,
                totalPrice: state.totalPrice - deletedItemPrice 
            }
        }
        case CLEAR_CART:
            return {
                ...state,
                items: {},
                totalCount: 0,
                totalPrice: 0
            }
        default:
            return state;
    }
}