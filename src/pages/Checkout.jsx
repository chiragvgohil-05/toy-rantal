// src/pages/Checkout.jsx
import React, { useState } from "react";

const Checkout = () => {
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zipCode: "",
        phone: "",
        saveInfo: false,
        paymentMethod: "cash-on-delivery",
    });

    const [errors, setErrors] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phone: "",
    });

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone) => {
        const re = /^[0-9]{10}$/;
        return re.test(phone.replace(/\D/g, ''));
    };

    const validateZipCode = (zipCode) => {
        const re = /^[0-9]{6}$/;
        return re.test(zipCode.replace(/\D/g, ''));
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            valid = false;
        }

        // First name validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
            valid = false;
        }

        // Last name validation
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
            valid = false;
        }

        // Address validation
        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
            valid = false;
        }

        // City validation
        if (!formData.city.trim()) {
            newErrors.city = "City is required";
            valid = false;
        }

        // State validation
        if (!formData.state.trim()) {
            newErrors.state = "State is required";
            valid = false;
        }

        // ZIP code validation
        if (!formData.zipCode) {
            newErrors.zipCode = "ZIP code is required";
            valid = false;
        } else if (!validateZipCode(formData.zipCode)) {
            newErrors.zipCode = "Please enter a valid 6-digit ZIP code";
            valid = false;
        }

        // Phone validation
        if (!formData.phone) {
            newErrors.phone = "Phone number is required";
            valid = false;
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Handle form submission logic here
            console.log("Form submitted:", formData);
            alert("Order placed successfully!");
        }
    };

    const orderItems = [
        {
            id: 1,
            title: "Teddy Bear",
            rentalDays: 7,
            price: 550,
            quantity: 1,
            imageUrl: "https://picsum.photos/200?1",
        },
        {
            id: 2,
            title: "Toy Car",
            rentalDays: 15,
            price: 600,
            quantity: 2,
            imageUrl: "https://picsum.photos/200?2",
        },
    ];

    const subtotal = orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const shipping = 99;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
        <div className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-3xl font-extrabold text-purple-700 mb-2 text-center">
                    Checkout
                </h1>
                <p className="text-gray-600 text-center mb-8">Complete your rental order</p>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Customer Information */}
                    <div className="space-y-6">
                        {/* Contact Information */}
                        <div className="bg-white rounded-2xl shadow-md p-6 border border-pink-200">
                            <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                <span className="bg-purple-100 p-2 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </span>
                                Contact Information
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 ${
                                            errors.email ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white rounded-2xl shadow-md p-6 border border-pink-200">
                            <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                <span className="bg-purple-100 p-2 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </span>
                                Shipping Address
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 ${
                                            errors.firstName ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 ${
                                            errors.lastName ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 ${
                                        errors.address ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                            </div>
                            <div className="mt-4">
                                <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
                                    Apartment, suite, etc. (optional)
                                </label>
                                <input
                                    type="text"
                                    id="apartment"
                                    name="apartment"
                                    value={formData.apartment}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 ${
                                            errors.city ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                </div>
                                <div>
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 ${
                                            errors.state ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                                        ZIP Code
                                    </label>
                                    <input
                                        type="text"
                                        id="zipCode"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 ${
                                            errors.zipCode ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                    {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 ${
                                            errors.phone ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="saveInfo"
                                        checked={formData.saveInfo}
                                        onChange={handleInputChange}
                                        className="rounded text-purple-500 focus:ring-purple-300"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Save this information for next time</span>
                                </label>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-2xl shadow-md p-6 border border-pink-200">
                            <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                <span className="bg-purple-100 p-2 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                </span>
                                Payment Method
                            </h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    {/* Cash on Delivery Option */}
                                    <div>
                                        <input
                                            type="radio"
                                            id="cash-on-delivery"
                                            name="paymentMethod"
                                            value="cash-on-delivery"
                                            checked={formData.paymentMethod === "cash-on-delivery"}
                                            onChange={handleInputChange}
                                            className="sr-only"
                                        />
                                        <label
                                            htmlFor="cash-on-delivery"
                                            className={`flex items-center p-4 border rounded-lg cursor-pointer ${formData.paymentMethod === "cash-on-delivery" ? "border-purple-500 bg-purple-50" : "border-gray-300"}`}
                                        >
                                            <div className={`flex items-center justify-center w-6 h-6 rounded-full border mr-3 ${formData.paymentMethod === "cash-on-delivery" ? "border-purple-500 bg-purple-500" : "border-gray-400"}`}>
                                                {formData.paymentMethod === "cash-on-delivery" && (
                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div>
                                                <span className="font-medium">Cash on Delivery</span>
                                                <p className="text-sm text-gray-600 mt-1">Pay with cash when your order is delivered</p>
                                            </div>
                                        </label>
                                    </div>

                                    {/* Online Payment Option (Disabled) */}
                                    <div className="opacity-60">
                                        <input
                                            type="radio"
                                            id="online-payment"
                                            name="paymentMethod"
                                            value="online-payment"
                                            checked={formData.paymentMethod === "online-payment"}
                                            onChange={handleInputChange}
                                            className="sr-only"
                                            disabled
                                        />
                                        <label
                                            htmlFor="online-payment"
                                            className={`flex items-center p-4 border rounded-lg cursor-not-allowed ${formData.paymentMethod === "online-payment" ? "border-gray-400 bg-gray-100" : "border-gray-300"}`}
                                        >
                                            <div className={`flex items-center justify-center w-6 h-6 rounded-full border mr-3 ${formData.paymentMethod === "online-payment" ? "border-gray-400 bg-gray-400" : "border-gray-300"}`}>
                                                {formData.paymentMethod === "online-payment" && (
                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div>
                                                <span className="font-medium">Online Payment</span>
                                                <p className="text-sm text-gray-600 mt-1">Pay securely online (Currently unavailable)</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Cash on Delivery Instructions */}
                                {formData.paymentMethod === "cash-on-delivery" && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                                        <div className="flex items-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            <p className="text-blue-700 text-sm">Please have the exact amount ready when our delivery person arrives. We accept cash only for COD orders.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-md p-6 border border-pink-200 sticky top-24">
                            <h2 className="text-xl font-bold text-purple-700 mb-4">Order Summary</h2>

                            <div className="space-y-4 mb-4">
                                {orderItems.map((item) => (
                                    <div key={item.id} className="flex items-center">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div className="ml-4 flex-1">
                                            <h3 className="font-medium text-gray-800">{item.title}</h3>
                                            <p className="text-sm text-gray-600">{item.rentalDays} days rental</p>
                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="font-medium text-gray-800">₹{item.price * item.quantity}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 border-t border-gray-200 pt-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="text-gray-800">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-gray-800">₹{shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="text-gray-800">₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                                    <span>Total</span>
                                    <span className="text-purple-700">₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-6 w-full py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-xl shadow-md hover:from-purple-500 hover:to-pink-500 transition-all transform hover:-translate-y-0.5"
                            >
                                {formData.paymentMethod === "cash-on-delivery" ? "Place Order (Cash on Delivery)" : "Place Order"}
                            </button>

                            <div className="bg-white rounded-2xl shadow-md p-6 mt-5 border border-pink-200">
                                <h3 className="font-bold text-gray-700 mb-2">Rental Policy</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Items must be returned in original condition</li>
                                    <li>• Late returns incur additional charges</li>
                                    <li>• Damage to items may result in fees</li>
                                    <li>• Free pickup and delivery within city limits</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;