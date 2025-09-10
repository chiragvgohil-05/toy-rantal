// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo & Description */}
                <div>
                    <h1 className="text-2xl font-bold text-pink-600 mb-4">ToyTreasure</h1>
                    <p className="text-gray-400">
                        We provide the best toys and products with fast delivery and
                        excellent customer service.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="font-semibold mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="hover:text-pink-600 transition">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/toys" className="hover:text-pink-600 transition">
                                Toys
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-pink-600 transition">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-pink-600 transition">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h2 className="font-semibold mb-4">Customer Service</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/faq" className="hover:text-pink-600 transition">
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link to="/shipping" className="hover:text-pink-600 transition">
                                Shipping
                            </Link>
                        </li>
                        <li>
                            <Link to="/returns" className="hover:text-pink-600 transition">
                                Returns
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy" className="hover:text-pink-600 transition">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h2 className="font-semibold mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="bg-pink-600 p-2 rounded-full hover:bg-pink-500 transition"
                        >
                            <FaFacebookF size={16} />
                        </a>
                        <a
                            href="#"
                            className="bg-pink-600 p-2 rounded-full hover:bg-pink-500 transition"
                        >
                            <FaTwitter size={16} />
                        </a>
                        <a
                            href="#"
                            className="bg-pink-600 p-2 rounded-full hover:bg-pink-500 transition"
                        >
                            <FaInstagram size={16} />
                        </a>
                        <a
                            href="#"
                            className="bg-pink-600 p-2 rounded-full hover:bg-pink-500 transition"
                        >
                            <FaLinkedinIn size={16} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} BrandName. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
