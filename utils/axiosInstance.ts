import axios from "axios";
import { message } from "antd";

const axiosInstance = axios.create({
  baseURL: "/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Add any custom headers or tokens here
    // For example, if you have a token stored in localStorage or cookies:
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with a status other than 2xx
      if (error.response.status === 401) {
        // Handle unauthorized error, for example, redirect to login
        message.error("Unauthorized! Please log in again.");
      } else {
        message.error(error.response.data.message || "An error occurred");
      }
    } else if (error.request) {
      // Request was made but no response received
      message.error("Network error. Please try again.");
    } else {
      // Something else happened while setting up the request
      message.error("Error: " + error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
