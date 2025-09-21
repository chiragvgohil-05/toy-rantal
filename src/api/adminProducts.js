// src/api/adminProducts.js
import apiClient from "../apiClient"; // Axios instance

export const createProduct = async (productData) => {
    return apiClient.post("/admin/products", productData);
};

export const uploadProductImages = async (productId, files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images[]", file));

    return apiClient.post(`/admin/products/${productId}/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};
