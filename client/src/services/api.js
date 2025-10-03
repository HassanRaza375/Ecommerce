import axios from "axios";

const api = axios.create({
  baseURL: "https://your-backend-api.com/api/v1", // replace with your backend URL
  timeout: 5000,
});

// Add interceptors for auth tokens if needed
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
