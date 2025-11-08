// src/pages/Shipping.jsx
import React from "react";

const Shipping = () => {
    return (
        <div className="bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-purple-700 mb-4">
                        Pickup & Collection Information
                    </h1>
                    <p className="text-xl text-gray-600">
                        We currently do not offer delivery. All toys must be collected in person from our store.
                    </p>
                </div>

                {/* Store Pickup Details */}
                <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-200 mb-8">
                    <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
                        <span className="bg-purple-100 p-2 rounded-full mr-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-purple-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.1 0-2 .9-2 2v6h4v-6c0-1.1-.9-2-2-2zM5 12h14v6H5v-6z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 18h16M4 6h16M9 6v6m6-6v6"
                                />
                            </svg>
                        </span>
                        Store Pickup Only
                    </h2>

                    <p className="text-gray-700 leading-relaxed mb-4">
                        We’re happy to let you know that your orders will be prepared and
                        ready for collection directly from our store. This ensures every toy
                        is freshly sanitized, safely packed, and ready for your child’s
                        enjoyment.
                    </p>

                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Place your order online or in-store.</li>
                        <li>You’ll receive a confirmation once your order is ready.</li>
                        <li>Visit our store during pickup hours to collect your toys.</li>
                        <li>Bring your order ID or confirmation email for verification.</li>
                    </ul>
                </div>

                {/* Payment & Rental Process */}
                <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-200 mb-8">
                    <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
                        <span className="bg-purple-100 p-2 rounded-full mr-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-purple-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.1 0-2 .9-2 2v6h4v-6c0-1.1-.9-2-2-2zM5 12h14v6H5v-6z"
                                />
                            </svg>
                        </span>
                        Payment & Rental Process
                    </h2>

                    <p className="text-gray-700 leading-relaxed mb-4">
                        At the time of collecting your toy from our store, you are required to pay the full amount of the toy as a security deposit.
                        Once the rental period (timeline) is completed and you return the toy in good condition:
                    </p>

                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>The store will verify the toy’s condition.</li>
                        <li>The rent amount will be deducted from the total payment.</li>
                        <li>The remaining balance will be refunded to you immediately.</li>
                    </ul>

                    <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-9 4l-3-3 1.414-1.414L9 11.172l4.586-4.586L15 8l-6 6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p className="text-green-700 text-sm">
                                You only pay for the rental time used. Full payment is refunded after return, minus the rent charge.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Store Location & Hours */}
                <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-200">
                    <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
                        <span className="bg-purple-100 p-2 rounded-full mr-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-purple-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </span>
                        Store Location & Hours
                    </h2>

                    <div className="text-gray-700 space-y-2">
                        <p><strong>📍 Address:</strong> 123 Toy World Avenue, Ahmedabad, Gujarat</p>
                        <p><strong>🕒 Pickup Hours:</strong> Monday – Saturday, 10:00 AM – 7:00 PM</p>
                        <p><strong>📞 Contact:</strong> +91 98765 43210</p>
                    </div>

                    <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p className="text-yellow-700 text-sm">
                                Please collect your toys within 3 days of order confirmation.
                                Uncollected orders may be canceled automatically.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
