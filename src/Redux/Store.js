

import{createStore,applyMiddleware, combineReducers} from "redux"

// import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from "redux-thunk"

// const composeEnhancers = composeWithDevTools({})

const  rootReducer =combineReducers({})
 
const store= createStore( rootReducer,applyMiddleware(thunk))

export default store
