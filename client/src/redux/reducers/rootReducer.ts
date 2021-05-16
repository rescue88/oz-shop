import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { adminReducer } from './adminReducer';
import { userReducer } from './userReducer';
import { snackbarReducer } from './snackbarReducer';
import { productReducer } from './productReducer';
import { discountReducer } from './discountReducer';
import { ratingReducer } from './ratingReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    admin: adminReducer,
    user: userReducer,
    snackbar: snackbarReducer,
    product: productReducer,
    discount: discountReducer,
    rating: ratingReducer
});