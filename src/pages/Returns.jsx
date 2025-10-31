import React from "react";

const Returns = () => {
    const returnReasons = [
        {
            reason: "Changed mind",
            policy: "Free returns within 24 hours of delivery",
            process: "Contact customer support to initiate return",
        },
        {
            reason: "Defective/Damaged item",
            policy: "Free replacement or full refund",
            process: "Report within 48 hours with photos",
        },
    ];

    // ✅ Only cash-based refund system
    const refundTimelines = [
        {
            method: "Cash Refund",
            timeline: "Within 3 business days after toy return verification",
            notes: "Refunds are given only in cash at the time of pickup or drop-off verification.",
        },
    ];

    return (
        <div className="bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-purple-700 mb-4">
                        Returns, Refunds & Payments
                    </h1>
                    <p className="text-xl text-gray-600">
                        Simple cash-only policy for all rentals and returns
                    </p>
                </div>

                {/* Payment & Refund Overview */}
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
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V4m0 16v-4"
                                />
                            </svg>
                        </span>
                        Cash-Only Transactions
                    </h2>

                    <p className="text-gray-600 mb-4">
                        At <strong>PlayfulRent</strong>, we operate only through cash transactions.
                        No online, card, or UPI payments are accepted. All payments, deposits, and refunds
                        are handled in person in cash for security and transparency.
                    </p>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <p className="text-yellow-800 text-sm">
                            When you place an order, the store collects the full toy value in cash at the time of delivery or pickup.
                            Once your rental period is complete and the toy is returned in good condition,
                            the full payment amount is refunded to you in cash — after deducting the rental charge only.
                        </p>
                    </div>
                </div>

                {/* Return Policy Section */}
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
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                        </span>
                        Return Policy
                    </h2>

                    <p className="text-gray-600 mb-6">
                        We want you to be completely satisfied with your rental. If you're not happy with your order,
                        we offer a straightforward return process. Most returns are free and can be initiated within 24 hours of delivery.
                    </p>

                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Return Reasons & Policies
                    </h3>
                    <div className="overflow-x-auto mb-8">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Reason
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Policy
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Process
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {returnReasons.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.reason}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{item.policy}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{item.process}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ✅ Cash Refund Section */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Refund Timelines
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Refund Method
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Timeline
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Notes
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {refundTimelines.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.method}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{item.timeline}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{item.notes}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Returns;
