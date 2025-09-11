// src/pages/admin/AdminOrders.jsx
import React from "react";

const orders = [
    { id: 101, customer: "John Doe", total: 1200, status: "Pending" },
    { id: 102, customer: "Jane Smith", total: 800, status: "Completed" },
    { id: 103, customer: "Alice Johnson", total: 500, status: "Processing" },
];

const AdminOrders = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-700 border-b pb-6">Orders Management</h2>

            <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
                <table className="min-w-full table-auto">
                    <thead className="bg-pink-100 text-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left">Order ID</th>
                        <th className="px-6 py-3 text-left">Customer</th>
                        <th className="px-6 py-3 text-left">Total (₹)</th>
                        <th className="px-6 py-3 text-left">Status</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-pink-50">
                            <td className="px-6 py-3">{o.id}</td>
                            <td className="px-6 py-3">{o.customer}</td>
                            <td className="px-6 py-3">{o.total}</td>
                            <td className="px-6 py-3">{o.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;
