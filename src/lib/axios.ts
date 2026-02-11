import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api", // La URL del backend
  withCredentials: true, // Esto permite que las cookies viajen
});

export default api;
