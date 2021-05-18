import { commentAPI } from "../../api/comment-api";
import { CommentProductResponseType, CommentUserResponseType, DefaultResponse } from "../../types/reduxTypes";
import { CommentProductType, CommentStateType, CommentUserType } from "../../types/stateTypes";
import { setSnackbar } from "./snackbarReducer";

/* ACTIONS */
const SET_PRODUCT_COMMENTS = 'commentReducer/SET_PRODUCT_COMMENTS';
const SET_USER_COMMENTS = 'commentReducer/SET_USER_COMMENTS';
const CLEAR_PRODUCT_COMMENTS = 'commentReducer/CLEAR_PRODUCT_COMMENTS';
const CLEAR_USER_COMMENTS = 'commentReducer/CLEAR_USER_COMMENTS';

/* INITIAL STATE */
const commentState: CommentStateType = {
    product: [],
    user: []
}

/* ACTION CREATORS */
export const setProductComments = (payload: Array<CommentProductType>) => {
    return {
        type: SET_PRODUCT_COMMENTS,
        payload
    }
}

export const setUserComments = (payload: Array<CommentUserType>) => {
    return {
        type: SET_USER_COMMENTS,
        payload
    }
}

export const clearProductComments = () => {
    return {
        type: CLEAR_PRODUCT_COMMENTS
    }
}

export const clearUserComments = () => {
    return {
        type: CLEAR_USER_COMMENTS
    }
}

/* THUNKS */
export const getProductComments = (productId: string) => async (dispatch: Function) => {
    const data: CommentProductResponseType = await commentAPI.getProductComments(productId).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(setProductComments(data.comments));
    }
}

export const getUserComments = (userId: string) => async (dispatch: Function) => {
    // const data: CommentUserResponseType =
}

export const createComment = (userId: string, productId: string, text: string, positive: boolean) => async (dispatch: Function) => {
    const data: DefaultResponse = await commentAPI.createComment(userId, productId, text, positive).catch(error => {
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(getProductComments(productId));
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

export const deleteComment = (userId: string, productId: string) => async (dispatch: Function) => {
    const data: DefaultResponse = await commentAPI.removeComment(userId, productId).catch(error => {
        console.log("hete");
        const {message} = error.response.data;
        // show a tip or an error
        dispatch(setSnackbar(true, 'error', message));
    });

    if(data && data.success) {
        dispatch(setSnackbar(true, 'success', data.message));
    }
}

/* REDUCER */
export const commentReducer = (state: CommentStateType = commentState, action: any) => {
    switch(action.type) {
        case SET_PRODUCT_COMMENTS:
            return {
                ...state,
                product: [...action.payload] 
            }
        case SET_USER_COMMENTS:
            return {
                ...state,
                user: [...action.payload]
            }
        case CLEAR_PRODUCT_COMMENTS:
            return {
                ...state,
                product: []
            }
        case CLEAR_USER_COMMENTS:
            return {
                ...state,
                user: []
            }
        default:
            return state;
    }
}