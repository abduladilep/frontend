import axios from "axios";



export const addUser =(reqObj)=>async dispatch => {
    try {

        console.log("response",reqObj);
       const response= await axios.post('/api/user/addUser',reqObj)
       localStorage.setItem('User',JSON.stringify(response.data))

       console.log(response.data,"respoooo");
        
    } catch (error) {
        console.log(error);
        
    }
}



