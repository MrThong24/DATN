import axiosInstance from "./axios";

const apiOvertime = {
  async addOvertime(body) {
    const dataProduct = await axiosInstance.post("overtime/create", body);
    return dataProduct;
  },
  getAllOvertime() {
    return axiosInstance.get("/overtime/all");
  },
  async getOvertimeId(id) {
    const overtime = await axiosInstance.get(`/overtime/${id}`);
    return overtime;
  },
  async deleteOvertimeId(id) {
    const overtime = await axiosInstance.delete(`/overtime/${id}`);
    return overtime;
  },
  async updateOvertimeId(id, formData) {
    const overtime = await axiosInstance.put(`/overtime/${id}`, formData);
    return overtime;
  },
  async getCountOvertimeById(id) {
    const overtime = await axiosInstance.get(
      `/overtime/employees/${id}/overtime-count`
    );
    return overtime;
  },
};
export default apiOvertime;
