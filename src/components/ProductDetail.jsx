// src/pages/ProductDetail.jsx
import React, { useState } from "react";

const ProductDetail = ({
                           id = 1,
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
    const [selectedOption, setSelectedOption] = useState(null);
    const [showOptions, setShowOptions] = useState(false);

    const handleSelect = (option) => {
        setSelectedOption(option);
        if (onOptionSelect) onOptionSelect(option);
        setShowOptions(false);
    };

    return (
        <>
            <div
                className={`bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 py-10 px-4 ${className}`}
            >
                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Product Image */}
                        <div className="relative">
                            <img
                                src={imageUrl}
                                alt={title}
                                className="w-full h-96 object-cover"
                            />
                            {showDiscountBadge && (
                                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-md">
                {discountPercentage}% OFF
              </span>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="p-6 flex flex-col justify-between">
                            <div>
                                <h1 className="text-3xl font-extrabold text-purple-700 mb-2">
                                    {title}
                                </h1>
                                <p className="text-gray-600 mb-4">{description}</p>

                                {/* Price Section */}
                                <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl font-bold text-pink-600">
                  ₹{discountedPrice}
                </span>
                                    <span className="text-gray-400 line-through">
                  ₹{originalPrice}
                </span>
                                </div>

                                {/* Rental Options */}
                                <div className="space-y-2">
                                    <h2 className="text-lg font-semibold text-purple-600 mb-1">
                                        Rental Options
                                    </h2>
                                    <div className="flex flex-wrap gap-3">
                                        {rentalOptions.map((option, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSelect(option)}
                                                className={`px-4 py-2 rounded-lg border font-medium ${
                                                    selectedOption?.days === option.days
                                                        ? "bg-purple-500 text-white border-purple-600"
                                                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                                                }`}
                                            >
                                                {option.days} days - ₹{option.price}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={() => setShowOptions(true)}
                                className="mt-6 w-full py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-xl shadow-md hover:from-purple-500 hover:to-pink-500 transition-all"
                            >
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Rental Option Modal */}
                {showOptions && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-bold text-purple-700 mb-4">
                                {overlayTitle}
                            </h2>
                            <div className="space-y-3">
                                {rentalOptions.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSelect(option)}
                                        className="w-full py-2 px-4 border rounded-lg hover:bg-gray-100"
                                    >
                                        {option.days} days – ₹{option.price}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setShowOptions(false)}
                                className="mt-4 w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-medium"
                            >
                                {closeButtonText}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <section className="how-it-works py-16 bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-12">
                        🚀 How It Works 🚀
                    </h2>
                    <div className="grid md:grid-cols-3 gap-10">

                        <div
                            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transition hover:-translate-y-2 hover:shadow-2xl">
                            <div className="w-20 h-20 bg-blue-100 flex items-center justify-center rounded-full mb-6">
                                <svg
                                    fill='#000000'
                                    width="50px"
                                    height="50px"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon flat-line"
                                >
                                    <polygon
                                        points="21 7 19 15 8 16 6.62 7 21 7"
                                        style={{
                                            fill: "rgb(44, 169, 188)",
                                            strokeWidth: 2,
                                        }}
                                    />
                                    <path
                                        d="M11,20.5h.1m5.9,0h.1"
                                        style={{
                                            fill: "none",
                                            stroke: "rgb(0, 0, 0)",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2.5,
                                        }}
                                    />
                                    <path
                                        d="M3,3H5.14a1,1,0,0,1,1,.85L6.62,7,8,16l11-1,2-8H6.62"
                                        style={{
                                            fill: "none",
                                            stroke: "rgb(0, 0, 0)",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                        }}
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Choose Toys</h3>
                            <p className="text-gray-600">Browse our wide collection and pick your child’s favorite
                                toys.</p>
                        </div>

                        <div
                            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transition hover:-translate-y-2 hover:shadow-2xl">
                            <div className="w-20 h-20 bg-green-100 flex items-center justify-center rounded-full mb-6">
                                <svg width="50px" height="50px" viewBox="0 0 1024 1024" className="icon" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M425.176 123.4h554.432v424.992H425.176z" fill="#E6246B"/>
                                    <path
                                        d="M893.832 809.152c47.384 0 85.784-38.392 85.784-85.784V543.624H425.976V241.288l-234.064-0.768L40.92 492.192V723.36c0 47.392 38.392 85.784 85.752 85.784h767.16z"
                                        fill="#F6B246"/>
                                    <path
                                        d="M893.832 809.152c47.384 0 85.784-38.392 85.784-85.784V603.832H40.92V723.36c0 47.392 38.392 85.784 85.752 85.784h767.16z"
                                        fill="#ECD4BE"/>
                                    <path
                                        d="M853.728 824.552c0 56.152-45.504 101.592-101.6 101.592-56.152 0-101.592-45.448-101.592-101.592 0-56.096 45.448-101.6 101.592-101.6 56.088 0 101.6 45.512 101.6 101.6zM379.584 824.552c0 56.152-45.48 101.592-101.6 101.592s-101.6-45.448-101.6-101.592c0-56.096 45.48-101.6 101.6-101.6s101.6 45.512 101.6 101.6z"
                                        fill="#0093D3"/>
                                    <path d="M264.192 454.568H62.848l109.128-178.736h92.216z" fill="#E09431"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Get Them Delivered</h3>
                            <p className="text-gray-600">We deliver clean, sanitized toys right to your doorstep.</p>
                        </div>

                        <div
                            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transition hover:-translate-y-2 hover:shadow-2xl">
                            <div className="w-20 h-20 bg-pink-100 flex items-center justify-center rounded-full mb-6">
                                <svg width="50px" height="50px" viewBox="-0.052 -0.028999999999999998 100.054 100.054"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#EBEEEF"
                                          d="M99.98 59.968s-.01-1.188-2.021-2.002c-8.553-4.242-42.326-20.5-42.326-20.5-1.232-.616-2.229-.616-3.461 0L1.945 62.112c-2.01.64-1.981 1.974-1.981 1.974-.021.008-.02 8.983 0 8.979 0 0 .034 1.215 2.021 1.91C10.531 78.82 44.25 94.539 44.25 94.539c1.231.614 2.229.614 3.461 0 0 0 40.562-19.354 50.223-23.727 1.949-.666 2.047-1.926 2.047-1.926.024.012.031-8.911-.001-8.918z"/>
                                    <path fill="#34495E"
                                          d="M30.462 60.748c4.684-2.346 12.275-2.346 16.96 0 4.684 2.344 4.684 6.146 0 8.488-4.685 2.346-12.276 2.346-16.96 0-4.683-2.343-4.683-6.145 0-8.488zm23-10c4.685-2.345 12.275-2.345 16.96 0 4.684 2.344 4.684 6.146 0 8.488-4.685 2.346-12.275 2.346-16.96 0-4.683-2.343-4.683-6.145 0-8.488z"/>
                                    <path fill="#C0392C"
                                          d="M55.586 49.311c3.514-1.758 9.207-1.758 12.721 0 1.625.814 2.498-.138 2.619.928.018.161.02 3.322.004 3.482-.106 1.075-.98 2.136-2.623 2.957-3.514 1.758-9.207 1.758-12.721 0-1.599-.8-2.469-1.826-2.613-2.871-.021-.156-.024-3.312-.016-3.467.075-1.101.951-.19 2.629-1.029z"/>
                                    <path fill="#E74C3C"
                                          d="M55.586 47.311c3.514-1.758 9.207-1.758 12.721 0 3.512 1.758 3.512 4.608 0 6.367-3.514 1.758-9.207 1.758-12.721 0-3.513-1.759-3.513-4.609 0-6.367z"/>
                                    <path fill="#95A5A6"
                                          d="M32.586 59.311c3.513-1.758 9.208-1.758 12.72 0 3.513 1.758 3.513 5.608 0 7.367-3.512 1.758-9.207 1.758-12.72 0-3.513-1.759-3.513-5.61 0-7.367z"/>
                                    <path fill="#34495E" d="M34.958 25.001v37c0 1.104 1.791 2 4 2s4-.896 4-2v-37h-8z"/>
                                    <path fill="#2C3E50"
                                          d="M34.958 31.445c1.274.353 2.612.556 4 .556 1.387 0 2.725-.204 4-.556v-6.443h-8v6.443z"/>
                                    <path fill="#E74C3C"
                                          d="M38.958.001c8.284 0 15 6.716 15 15s-6.716 15-15 15-15-6.716-15-15 6.716-15 15-15z"/>
                                    <path fill="#C0392C"
                                          d="M26.958 12.001c0-3.376 1.129-6.481 3.012-8.988-3.644 2.737-6.012 7.081-6.012 11.988 0 8.284 6.716 15 15 15 4.908 0 9.251-2.368 11.986-6.012a14.903 14.903 0 0 1-8.986 3.012c-8.284 0-15-6.716-15-15z"/>
                                    <path fill="#BDC3C7"
                                          d="M99.98 68.887s-.099 1.26-2.047 1.926c-9.66 4.371-50.224 23.726-50.224 23.726-1.232.615-2.229.615-3.461 0 0 0-33.719-15.718-42.265-19.562-1.987-.694-2.021-1.91-2.021-1.91-.006.001-.01-.856-.012-2.039-.006 2.642-.001 7.041.012 7.039 0 0 .034 1.216 2.021 1.91C10.531 83.82 44.25 99.539 44.25 99.539c1.231.614 2.229.614 3.461 0 0 0 40.562-19.354 50.223-23.727 1.949-.666 2.047-1.926 2.047-1.926.02.008.025-4.646.02-7.231-.007 1.281-.013 2.236-.021 2.232z"/>
                                    <path fill="#D4D7DA"
                                          d="M99.977 59.917c-.021.149-.227 1.272-2.043 1.896-9.66 4.371-50.223 23.726-50.223 23.726-1.232.615-2.229.615-3.461 0 0 0-33.718-15.718-42.265-19.562-1.959-.685-2.02-1.869-2.021-1.903v.014c-.021.006-.02 8.983 0 8.979 0 0 .034 1.216 2.021 1.91C10.531 78.82 44.25 94.539 44.25 94.539c1.231.614 2.229.614 3.461 0 0 0 40.562-19.354 50.223-23.727 1.949-.666 2.047-1.926 2.047-1.926.024.012.031-8.912 0-8.918l-.004-.051z"/>
                                    <path fill="#BDC3C7"
                                          d="M44.25 85.539S10.532 69.82 1.985 65.977c-1.959-.687-2.02-1.869-2.021-1.903v.014c-.021.008-.02 8.983 0 8.979 0 0 .034 1.216 2.021 1.91C10.531 78.82 44.25 94.539 44.25 94.539c.615.307 1.173.461 1.73.461v-9c-.557 0-1.115-.154-1.73-.461z"/>
                                    <path fill="#95A5A6"
                                          d="M44.25 94.539S10.532 78.82 1.985 74.977c-1.987-.694-2.021-1.91-2.021-1.91-.006.001-.01-.854-.012-2.039-.006 2.642-.001 7.041.012 7.039 0 0 .034 1.216 2.021 1.91C10.531 83.82 44.25 99.539 44.25 99.539c.616.308 1.173.461 1.73.461v-5c-.557 0-1.115-.154-1.73-.461z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Play & Return</h3>
                            <p className="text-gray-600">Enjoy toys for the rental period, then schedule an easy
                                return.</p>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetail;
