// src/components/AdminProductCard.jsx
import React, { useState } from 'react';
import {FaXmark} from "react-icons/fa6";

const AdminProductCard = ({ product, onEdit, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const API_URL = process.env.REACT_APP_API_URL;
    // Calculate savings
    const savings = product.originalPrice && product.discountedPrice
        ? ((product.originalPrice - product.discountedPrice) / product.originalPrice * 100).toFixed(0)
        : 0;

    // Format price
    const formatPrice = (price) => {
        return `$${parseFloat(price).toFixed(2)}`;
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            {/* Product Image */}
            <div className="relative h-48 bg-gradient-to-r from-blue-50 to-purple-50 overflow-hidden">
                {product.images && product.images.length > 0 ? (
                    <img
                        src={`${API_URL.replace("/api", "")}${product.images[0].url}`}
                        alt={product.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <i className="fas fa-image text-4xl"></i>
                    </div>
                )}

                {/* Discount Badge */}
                {product.discountedPrice && product.discountedPrice < product.originalPrice && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white font-bold py-1 px-3 rounded-full text-sm">
                        Save {savings}%
                    </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-blue-500 text-white font-medium py-1 px-2 rounded-lg text-xs">
                    {product.category}
                </div>
            </div>

            {/* Product Details */}
            <div className="p-5">
                {/* Title and Toggle */}
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{product.title}</h3>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-500 hover:text-blue-700 ml-2"
                    >
                        <i className={`fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </button>
                </div>

                {/* Price Info */}
                <div className="flex items-center mb-4">
                    {product.discountedPrice ? (
                        <>
                            <span className="text-xl font-bold text-gray-800 mr-2">
                                {formatPrice(product.discountedPrice)}
                            </span>
                            <span className="text-md text-gray-500 line-through">
                                {formatPrice(product.originalPrice)}
                            </span>
                        </>
                    ) : (
                        <span className="text-xl font-bold text-gray-800">
                            {formatPrice(product.originalPrice)}
                        </span>
                    )}
                </div>

                {/* Rental Options */}
                {product.rentalOptions && product.rentalOptions.length > 0 && (
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Rental Options:</h4>
                        <div className="grid grid-cols-3 gap-2">
                            {product.rentalOptions.map((option, index) => (
                                <div key={index} className="bg-gray-100 rounded-lg p-2 text-center">
                                    <div className="text-xs text-gray-600">{option.days} days</div>
                                    <div className="text-sm font-semibold text-gray-800">
                                        {option.price ? formatPrice(option.price) : '-'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Expanded Details */}
                {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Description:</h4>
                        <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-1">Original Price:</h4>
                                <p className="text-gray-800">{formatPrice(product.originalPrice)}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-1">Discount:</h4>
                                <p className="text-gray-800">
                                    {product.discountPercentage ? `${product.discountPercentage}%` : 'None'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
                    <button
                        onClick={() => onEdit(product)}
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                        <i className="fas fa-edit mr-2"></i> Edit
                    </button>

                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex items-center text-red-600 hover:text-red-800 font-medium"
                    >
                        <i className="fas fa-trash mr-2"></i> Delete
                    </button>
                </div>
            </div>

            {/* Delete Confirm */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full relative shadow-lg">
                        {/* Close Icon */}
                        <button
                            onClick={() => setShowDeleteConfirm(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            <FaXmark/>
                        </button>

                        <h3 className="text-lg font-bold text-gray-800 mb-2">Confirm Delete</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete <span className="font-semibold">"{product.title}"</span>?
                        </p>

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(product);
                                    setShowDeleteConfirm(false);
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProductCard;
