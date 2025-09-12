// src/pages/Shipping.jsx
import React from "react";

const Shipping = () => {
    const shippingOptions = [
        {
            name: "Standard Delivery",
            price: "₹99",
            time: "3-5 business days",
            description: "Our most popular option for metro cities and major towns"
        },
        {
            name: "Express Delivery",
            price: "₹199",
            time: "1-2 business days",
            description: "Priority handling for urgent orders"
        },
        {
            name: "Free Delivery",
            price: "FREE",
            time: "5-7 business days",
            description: "On orders over ₹2,499"
        }
    ];

    const coverageAreas = [
        {
            region: "Metro Cities",
            cities: "Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad",
            delivery: "1-3 days"
        },
        {
            region: "Tier 2 Cities",
            cities: "Jaipur, Lucknow, Kochi, Chandigarh, Bhopal, Visakhapatnam, and 30+ more",
            delivery: "3-5 days"
        },
        {
            region: "Tier 3 Cities & Towns",
            cities: "Covering most urban areas across India",
            delivery: "5-7 days"
        }
    ];

    return (
        <div className="bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-purple-700 mb-4">Shipping Information</h1>
                    <p className="text-xl text-gray-600">
                        Everything you need to know about our delivery process and policies
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-200 mb-8">
                    <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <span className="bg-purple-100 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            </span>
                        Delivery Options
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {shippingOptions.map((option, index) => (
                            <div key={index} className="bg-purple-50 p-6 rounded-xl border border-purple-200 text-center">
                                <h3 className="font-bold text-lg text-purple-700 mb-2">{option.name}</h3>
                                <div className="text-2xl font-bold text-pink-500 mb-2">{option.price}</div>
                                <div className="text-gray-700 mb-2">{option.time}</div>
                                <p className="text-sm text-gray-600">{option.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-200 mb-8">
                    <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <span className="bg-purple-100 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
                        Delivery Coverage
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cities Covered</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimated Delivery</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {coverageAreas.map((area, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{area.region}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{area.cities}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{area.delivery}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <p className="text-blue-700 text-sm">
                                To check if we deliver to your specific location, please enter your PIN code during checkout or contact our customer support team.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-200">
                    <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <span className="bg-purple-100 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
                        Delivery Process
                    </h2>

                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="text-2xl font-bold text-purple-700 mb-2">1</div>
                            <h3 className="font-semibold text-gray-800 mb-1">Order Placed</h3>
                            <p className="text-sm text-gray-600">You place your rental order</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="text-2xl font-bold text-purple-700 mb-2">2</div>
                            <h3 className="font-semibold text-gray-800 mb-1">Order Processed</h3>
                            <p className="text-sm text-gray-600">We sanitize & prepare your toys</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="text-2xl font-bold text-purple-700 mb-2">3</div>
                            <h3 className="font-semibold text-gray-800 mb-1">Shipped</h3>
                            <p className="text-sm text-gray-600">Items dispatched to your address</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="text-2xl font-bold text-purple-700 mb-2">4</div>
                            <h3 className="font-semibold text-gray-800 mb-1">Delivered</h3>
                            <p className="text-sm text-gray-600">Toys arrive at your doorstep</p>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <p className="text-yellow-700 text-sm">
                                All our toys undergo a thorough sanitization process before being shipped to ensure your child's safety.
                                We use child-safe, non-toxic cleaning products that eliminate germs without leaving harmful residues.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;