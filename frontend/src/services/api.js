import axios from "axios";

const api = axios.create({ baseURL: "http://10.10.30.113:3334" });

api.interceptors.request.use(async config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
