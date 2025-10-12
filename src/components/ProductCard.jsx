// src/components/ProductCard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../apiClient";
import toast from "react-hot-toast";

// Simple global store for managing active cards
let activeCardId = null;
let listeners = [];

const setGlobalActiveCard = (id) => {
    activeCardId = id;
    listeners.forEach((fn) => fn(id));
};

const subscribe = (fn) => {
    listeners.push(fn);
    return () => {
        listeners = listeners.filter((l) => l !== fn);
    };
};

let autoId = 1; // auto-increment for unique IDs

const ProductCard = ({
                         id: propId,
                         title = "Premium Toy",
                         description = "A fun and educational toy that keeps kids entertained.",
                         imageUrl,
                         originalPrice = 1500,
                         discountedPrice = 1200,
                         discountPercentage = 20,
                         rentalOptions = [
                             { days: 7, price: 500 },
                             { days: 15, price: 900 },
                             { days: 30, price: 1500 },
                         ],
                         onOptionSelect,
                         className = "",
                         showDiscountBadge = true,
                         buttonText = "Add to Cart",
                         overlayTitle = "Choose Rental Option",
                         closeButtonText = "Close",
                     }) => {
    const [id] = useState(() => propId || autoId++);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState("");
    const navigate = useNavigate();

    // Set default start date to today
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setStartDate(today);
    }, []);

    useEffect(() => {
        const unsubscribe = subscribe((activeId) => {
            setIsOpen(activeId === id);
        });
        return unsubscribe;
    }, [id]);

    const toggleOverlay = () => {
        if (isOpen) {
            setGlobalActiveCard(null);
        } else {
            setGlobalActiveCard(id);
        }
    };

    const handleAddToCart = async (option, optionIndex) => {
        if (!startDate) {
            toast.error("Please select a start date first");
            return;
        }

        setLoading(true);
        try {
            const response = await apiClient.post("/cart/items", {
                product_id: id,
                option_index: optionIndex,
                start_date: startDate,
            });

            if (response.data.success) {
                toast.success(`Added ${title} (${option.days} days) to cart!`);

                if (onOptionSelect) {
                    const selectionInfo = {
                        productId: id,
                        productTitle: title,
                        ...option,
                    };
                    onOptionSelect(selectionInfo);
                }

                setGlobalActiveCard(null);
            } else {
                toast.error("Failed to add item to cart: " + (response.data.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            if (error.response?.data?.message) {
                toast.error("Failed to add to cart: " + error.response.data.message);
            } else {
                toast.error("Failed to add item to cart. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Calculate discount percentage if not provided
    const calculatedDiscount = discountPercentage ||
        Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

    const navigateToDetails = () => {
        navigate(`/products/${id}`);
    };

    return (
        <div className={`relative w-80 bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 ${className}`}>
            {/* Discount Badge */}
            {showDiscountBadge && calculatedDiscount > 0 && (
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                    {calculatedDiscount}% OFF
                </div>
            )}

            {/* Product Image */}
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-56 object-cover cursor-pointer"
                onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200?text=Product+Image";
                }}
                onClick={navigateToDetails}
            />

            {/* Content */}
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 cursor-pointer" onClick={navigateToDetails}>{title}</h2>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {description}
                </p>

                {/* Price with original strikethrough */}
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold text-blue-600">₹{discountedPrice}</span>
                    {originalPrice > discountedPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{originalPrice}</span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={toggleOverlay}
                    disabled={loading}
                    className={`w-full mt-4 py-2 rounded-lg font-medium transition ${
                        loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                    {loading ? "Adding..." : (isOpen ? "Hide Options" : buttonText)}
                </button>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center p-4 z-20"
                    onClick={() => setGlobalActiveCard(null)}
                >
                    <div
                        className="w-full max-h-full overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                            {overlayTitle}
                        </h3>

                        {/* Start Date Selection */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rental Start Date
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="space-y-2 mb-4">
                            {rentalOptions.map((option, index) => (
                                <div
                                    key={option.days}
                                    className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg hover:bg-gray-200 cursor-pointer transition"
                                >
                                    <div className="flex-1">
                                        <div className="font-medium">{option.days} Days</div>
                                        <div className="text-blue-600 font-semibold">₹{option.price}</div>
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(option, index)}
                                        disabled={loading}
                                        className={`px-4 py-2 rounded-lg font-medium transition ${
                                            loading
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-green-500 text-white hover:bg-green-600'
                                        }`}
                                    >
                                        {loading ? "..." : "Add"}
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setGlobalActiveCard(null)}
                            disabled={loading}
                            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:bg-gray-400"
                        >
                            {closeButtonText}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCard;