// src/api.js
import apiClient from "./apiClient"; // ✅ import your axios instance
import toast from "react-hot-toast";

// Register user (with avatar upload support)
export const registerUser = (data) => {
    return apiClient.post("/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

// Login user
export const loginUser = (data) => {
    return apiClient.post("/auth/login", data);
};

// Get user profile
export const getProfile = () => {
    return apiClient.get("/me");
};

// Update user profile
export const updateProfile = (data) => {
    return apiClient.post("/me/update", data);
};