// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { FaBoxOpen, FaShoppingCart, FaUsers } from "react-icons/fa";

const AdminDashboard = () => {
    const users = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "User" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
        { id: 3, name: "Admin", email: "admin@example.com", role: "Admin" },
    ];

    return (
        <div className="space-y-10">
            {/* Dashboard Header */}
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h2>
                <p className="text-gray-500">Quick insights about your platform</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Products */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-4">
                    <div className="bg-purple-100 p-4 rounded-xl">
                        <FaBoxOpen className="text-purple-600 text-3xl" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Products</p>
                        <p className="text-2xl font-bold text-gray-800">120</p>
                    </div>
                </div>

                {/* Total Orders */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-4">
                    <div className="bg-pink-100 p-4 rounded-xl">
                        <FaShoppingCart className="text-pink-600 text-3xl" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-800">85</p>
                    </div>
                </div>

                {/* Total Users */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-4">
                    <div className="bg-yellow-100 p-4 rounded-xl">
                        <FaUsers className="text-yellow-600 text-3xl" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Users</p>
                        <p className="text-2xl font-bold text-gray-800">54</p>
                    </div>
                </div>
            </div>

            {/* Users Management Section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Users Management</h2>
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {users.map((u) => (
                            <tr
                                key={u.id}
                                className="hover:bg-yellow-50 transition-all"
                            >
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
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
