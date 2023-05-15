/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("jwt_token");
  // console.log(config);
  config.headers = {
    "Content-Type": "application/json",
    // "content-type": "multipart/form-data",
  };
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const statusCode = error.response.status;
    if (statusCode === 404) {
      window.location.href = "/not-found";
      return;
    }
    // if (statusCode === 401) {
    //   window.location.href = "/login";
    //   return;
    // }
    if (statusCode === 403) {
      window.location.href = "/forbidden";
      return;
    }
    if (statusCode === 500) {
      // show notification
      toast.error("System has an error");
      return;
    }
    throw error;
    // eslint-disable-next-line comma-dangle
  }
);

export default axiosInstance;
