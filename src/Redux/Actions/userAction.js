import axios from "axios";

import { message } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";



export const addUser = (reqObj) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    console.log("tokenaduser", token);

    const response = await axios.post(
      "backend/api/user/addUser",
      { reqObj },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": token,
        },
      }
    );
    //    localStorage.setItem('User',JSON.stringify(response.data))
    message.success("new customer Added");
    window.location.href="/"
    console.log(response.data, "respoooo");
    console.log(token, "rpopoospoooo");
  } catch (error) {
    console.log(error);
   message.error("error");
    // window.location.href="/adduser"
  }
};

export const allUsers = (reqObj) => async (dispatch) => {
  try {
    const response = await axios.get("backend/api/user/allUsers");

    dispatch({ type: "GET_ALL_USERS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const collectionList = (reqObj) => async (dispatch) => {
    console.log("gsdsghdfsdg");
  try {
    console.log("collectionList");
    const response = await axios.get("backend/api/user/collectionList");
    console.log("popopo", response.data.todayDates);

    dispatch({ type: "GET_ALL_COLLECTION", payload: response.data.todayDates });
  } catch (error) {
    console.log(error);
  }
};

// export const allUsers = () => {
//     return axios.get('/api/user/allUsers')
//     .then(response => response.data)
//     .catch(error => {
//         throw error;
//     });
// };






export const handlePaymentRequest = (reqObj) => async (dispatch) => {
  
    try {
  const token = localStorage.getItem("token");
  const paymentResponse = await axios.post(
    "backend/api/user/pay",
    { reqObj },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": token,
      },
    }
  );
  // dispatch({ type: "UPDATE_PAYMENT_STATUS", payload: paymentResponse.data });

  console.log("paymentResponse", paymentResponse);

  message.success(paymentResponse.data);
   window.location.href="/collectionReport"
 
}catch (error) {
  console.error(error);

          if (error.response.status === 422) {
            const errorDataString = JSON.stringify(error.response.data);
            message.warning(`money more than remaining amount${errorDataString}`);
            window.location.href="/collectionReport"
          } else {
            message.error("An error occurred while processing the transaction.");
            window.location.href="/collectionReport"
          }

};
}



export const handleTransactionPay = (reqObj) => async dispatch => {
    const token = localStorage.getItem('token');

    try {
      const transactionPayResponse = await axios.post("backend/api/user/transactionPay", { reqObj }, {
        headers: {
            'Content-Type': 'application/json',
            "X-Custom-Header": token,
        }
    })
    window.location.reload();
    message.success(transactionPayResponse.data);

    } catch (error) {
      console.error(error);
      if (error.response.status === 422) {
        const errorDataString = JSON.stringify(error.response.data);
        message.warning(`money more than remaining amount${errorDataString}`);
        window.location.reload();
      } else {
        message.error("An error occurred while processing the transaction.");
        window.location.reload();
           }
    }
  };






export const updateUser=(reqObj) => async dispatch=>{
    const updatedUserResponse = await axios.post("backend/api/user/updateUser",reqObj)
  

    console.log(updatedUserResponse.data, "resspoupdata updated");
}

// export const updateUser = (reqObj) => async (dispatch) => {
//   const token = localStorage.getItem("token");

//   const updatedUserResponse = await axios.post(
//     "/api/user/updateUser",
//     { reqObj },
//     {
//       headers: {
//         "Content-Type": "application/json",
//         "X-Custom-Header": token,
//       },
//     }
//   );

//   console.log(updatedUserResponse.data, "resspoupdata updated");
// };

// export const handleAdminDelete=(reqObj) =>async dispatch=>{
//     try {
//         console.log(reqObj,"req.obj");
//         const AdminRDeleteResponse =await axios.delete("/api/user/adminDelete",reqObj)
//        console.log("adminDelete",AdminRDeleteResponse);

//     } catch (error) {
//         console.log(error,"eroooorrr");

//     }
// }

export const LoginUser = (reqObj) => async (dispatch) => {
  try {
    const loginUserResponse = await axios.post(`backend/api/user/Login`, reqObj);
    const token = loginUserResponse.data.token;
    console.log(token, "token from login");

    dispatch({ type: "SET_TOKEN", payload: token });

    return token;
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
};

export const handleAdminDelete = (adminId) => async (dispatch) => {
  try {
    const response = await axios.delete("backend/api/user/adminDelete", { data: { adminId: adminId },});

    message.success(response.data)
    console.log("adminDelete", response.data);

    // Dispatch further actions or handle success
  } catch (error) {
    console.log("error", error);
    if (error.response.status === 404) {
        const errorDataString = JSON.stringify(error.response.data);
        message.error( errorDataString);
      } else {
        message.error("An error occurred while processing the .",error);
      }
    }

    // Handle error or dispatch further actions
  }

  export const handleCostomerDelete=(userId)=>async (dispatch) => {
    try {
      const response = await axios.delete("backend/api/user/deleteUser", { data: { userId: userId },} );
      console.log(userId,"vcvxcb");
      console.log(response);
      message.success(response.data);
      window.location.href="/allusers"
      
    } catch (error) {
      console.log(error);
      message.error("An error occurred while processing the .");
      
    }
  }

