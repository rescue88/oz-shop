import { authReducer } from './authReducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

let reducers: any = combineReducers({
    auth: authReducer
});

let store = createStore(reducers, applyMiddleware(thunk));
(window as any).store = store;

export default store;