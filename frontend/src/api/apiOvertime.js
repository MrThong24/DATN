import axiosInstance from "./axios";

const apiOvertime = {
  //   getAllDepartment() {
  //     return axiosInstance.get("overtime");
  //   },
  async addOvertime(body) {
    const dataProduct = await axiosInstance.post("overtime", body);
    return dataProduct;
  },
};
export default apiOvertime;
