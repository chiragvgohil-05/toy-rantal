import React from "react";

const Returns = () => {
    const returnReasons = [
        {
            reason: "Changed mind",
            policy: "Free returns within 24 hours of delivery",
            process: "Contact customer support to initiate return"
        },
        {
            reason: "Defective/Damaged item",
            policy: "Free replacement or full refund",
            process: "Report within 48 hours with photos"
        },
        {
            reason: "Wrong item received",
            policy: "Free exchange or full refund",
            process: "Report within 24 hours of delivery"
        }
    ];

    const refundTimelines = [
        {
            method: "Credit/Debit Card",
            timeline: "5-7 business days",
            notes: "Reflected on your statement based on bank processing times"
        },
        {
            method: "UPI",
            timeline: "24-48 hours",
            notes: "Usually the fastest refund method"
        },
        {
            method: "Bank Transfer",
            timeline: "3-5 business days",
            notes: "Requires account details verification"
        },
        {
            method: "Wallet",
            timeline: "Instant to 24 hours",
            notes: "Depends on wallet provider policies"
        }
    ];

    return (
        <div className="bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-purple-700 mb-4">Returns & Refunds</h1>
                    <p className="text-xl text-gray-600">
                        Our hassle-free return policy ensures your complete satisfaction
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-200 mb-8">
                    <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <span className="bg-purple-100 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </span>
                        Return Policy
                    </h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Our Return Guarantee</h3>
                        <p className="text-gray-600 mb-4">
                            We want you to be completely satisfied with your rental. If you're not happy with your toys
                            for any reason,
                            we offer a straightforward return process. Most returns are free and can be initiated within
                            24 hours of delivery.
                        </p>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2"
                                     viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span className="text-green-700 font-medium">Free pickup for returns</span>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Return Reasons & Policies</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Process
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {returnReasons.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.reason}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{item.policy}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{item.process}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-200">
                    <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <span className="bg-purple-100 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </span>
                        Rental Extension & Early Returns
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                            <h3 className="font-bold text-lg text-purple-700 mb-3">Extending Your Rental</h3>
                            <p className="text-gray-600 mb-4">
                                Love the toys and want to keep them longer? You can extend your rental period easily
                                through your account dashboard.
                            </p>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <span>Extensions must be requested at least 2 days before rental end date</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <span>Additional rental charges will apply for extended periods</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <span>Extension availability depends on whether the toys have been requested by other customers</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
                            <h3 className="font-bold text-lg text-pink-700 mb-3">Early Returns</h3>
                            <p className="text-gray-600 mb-4">
                                Need to return your toys earlier than planned? We offer flexible early return options.
                            </p>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="h-5 w-5 text-pink-500 mr-2 flex-shrink-0" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <span>Early returns must be requested through your account dashboard</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="h-5 w-5 text-pink-500 mr-2 flex-shrink-0" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <span>Refunds for unused rental days are issued as account credit</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="h-5 w-5 text-pink-500 mr-2 flex-shrink-0" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <span>Free pickup is available for early returns</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Returns;