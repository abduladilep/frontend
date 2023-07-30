const initialState={
    ALLUSERS:[ ]
}

export const usersReducer=(state=initialState,action)=>{
    
    switch(action.type){

        case'GET_ALL_USERS' :

            return{
                ...state,

               ALLUSERS:action.payload
            }
        
        default:
            return state
    }
}

export const userTokenReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            return { ...state, token: action.payload };
        case "LOGOUT":
            return { token: null };
        default:
            return state;
}
}

