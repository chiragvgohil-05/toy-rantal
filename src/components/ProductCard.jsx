// src/components/ProductCard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
                         imageUrl = "https://img.freepik.com/free-photo/kids-toys_144627-38648.jpg",
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
    const [id] = useState(() => propId || autoId++); // Use provided ID or generate one
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

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

    const handleOptionClick = (option) => {
        const selectionInfo = {
            productId: id,
            productTitle: title,
            ...option,
        };

        if (onOptionSelect) {
            onOptionSelect(selectionInfo);
        } else {
            console.log(`Card ${id} → Selected: ${option.days} days - ₹${option.price}`);
        }

        setGlobalActiveCard(null);
    };

    // Calculate discount percentage if not provided
    const calculatedDiscount = discountPercentage ||
        Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

    const navigateToDetails = () => {
        navigate(`/products/${id}`);
    }

    return (
        <div className={`relative max-w-sm bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 m-4 ${className}`}>
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
                <p className="text-gray-600 text-sm mt-2">
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
                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                    {isOpen ? "Hide Options" : buttonText}
                </button>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center p-4 z-20"
                    onClick={() => setGlobalActiveCard(null)}
                >
                    <div
                        className="w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                            {overlayTitle}
                        </h3>

                        <div className="space-y-2">
                            {rentalOptions.map((option) => (
                                <div
                                    key={option.days}
                                    onClick={() => handleOptionClick(option)}
                                    className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 cursor-pointer transition"
                                >
                                    <span className="font-medium">{option.days} Days</span>
                                    <span className="text-blue-600 font-semibold">
                    ₹{option.price}
                  </span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setGlobalActiveCard(null)}
                            className="block mt-4 mx-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
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