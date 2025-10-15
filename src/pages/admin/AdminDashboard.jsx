import React, { useEffect, useState } from "react";
import { FaBoxOpen, FaShoppingCart, FaUsers, FaTrash } from "react-icons/fa";
import apiClient from "../../apiClient";
import toast from "react-hot-toast";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, totalUsers: 0 });
    const [deletingId, setDeletingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Fetch users
    const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
            const res = await apiClient.get("/admin/users");
            setUsers(res.data);
        } catch (err) {
            toast.error("Failed to fetch users");
        } finally {
            setLoadingUsers(false);
        }
    };

    // Fetch dashboard stats
    const fetchStats = async () => {
        try {
            const res = await apiClient.get("/admin/stats");
            setStats(res.data);
        } catch (err) {
            toast.error("Failed to fetch stats");
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchStats();
    }, []);

    // Open delete modal
    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    // Close delete modal
    const closeDeleteModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    // Delete user
    const deleteUser = async () => {
        if (!selectedUser) return;
        setDeletingId(selectedUser.id);
        try {
            await apiClient.delete(`/admin/users/${selectedUser.id}`);
            toast.success(`User ${selectedUser.name} deleted`);
            setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
            setStats(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
        } catch (err) {
            toast.error(err?.response?.data?.message || "Delete failed");
        } finally {
            setDeletingId(null);
            closeDeleteModal();
        }
    };

    return (
        <div className="space-y-10">
            {/* Dashboard Header */}
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h2>
                <p className="text-gray-500">Quick insights about your platform</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-4">
                    <div className="bg-purple-100 p-4 rounded-xl">
                        <FaBoxOpen className="text-purple-600 text-3xl" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Products</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.totalProducts}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-4">
                    <div className="bg-pink-100 p-4 rounded-xl">
                        <FaShoppingCart className="text-pink-600 text-3xl" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-4">
                    <div className="bg-yellow-100 p-4 rounded-xl">
                        <FaUsers className="text-yellow-600 text-3xl" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Users</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
                    </div>
                </div>
            </div>

            {/* Users Management Section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Users Management</h2>
                {loadingUsers ? (
                    <p className="text-gray-500 py-6">Loading users...</p>
                ) : (
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {users.map((u) => (
                                <tr key={u.id} className="hover:bg-yellow-50 transition-all">
                                    <td className="px-6 py-3 text-sm text-gray-700">{u.id}</td>
                                    <td className="px-6 py-3 text-sm font-medium text-gray-800">{u.name}</td>
                                    <td className="px-6 py-3 text-sm text-gray-600">{u.email}</td>
                                    <td>
                                            <span
                                                className={`px-3 py-1 text-xs font-medium rounded-full ${
                                                    u.role === "Admin"
                                                        ? "bg-purple-100 text-purple-700"
                                                        : "bg-blue-100 text-blue-700"
                                                }`}
                                            >
                                                {u.role}
                                            </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => openDeleteModal(u)}
                                            disabled={u.role === "admin" || deletingId === u.id} // Disable if Admin
                                            className={`px-3 py-1 rounded flex items-center gap-1 
            ${u.role === "admin"
                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                : "bg-red-500 text-white hover:bg-red-600"} 
            disabled:opacity-50`}
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-2xl p-6 w-96 shadow-lg">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Confirm Delete</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete <strong>{selectedUser.name}</strong>?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={closeDeleteModal}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteUser}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2"
                                disabled={deletingId === selectedUser.id}
                            >
                                {deletingId === selectedUser.id ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
