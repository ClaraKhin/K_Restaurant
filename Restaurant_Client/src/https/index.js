import axios from "axios";


// axios instance with credentials and JSON content type to be sent to the backend
const api = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL, withCredentials: true, headers: { 'Content-Type': 'application/json', Accept: 'application/json' } });


// API endpoints
export const login = (data) => api.post("/api/user/login", data);
export const register = (data) => api.post("/api/user/register", data);
export const getUserData = () => api.get("/api/user");
export const logout = () => api.post("/api/user/logout");

export const addTable = (data) => api.post("/api/table", data);
export const getTables = () => api.get("/api/table");

// order endpoints
export const addOrder = (data) => api.post("/api/order", data);
export const getOrders = () => api.get("/api/order");
export const updateOrder = (id, data) => api.put(`/api/order/${id}`, data);

//payment endpoints
export const createOrderStripe = (data) => api.post("/api/payment/create-order", data);
export const verifyPayment = (sessionId) =>
  api.get("/api/payment/verify-payment", { params: { session_id: sessionId } });
export const getReceiptByOrderId = (orderId) =>
  api.get("/api/payment/receipt", { params: { order_id: orderId } });
