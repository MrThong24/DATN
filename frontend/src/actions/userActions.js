import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_DETAILS_RESET,
} from "../constants/userConstants";

import axiosInstance from "../api/axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    // Header to send with the request
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Make request to server and get the response data
    axiosInstance
      .post("user/login", {
        account_employee: email,
        password_employee: password,
      })
      .then((res) => {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res?.data,
        });
        localStorage.setItem("userInfo", JSON.stringify(res?.data));
      })
      .catch((error) => {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: error.response?.data?.error,
        });
      });

    // Dispatch user login success after making the request

    // Set user data to local storage
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });

  dispatch({
    type: USER_DETAILS_RESET,
  });
};
