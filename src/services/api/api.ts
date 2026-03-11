// services/api/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "https://unilobed-palatially-selah.ngrok-free.dev/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});