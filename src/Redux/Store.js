

import{createStore,applyMiddleware, combineReducers} from "redux"

import { usersReducer,userTokenReducer} from './Reducer/userReducer';
import {collectionReducer} from './Reducer/collectionReducer';
// import {alertsReducer} from './Reducer/alertsReducer';


// import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from "redux-thunk"

// const composeEnhancers = composeWithDevTools({})

const  rootReducer =combineReducers({
    
    users:usersReducer,
    collection:collectionReducer,
    token:userTokenReducer
    // alerts:alertsReducer
  
})
 
const store= createStore( rootReducer,applyMiddleware(thunk))

export default store
