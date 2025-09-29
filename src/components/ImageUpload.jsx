// src/components/ImageUpload.jsx
import React, { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import apiClient from "../apiClient";
import toast from "react-hot-toast";

const ImageUpload = ({ productId, images, setImages, error }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const API_URL = process.env.REACT_APP_API_URL;

    // Handle file input change
    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length === 0) return;
        handleFiles(files);
    };

    // Read files and convert to base64 for preview
    const handleFiles = (files) => {
        const newImages = [];
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    newImages.push({
                        tempId: Date.now() + i, // temporary id for preview
                        file: files[i],
                        url: e.target.result,
                    });
                    if (newImages.length === files.length) {
                        setImages((prev) => [...prev, ...newImages]);
                    }
                };
                reader.readAsDataURL(files[i]);
            }
        }
    };

    // Delete image
// Delete image
    const handleDeleteImage = async (img) => {
        try {
            if (img.isNew) {
                // Temporary image (not uploaded yet) - just remove from local state
                setImages((prev) => prev.filter((i) => i.tempId !== img.tempId));
            } else {
                // Already uploaded image (delete via API)
                const res = await apiClient.delete(`/admin/products/${productId}/images`, {
                    data: { path: img.url } // Send in request body
                });

                if (res.data.success) {
                    // Remove only the deleted image
                    setImages((prev) => prev.filter((image) => image.url !== img.url));
                    toast.success("Image deleted successfully");
                }
            }
        } catch (err) {
            console.error("Delete image error:", err);
            toast.error("Failed to delete image");
        }
    };
    // Drag & Drop handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
        e.dataTransfer.dropEffect = "copy";
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    return (
        <div>
            {/* Upload area */}
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragging ? "border-purple-500 bg-purple-100" : "border-purple-300"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <div className="text-purple-500 text-5xl mb-4">
                    <i className="fas fa-cloud-upload-alt"></i>
                </div>
                <p className="text-purple-700 font-medium mb-1">Drag & Drop to Upload</p>
                <p className="text-gray-600 text-sm">OR</p>
                <button
                    type="button"
                    className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current.click();
                    }}
                >
                    Browse Files
                </button>
                <p className="text-gray-500 text-sm mt-3">Supports JPG, PNG, GIF - Max 5MB each</p>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* Image Previews */}
            {images.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Image Previews</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {images.map((img, index) => (
                            <div key={img.tempId || img.url} className="relative border rounded-lg overflow-hidden group">
                                <img
                                    src={img.url.startsWith("data:") ? img.url : `${API_URL.replace("/api", "")}${img.url}`}
                                    alt="Preview"
                                    className="w-full h-32 object-cover"
                                />
                                <button
                                    type="button"
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteImage(img);
                                    }}
                                >
                                    <FaTrash />
                                </button>
                                <div className="p-2 text-xs text-gray-600 truncate">
                                    {img.file?.name || "Uploaded Image"}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;