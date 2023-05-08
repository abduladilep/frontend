import axios from "axios";



export const addUser =(reqObj,url1)=>async dispatch => {
    try {

        console.log("response",reqObj,url1);
       const response= await axios.post('/api/user/addUser',reqObj,url1)
       localStorage.setItem('User',JSON.stringify(response.data))

       console.log(response.data,"respoooo");
        
    } catch (error) {
        console.log(error);
        
    }
}



