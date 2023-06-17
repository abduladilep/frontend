

import{createStore,applyMiddleware, combineReducers} from "redux"

import { usersReducer} from './Reducer/userReducer';
import {collectionReducer} from './Reducer/collectionReducer';


// import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from "redux-thunk"

// const composeEnhancers = composeWithDevTools({})

const  rootReducer =combineReducers({
    
    users:usersReducer,
    collection:collectionReducer
  
})
 
const store= createStore( rootReducer,applyMiddleware(thunk))

export default store
