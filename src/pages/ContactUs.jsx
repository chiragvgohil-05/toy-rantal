// src/pages/ContactUs.jsx
import React, { useState } from "react";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
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

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            valid = false;
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            valid = false;
        }

        // Subject validation
        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
            valid = false;
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // In a real application, you would send the form data to your backend here
            console.log("Form submitted:", formData);
            setIsSubmitted(true);

            // Reset form after submission
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });

            // Reset submission status after 5 seconds
            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        }
    };

    const contactMethods = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: "Call Us",
            details: "+1 (555) 123-4567",
            description: "Mon-Fri from 8am to 6pm",
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Email Us",
            details: "support@playfulrent.com",
            description: "We'll respond within 24 hours",
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: "Visit Us",
            details: "123 Toy Street, Fun City",
            description: "FC 12345, United States",
        },
    ];

    const faqs = [
        {
            question: "What are your customer service hours?",
            answer: "Our customer service team is available Monday to Friday, 8am to 8pm, and Saturday 9am to 5pm (EST)."
        },
        {
            question: "How do I change or cancel my rental?",
            answer: "You can modify or cancel your rental up to 24 hours before your scheduled delivery date through your account dashboard or by contacting us directly."
        },
        {
            question: "What if a toy arrives damaged?",
            answer: "If any item arrives damaged, please contact us within 24 hours of delivery. We'll arrange for a replacement or provide a full refund for that item."
        },
        {
            question: "Do you offer gift certificates?",
            answer: "Yes! We offer digital gift certificates that can be purchased in any amount. They're perfect for birthdays, holidays, or just because!"
        },
    ];

    return (
        <div className="bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-purple-700 mb-4">Get in Touch</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Have questions about our toy rental service? We're here to help and would love to hear from you.
                    </p>
                </div>

                <div>
                    {/* Contact Form and FAQ */}
                    <div className="lg:col-span-2">
                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-md p-6 border border-pink-200 mb-8">
                            <h2 className="text-2xl font-bold text-purple-700 mb-6">Send us a Message</h2>

                            {isSubmitted ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-green-700 font-medium">Thank you for your message!</span>
                                    </div>
                                    <p className="text-green-600 text-sm mt-1">We'll get back to you within 24 hours.</p>
                                </div>
                            ) : null}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 ${
                                                errors.name ? "border-red-500" : "border-gray-300"
                                            }`}
                                            placeholder="Enter your name"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>
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
                                            placeholder="your.email@example.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 ${
                                            errors.subject ? "border-red-500" : "border-gray-300"
                                        }`}
                                        placeholder="What is this regarding?"
                                    />
                                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={5}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 ${
                                            errors.message ? "border-red-500" : "border-gray-300"
                                        }`}
                                        placeholder="How can we help you?"
                                    ></textarea>
                                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-xl shadow-md hover:from-purple-500 hover:to-pink-500 transition-all transform hover:-translate-y-0.5"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;