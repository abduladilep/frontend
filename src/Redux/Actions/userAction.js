import axios from "axios";
import { message } from "antd";

export const addUser = (reqObj) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    console.log("tokenaduser", token);

    await axios.post(
      "backend/api/user/addUser",
      { reqObj },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": token,
        },
      }
    );
    message.success("new customer Added");
    window.location.href = "/";
  } catch (error) {
    console.log(error);
    message.error("error");
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
  try {
    const response = await axios.get("backend/api/user/collectionList");
    dispatch({ type: "GET_ALL_COLLECTION", payload: response.data.todayDates });
  } catch (error) {
    console.log(error);
  }
};

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

    message.success(paymentResponse.data);
    window.location.href = "/collectionReport";
  } catch (error) {
    console.error(error);

    if (error.response.status === 422) {
      const errorDataString = JSON.stringify(error.response.data);
      message.warning(`money more than remaining amount${errorDataString}`);
      window.location.href = "/collectionReport";
    } else {
      message.error("An error occurred while processing the transaction.");
      window.location.href = "/collectionReport";
    }
  }
};


export const handleTransactionPay = (reqObj) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const transactionPayResponse = await axios.post(
      "backend/api/user/transactionPay",
      { reqObj },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": token,
        },
      }
    );
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


export const updateUser = (reqObj) => async (dispatch) => {
  const updatedUserResponse = await axios.post(
    "backend/api/user/updateUser",
    reqObj
  );

  console.log(updatedUserResponse.data, "resspoupdata updated");
};

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


export const LoginUser = (reqObj) => async (dispatch) => {
  try {
    const loginUserResponse = await axios.post(
      `backend/api/user/Login`,
      reqObj
    );
    const token = loginUserResponse.data.token;
    dispatch({ type: "SET_TOKEN", payload: token });

    return token;
  } catch (error) {
    console.error(error);
  }
};

export const handleAdminDelete = (adminId) => async (dispatch) => {
  try {
    const response = await axios.delete("backend/api/user/adminDelete", {
      data: { adminId: adminId },
    });

    message.success(response.data);
  } catch (error) {
    console.log("error", error);
    if (error.response.status === 404) {
      const errorDataString = JSON.stringify(error.response.data);
      message.error(errorDataString);
    } else {
      message.error("An error occurred while processing the .", error);
    }
  }};

export const handleCostomerDelete = (userId) => async (dispatch) => {
  try {
    const response = await axios.delete("backend/api/user/deleteUser", {
      data: { userId: userId },
    });
    message.success(response.data);
    window.location.href = "/allusers";
  } catch (error) {
    console.log(error);
    message.error("An error occurred while processing the .");
  }
};
