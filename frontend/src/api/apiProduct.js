import axios from "axios";
import axiosInstance from "./axios";

const apiProduct = {
  async createUser(formData) {
    const token = localStorage.getItem("jwt_token");

    const user = await axios.post(
      `${process.env.REACT_APP_BASE_URL}product/create`,
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
  // async addProduct(formdata) {
  //   const dataProduct = await axiosInstance.post("/product", formdata, {
  //     headers: { "content-type": "multipart/form-data" },
  //   });
  //   return dataProduct;
  // },
};
export default apiProduct;
