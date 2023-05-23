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


export const allUsers =(reqObj) => async dispatch=>{
    try {
        const response = await axios.get('/api/user/allUsers')
          
       console.log("response: " , response.data);

    }catch(error){
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

