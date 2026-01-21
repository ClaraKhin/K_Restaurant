import axios from "axios";


// axios instance with credentials and JSON content type to be sent to the backend
const api = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL, withCredentials: true, headers: { 'Content-Type': 'application/json', Accept: 'application/json' } });


// API endpoints
export const login = (data) => api.post("/api/user/login", data);
export const register = (data) => api.post("/api/user/register", data);
export const getUserData = (data) => api.get("/api/user", data);