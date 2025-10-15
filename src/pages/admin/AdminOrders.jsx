import React, { useEffect, useState } from "react";
import apiClient from "../../apiClient";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/ConfirmModal";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmingId, setConfirmingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [modal, setModal] = useState({ isOpen: false, id: null, action: null });

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

    const confirmOrder = async (id) => {
        setConfirmingId(id);
        try {
            const res = await apiClient.post(`/admin/orders/${id}/confirm`);
            toast.success(`Order ${res.data.order_number} confirmed!`);
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

    const deleteOrder = async (id) => {
        setDeletingId(id);
        try {
            await apiClient.delete(`/admin/orders/${id}`);
            toast.success(`Order ${id} deleted`);
            setOrders((prev) => prev.filter((o) => o.id !== id));
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Delete failed");
        } finally {
            setDeletingId(null);
        }
    };

    const toggleSelectOrder = (id) => {
        setSelectedOrders((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const deleteSelectedOrders = async () => {
        try {
            await apiClient.post("/admin/orders/delete-multiple", { ids: selectedOrders });
            toast.success(`${selectedOrders.length} orders deleted`);
            setOrders((prev) => prev.filter((o) => !selectedOrders.includes(o.id)));
            setSelectedOrders([]);
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Delete failed");
        }
    };

    const openModal = (id, action) => {
        setModal({ isOpen: true, id, action });
    };

    const handleModalConfirm = () => {
        if (modal.action === "delete") deleteOrder(modal.id);
        if (modal.action === "confirm") confirmOrder(modal.id);
        setModal({ isOpen: false, id: null, action: null });
    };

    const handleModalCancel = () => setModal({ isOpen: false, id: null, action: null });

    if (loading) return <p className="text-center py-6">Loading orders...</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-700 border-b pb-6">
                Orders Management
            </h2>

            {selectedOrders.length > 0 && (
                <button
                    onClick={() => openModal(null, "delete-multiple")}
                    className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Delete Selected ({selectedOrders.length})
                </button>
            )}

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
                            <td className="px-6 py-3 flex gap-2">
                                {o.status === "PLACED" && (
                                    <button
                                        onClick={() => openModal(o.id, "confirm")}
                                        disabled={confirmingId === o.id}
                                        className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                                    >
                                        {confirmingId === o.id ? "Confirming..." : "Confirm"}
                                    </button>
                                )}
                                <button
                                    onClick={() => openModal(o.id, "delete")}
                                    disabled={deletingId === o.id}
                                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                                >
                                    {deletingId === o.id ? "Deleting..." : "Delete"}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={modal.isOpen}
                title={modal.action === "delete" ? "Delete Order" : "Confirm Order"}
                message={
                    modal.action === "delete"
                        ? "Are you sure you want to delete this order?"
                        : "Are you sure you want to confirm this order?"
                }
                onConfirm={handleModalConfirm}
                onCancel={handleModalCancel}
            />
        </div>
    );
};

export default AdminOrders;
