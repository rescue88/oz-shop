import { removeStorageCart, setStorageCart } from "../../assets/helpers/helpers";
import { CartProdutType, CartStateType } from "../../types/stateTypes";

/* ACTIONS */
const ADD_PRODUCT_TO_CART = 'cartReducer/ADD_PRODUCT_TO_CART';
const DECREASE_PRODUCT_AMOUNT = 'cartReducer/DECREASE_PRODUCT_AMOUNT';
const CLEAR_CART = 'cartReducer/CLEAR_CART';
const DELETE_PRODUCT_FROM_CART = 'cartReducer/DELETE_PRODUCT_FROM_CART';
const INSERT_WHOLE_CART_DATA = 'cartReducer/INSERT_WHOLE_CART_DATA';

/* INITIAL STATE */
const cartState: CartStateType = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
};

/* ACTION CREATORS */
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

export const insertWholeCartData = (payload: CartStateType) => {
    return {
        type: INSERT_WHOLE_CART_DATA,
        payload
    }
}

/* REDUCER */
export const cartReducer = (state: CartStateType = cartState, action: any) => {
    switch(action.type) {
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

            // create returning object to be able to write it into local storage
            const returnObj: CartStateType = {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            }
            setStorageCart(returnObj);

            return returnObj;
        }
        case DECREASE_PRODUCT_AMOUNT: {
            const newItems = {...state.items}
            const deletedItem = newItems[action.payload].pop();

             // create returning object to be able to write it into local storage
             const returnObj: CartStateType = {
                ...state,
                items: newItems,
                totalCount: state.totalCount - 1,
                totalPrice: state.totalPrice - deletedItem!.price
            }
            setStorageCart(returnObj);

            return returnObj;
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

            // create returning object to be able to write it into local storage
            const returnObj: CartStateType = {
                ...state,
                items: newItems,
                totalCount: state.totalCount - deleteItemCount,
                totalPrice: state.totalPrice - deletedItemPrice 
            }
            setStorageCart(returnObj);

            return returnObj;
        }
        case CLEAR_CART:
            removeStorageCart();
            return {
                ...state,
                items: {},
                totalCount: 0,
                totalPrice: 0
            }
        case INSERT_WHOLE_CART_DATA:
            return {
                ...action.payload
            }
        default:
            return state;
    }
}