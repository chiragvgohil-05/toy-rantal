// src/apiClient.js
import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Request interceptor (add token if needed later)
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Response interceptor (for error handling)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error.response?.data || error.message);
    }
);

export default apiClient;
