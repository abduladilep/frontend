import axios from "axios";

import {message} from 'antd'


export const addUser =(reqObj)=>async dispatch => {
    try {

        console.log("response",reqObj);
       const response= await axios.post('/api/user/addUser',reqObj)
       localStorage.setItem('User',JSON.stringify(response.data)
       
       )


       console.log(response.data,"respoooo");
        
    } catch (error) {
        console.log(error);
        
    }
}


export const allUsers =(reqObj) => async dispatch=>{
    try {
        const response = await axios.get('/api/user/allUsers')
          
    //    console.log("response: " , response.data);

       dispatch({type:"GET_ALL_USERS",payload:response.data})


    }catch(error){
        console.log(error);
    }
}

export const collectionList=(reqObj)=> async dispatch=>{
    try {
        const response= await axios.get('/api/user/collectionList');
        console.log("popopo",response.data);

        dispatch({type:"GET_ALL_COLLECTION",payload:response.data.todayDates})
        
    } catch (error) {
        console.log(error);
    }
}

// export const allUsers = () => {
//     return axios.get('/api/user/allUsers')
//     .then(response => response.data)
//     .catch(error => {
//         throw error;
//     });
// };

// Pay API 

export const handlePaymentRequest =(reqObj)=>async dispatch=>{
    const paymentResponse = await axios.post("/api/user/pay",reqObj)
    console.log("paymentResponse",paymentResponse);



    message.success(reqObj.amount);
    message.error(reqObj.amount);
    



}
export const handleTransactionPay=(reqObj)=>async dispatch=>{

    const transactionPayResponse = await axios.post("/api/user/transactionPay",reqObj)

    console.log("transactionPayResponse: " + transactionPayResponse);
}



export const updateUser=(reqObj) => async dispatch=>{
    const updatedUserResponse = await axios.post("/api/user/updateUser",reqObj)

    console.log(updatedUserResponse.data, "resspoupdata updated");
}
