import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { userReducer } from './userReducer';
import { snackbarReducer } from './snackbarReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    snackbar: snackbarReducer
});