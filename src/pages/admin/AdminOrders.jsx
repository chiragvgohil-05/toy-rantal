// src/pages/admin/AdminOrders.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../../apiClient"; // Make sure apiClient is your axios/fetch wrapper
import toast from "react-hot-toast";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmingId, setConfirmingId] = useState(null);

    // Fetch orders from backend
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await apiClient.get("/admin/orders");
            setOrders(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Confirm an order
    const confirmOrder = async (id) => {
        setConfirmingId(id);
        try {
            const res = await apiClient.post(`/admin/orders/${id}/confirm`);
            toast.success(`Order ${res.data.order_number} confirmed!`);
            // Update the order status locally
            setOrders((prev) =>
                prev.map((o) => (o.id === id ? { ...o, status: "CONFIRMED" } : o))
            );
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Confirm failed");
        } finally {
            setConfirmingId(null);
        }
    };

    if (loading) return <p className="text-center py-6">Loading orders...</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-700 border-b pb-6">
                Orders Management
            </h2>

            <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
                <table className="min-w-full table-auto">
                    <thead className="bg-pink-100 text-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left">Order ID</th>
                        <th className="px-6 py-3 text-left">Customer</th>
                        <th className="px-6 py-3 text-left">Total (₹)</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-pink-50">
                            <td className="px-6 py-3">{o.id}</td>
                            <td className="px-6 py-3">{o.user_id}</td>
                            <td className="px-6 py-3">{o.total_due}</td>
                            <td className="px-6 py-3">{o.status}</td>
                            <td className="px-6 py-3">
                                {o.status === "PLACED" && (
                                    <button
                                        onClick={() => confirmOrder(o.id)}
                                        disabled={confirmingId === o.id}
                                        className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                                    >
                                        {confirmingId === o.id ? "Confirming..." : "Confirm"}
                                    </button>
                                )}
                                {o.status !== "PLACED" && <span className="text-gray-500">-</span>}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;
