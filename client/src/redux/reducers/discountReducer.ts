import { discountAPI } from "../../api/discount-api";
import { GetDiscountsResponse } from "../../types/reduxTypes";
import { DiscountItemType, DiscountStateType } from "../../types/stateTypes";
import { setSnackbar } from "./snackbarReducer";

/* ACTIONS */
const SET_DISCOUNTS: string = 'discountReducer/SET_DISCOUNTS';

/* INITIAL STATE */
const discountState: DiscountStateType = {
    discounts: []
}

/* ACTION CREATORS */
export const setDiscounts = (payload: Array<DiscountItemType>) => {
    return {
        type: SET_DISCOUNTS,
        payload
    }
}

/* THUNKS */
export const getDiscounts = () => async (dispatch: Function) => {
    const data: GetDiscountsResponse = await discountAPI.getDiscounts().catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(setDiscounts(data.discounts));
    }
}

/* REDUCER */
export const discountReducer = (state: DiscountStateType = discountState, action: any) => {
    switch(action.type) {
        case SET_DISCOUNTS:
            return {
                ...state,
                discounts: [...action.payload]
            }
        default:
            return state;
    }
}