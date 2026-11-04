import axios from "axios";

// withCredentials lets the browser send the httpOnly login cookie.
const api = axios.create({ baseURL: "/api", withCredentials: true });

export default api;