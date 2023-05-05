import axios from "axios";

const BACKEND_URL = "http://localhost:8080";

export const axiosDefault = axios.create({
  baseURL: BACKEND_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BACKEND_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
