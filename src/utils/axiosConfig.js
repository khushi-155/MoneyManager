import axios from 'axios';
import { BASE_URL } from '../utils/apiEndpoints.js';

const axiosInstance = axios.create({
  baseURL: BASE_URL,  // Replace with your API base URL                    // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});
debugger
axiosInstance.interceptors.request.use(

  (config) => {
    debugger;
    const skipTokenUrls = ['/login', '/activation', '/register'];
    const shouldSkip = skipTokenUrls.some(url => config.url?.endsWith(url));
    if (!shouldSkip) {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server error please try again later");
      } else if (error.code == "ECONNABORTED") {
        console.error("Request time out, please try again later");
      }

    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
