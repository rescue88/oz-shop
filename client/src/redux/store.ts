import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from './reducers/rootReducer';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // redux extension installation + adding thunk middleware

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;