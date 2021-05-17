import { commentAPI } from "../../api/comment-api";
import { DefaultResponse } from "../../types/reduxTypes";
import { setSnackbar } from "../reducers/snackbarReducer";

/* THUNKS */
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