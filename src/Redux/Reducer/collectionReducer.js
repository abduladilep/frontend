const initialState={
    COLLECTIONS:[ ],
    paymentStatus:null
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



// export const collectionReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'GET_ALL_COLLECTION':
//             console.log('Dispatched GET_ALL_COLLECTION action');
//             console.log('Previous state:', state);
//             console.log('Payload:', action.payload);

//             const newState = {
//                 ...state,
//                 COLLECTIONS: action.payload,
//             };
//         case "UPDATE_PAYMENT_STATUS":
//             return {
//                 ...state,
//                 paymentStatus: action.payload,
//             };

//             console.log('New state:', newState);

//             return newState;
//         default:
//             return state;
// }
// };

