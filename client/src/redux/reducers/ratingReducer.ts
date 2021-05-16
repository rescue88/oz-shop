import { ratingAPI } from "../../api/rating-api"
import { RatingResponse } from "../../types/reduxTypes"
import { RatingStateType } from "../../types/stateTypes";
import { setSnackbar } from "./snackbarReducer";

/* ACTIONS */
const SET_RATING = 'ratingReducer/SET_RATING';
const CLEAR_RATING = 'ratingReducer/CLEAR_RATING';

/* INITIAL STATE */
const ratingState: RatingStateType = {
    rating: null
};

/* ACTION CREATORS */
export const setRating = (payload: number) => {
    return {
        type: SET_RATING,
        payload
    }
}

export const clearRating = () => {
    return {
        type: CLEAR_RATING
    }
}

/* THUNKS */
// get your rating for a current product
export const getOwnRating = (userId: string, productId: string) => async (dispatch: Function) => {
    const data: RatingResponse = await ratingAPI.getOwnRating(userId, productId);

    if(data && data.success) {
        dispatch(setRating(data.rating!));
    }
}
// add a rating to a product
export const addRating = (userId: string, productId: string, rating: number) => async (dispatch: Function) => {
    const data: RatingResponse = await ratingAPI.addRating(userId, productId, rating).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(setRating(data.rating!));
        dispatch(setSnackbar(true, 'success', data.message));
    }
}
// update user rating for a product
export const updateRating = (userId: string, productId: string, mark: number) => async (dispatch: Function) => {
    const data: RatingResponse = await ratingAPI.updateRating(userId, productId, mark).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(setRating(data.rating!));
        dispatch(setSnackbar(true, 'success', data.message));
    }
}

/* REDUCER */
export const ratingReducer = (state: RatingStateType = ratingState, action: any) => {
    switch(action.type) {
        case SET_RATING:
            return {
                ...state,
                rating: action.payload
            };
        case CLEAR_RATING:
            return {
                ...state,
                rating: null
            };
        default:
            return state;
    }
}