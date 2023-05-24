import axios from "axios";
import axiosInstance from "./axios";

const apiNotification = {
  async createNotification(formData) {
    const notification = await axiosInstance.post(
      "notification/create",
      formData
    );
    return notification;
  },
  async getNotificationById(id_user) {
    const notifications = await axiosInstance.get(
      `notification/get-notification-by-user/${id_user}`
    );
    return notifications;
  },
  async updateNotificationById(payload) {
    const notifications = await axiosInstance.put(
      `notification/update-notification-by-user`,
      payload
    );
    return notifications;
  },
};
export default apiNotification;
