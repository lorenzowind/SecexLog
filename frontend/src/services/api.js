import axios from "axios";

const api = axios.create({ baseURL: "http://192.168.0.3:3333" });

api.interceptors.request.use(async config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
