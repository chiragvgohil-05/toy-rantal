// src/pages/SingleOrder.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../apiClient";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";

const SingleOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [canceling, setCanceling] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const API_URL = process.env.REACT_APP_API_URL;

    const fetchOrder = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(`/orders/${id}`);

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch order");
            }

            setOrder(response.data.order);
        } catch (error) {
            console.error("Error fetching order:", error);
            toast.error("Failed to load order details");
            setOrder(null);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Cancel Order API
    const handleCancelOrder = async () => {
        setShowCancelConfirm(false); // if you use modal
        try {
            setCanceling(true);
            const response = await apiClient.post(`/orders/${id}/cancel`);

            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/orders");
            } else {
                toast.error(response.data.message || "Failed to cancel order");
            }
        } catch (error) {
            console.error("Cancel order error:", error);
            toast.error("Something went wrong while cancelling the order");
        } finally {
            setCanceling(false);
        }
    };


    useEffect(() => {
        fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h2 className="text-xl font-bold text-purple-700">Loading order details...</h2>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h2 className="text-xl font-bold text-red-600">Order not found</h2>
                <button
                    onClick={() => navigate("/orders")}
                    className="mt-4 px-6 py-3 bg-purple-500 text-white rounded-lg"
                >
                    Back to Orders
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            {/* Header */}
            <h1 className="text-3xl font-extrabold text-purple-700 mb-4">
                Order #{order.order_number}
            </h1>

            {/* Order Summary */}
            <div className="bg-white shadow-md rounded-xl p-6 mb-6">
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Payment Mode:</strong> COD</p>
                <p><strong>Total Due:</strong> ₹{order.total_due}</p>
                <p><strong>Placed At:</strong> {new Date(order.placed_at).toLocaleString()}</p>

                {/* ✅ Cancel Button (only show if not cancelled or delivered) */}
                {order.status !== "CANCELLED" && order.status !== "DELIVERED" && (
                    <button
                        onClick={() => setShowCancelConfirm(true)}
                        disabled={canceling}
                        className={`mt-4 px-6 py-3 rounded-lg font-bold shadow-md transition-all ${
                            canceling
                                ? "bg-gray-400 text-white cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                    >
                        {canceling ? "Cancelling..." : "Cancel Order"}
                    </button>
                )}
            </div>

            {/* Items List */}
            <h2 className="text-2xl font-bold text-purple-600 mb-3">Items</h2>

            <div className="space-y-4">
                {order.items && order.items.length > 0 ? (
                    order.items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center bg-white shadow rounded-xl p-4"
                        >
                            <img
                                src={`${API_URL.replace("/api", "")}${item.images[0]}`}

                                alt={item.title}
                                className="w-20 h-20 rounded-lg object-cover mr-4"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-purple-700">{item.title}</h3>
                                <p className="text-gray-600 text-sm">
                                    Duration: {item.duration_days} days
                                </p>
                                <p className="text-gray-600 text-sm">
                                    Start: {new Date(item.start_date).toLocaleDateString()}
                                </p>
                                <p className="text-gray-600 text-sm">
                                    End: {new Date(item.end_date).toLocaleDateString()}
                                </p>
                                <p className="font-semibold text-gray-800 mt-1">
                                    ₹{item.item_price}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No items found in this order.</p>
                )}
            </div>

            {/* Back Button */}
            <div className="mt-8">
                <button
                    onClick={() => navigate("/orders")}
                    className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-xl shadow-md hover:from-purple-500 hover:to-pink-500 transition-all"
                >
                    Back to Orders
                </button>
            </div>

            {/* ✅ Cancel Confirmation Modal */}
            {showCancelConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full relative shadow-lg">
                        {/* Close Icon */}
                        <button
                            onClick={() => setShowCancelConfirm(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            <FaXmark />
                        </button>

                        <h3 className="text-lg font-bold text-gray-800 mb-2">Cancel Order</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to cancel{" "}
                            <span className="font-semibold">Order #{order.order_number}</span>?
                        </p>

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowCancelConfirm(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                            >
                                No, Keep Order
                            </button>
                            <button
                                onClick={handleCancelOrder}
                                disabled={canceling}
                                className={`px-4 py-2 rounded-lg text-white transition ${
                                    canceling
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-red-500 hover:bg-red-600"
                                }`}
                            >
                                {canceling ? "Cancelling..." : "Yes, Cancel"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleOrder;
