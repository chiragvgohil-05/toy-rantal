// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../apiClient";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6"; // Make sure you have react-icons installed

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelingId, setCancelingId] = useState(null); // Track order being cancelled
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [orderToCancel, setOrderToCancel] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get("/orders");

            if (Array.isArray(response.data)) {
                setOrders(response.data);
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Failed to load your orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleViewOrder = (orderId) => {
        navigate(`/orders/${orderId}`);
    };

    const openCancelModal = (order) => {
        setOrderToCancel(order);
        setShowCancelConfirm(true);
    };

    const handleCancelOrder = async () => {
        if (!orderToCancel) return;

        try {
            setCancelingId(orderToCancel.id);
            const response = await apiClient.post(`/orders/${orderToCancel.id}/cancel`);

            if (response.data.success) {
                toast.success("Order cancelled successfully!");
                setOrders((prevOrders) =>
                    prevOrders.map((o) =>
                        o.id === orderToCancel.id ? { ...o, status: "CANCELLED" } : o
                    )
                );
            } else {
                toast.error(response.data.message || "Failed to cancel order");
            }
        } catch (error) {
            console.error("Error cancelling order:", error);
            toast.error("Failed to cancel order");
        } finally {
            setCancelingId(null);
            setShowCancelConfirm(false);
            setOrderToCancel(null);
        }
    };

    return (
        <div className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-extrabold text-purple-700 mb-6 text-center md:text-left">
                    Your Orders
                </h1>

                {loading ? (
                    <div className="text-center py-20">
                        <h2 className="text-xl font-bold text-purple-700 mb-2">Loading orders...</h2>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📦</div>
                        <h2 className="text-2xl font-bold text-purple-700 mb-2">
                            You have no orders
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Place an order from the cart and come back here!
                        </p>
                        <button
                            onClick={() => navigate("/toys")}
                            className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-xl shadow-md hover:from-purple-500 hover:to-pink-500 transition-all"
                        >
                            Browse Toys
                        </button>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white rounded-2xl shadow-md border border-pink-200 p-6"
                            >
                                <div className="flex justify-between sm:items-center flex-col sm:flex-row gap-3">
                                    <div>
                                        <p className="font-semibold text-purple-700">
                                            Order #: {order.order_number || order.id}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            Placed on:{" "}
                                            {new Date(order.placed_at).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-800 font-semibold mt-1">
                                            Total: ₹{order.total_due}
                                        </p>
                                        <p
                                            className={`mt-1 font-semibold ${
                                                order.status === "CANCELLED"
                                                    ? "text-red-500"
                                                    : order.status === "DELIVERED"
                                                        ? "text-green-600"
                                                        : "text-purple-600"
                                            }`}
                                        >
                                            Status: {order.status}
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button
                                            onClick={() => handleViewOrder(order.id)}
                                            className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition w-full sm:w-auto"
                                        >
                                            View Details
                                        </button>

                                        {order.status !== "CANCELLED" &&
                                            order.status !== "DELIVERED" && (
                                                <button
                                                    onClick={() => openCancelModal(order)}
                                                    disabled={cancelingId === order.id}
                                                    className={`px-4 py-2 rounded-xl text-white transition w-full sm:w-auto ${
                                                        cancelingId === order.id
                                                            ? "bg-gray-400 cursor-not-allowed"
                                                            : "bg-red-500 hover:bg-red-600"
                                                    }`}
                                                >
                                                    {cancelingId === order.id ? "Cancelling..." : "Cancel Order"}
                                                </button>
                                            )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Cancel Confirmation Modal */}
            {showCancelConfirm && orderToCancel && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full relative shadow-lg">
                        <button
                            onClick={() => setShowCancelConfirm(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            <FaXmark />
                        </button>

                        <h3 className="text-lg font-bold text-gray-800 mb-2">Cancel Order</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to cancel{" "}
                            <span className="font-semibold">Order #{orderToCancel.order_number}</span>?
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
                                disabled={cancelingId === orderToCancel.id}
                                className={`px-4 py-2 rounded-lg text-white transition ${
                                    cancelingId === orderToCancel.id
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-red-500 hover:bg-red-600"
                                }`}
                            >
                                {cancelingId === orderToCancel.id ? "Cancelling..." : "Yes, Cancel"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
