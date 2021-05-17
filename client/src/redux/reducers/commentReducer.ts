import { commentAPI } from "../../api/comment-api";
import { DefaultResponse } from "../../types/reduxTypes";
import { setSnackbar } from "./snackbarReducer";

/* ACTIONS */
const SET_COMMENTS = 'commentReducer/SET_COMMENTS';
const CLEAR_COMMENTS = 'commentReducer/CLEAR_COMMENTS';



/* THUNKS */
export const getProductComments = (productId: string) => async (dispatch: Function) => {
    const data: DefaultResponse = await commentAPI.getProductComments(productId).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    // if(data && data.success) {
    //     dispatch(setSnackbar(true, 'success', data.message));
    // }
}

export const createComment = (userId: string, productId: string, text: string, positive: boolean) => async (dispatch: Function) => {
    const data: DefaultResponse = await commentAPI.createComment(userId, productId, text, positive).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(setSnackbar(true, 'success', data.message));
    }
}

export const updateComment = (userId: string, productId: string, text: string, positive: boolean) => async (dispatch: Function) => {
    const data: DefaultResponse = await commentAPI.createComment(userId, productId, text, positive).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });
    
    if(data && data.success) {
        dispatch(setSnackbar(true, 'success', data.message));
    }
}