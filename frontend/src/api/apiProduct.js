import axiosInstance from "./axios";

const apiProduct = {
  async createProject(formData) {
    const dataProduct = await axiosInstance.post("project/create", formData);
    return dataProduct;
  },
  getAllProject() {
    return axiosInstance.get("/project");
  },
  async getProjectId(id) {
    const dataProduct = await axiosInstance.get(`/project/${id}`);
    return dataProduct;
  },
  async updateProjectId(id, formData) {
    const dataProduct = await axiosInstance.put(`/project/${id}`, formData);
    return dataProduct;
  },
};
export default apiProduct;
