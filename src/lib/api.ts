import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});

console.log(import.meta.env.VITE_BASE_URL);

export default api;
