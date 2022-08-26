import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 2500,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
