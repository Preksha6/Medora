import axios from "axios";

// Dynamically determine backend URL
const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  
  // If explicitly configured and not localhost, use it
  if (envUrl && !envUrl.includes("localhost")) {
    return envUrl;
  }

  // When deployed (e.g. on Vercel or any non-localhost domain), use live backend
  if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
    return "https://medora-npq5.onrender.com/api";
  }

  // In local development
  return envUrl || "http://localhost:3001/api";
};

const API = axios.create({
  baseURL: getBaseURL()
});

// Attach JWT token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;