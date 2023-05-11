import axiosInstance from "./axios";

const apiDepartment = {
  getAllDepartment() {
    return axiosInstance.get("department");
  },

  async addDepartment(body) {
    const dataProduct = await axiosInstance.post("department", body);
    return dataProduct;
  },

  async deleteDepartmentId(id) {
    const department = await axiosInstance.delete(`/department/delete/${id}`);
    return department;
  },

  async getDepartmentId(id) {
    const department = await axiosInstance.get(`/department/${id}`);
    return department;
  },

  async editDepartmentById(id, formData) {
    await axiosInstance.put(`/department/${id}`, formData);
  },
};
export default apiDepartment;
