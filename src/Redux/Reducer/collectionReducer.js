const initialState={
    COLLECTIONS:[ ]
}

export const collectionReducer=(state=initialState,action)=>{
    
    switch(action.type){

        case'GET_ALL_COLLECTION' :


            return{
                ...state,

                COLLECTIONS:action.payload
            }
        
        default:
            return state
    }
}

