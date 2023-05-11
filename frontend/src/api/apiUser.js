import axios from "axios";
import axiosInstance from "./axios";

const apiUser = {
  async createUser(formData) {
    const token = localStorage.getItem("jwt_token");

    const user = await axios.post(
      `${process.env.REACT_APP_BASE_URL}user/create`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return user;
  },

  getAllUser() {
    return axiosInstance.get("/user/all");
  },

  async getUserId(id) {
    const user = await axiosInstance.get(`/user/${id}`);
    return user;
  },

  async deleteUser(id) {
    const user = await axiosInstance.put(`/user/delete/${id}`);
    return user;
  },

  async editUser(id, formData) {
    // await axios.put(`/user/${id}`, formData);
    const token = localStorage.getItem("jwt_token");

    const user = await axios.put(
      `${process.env.REACT_APP_BASE_URL}user/${id}`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return user;
  },
};
export default apiUser;
