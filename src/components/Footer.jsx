// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-pink-50 text-gray-700 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo & Description */}
                <div>
                    <h1 className="text-3xl font-extrabold text-pink-500 mb-3 tracking-wider">ToyTreasure</h1>
                    <p className="text-gray-600 text-sm">
                        Bringing joy to kids with amazing toys! Fast delivery and happy smiles guaranteed.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="font-bold mb-4 text-pink-400 text-lg">Quick Links</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="hover:text-pink-600 transition-all transform hover:scale-105">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/toys" className="hover:text-pink-600 transition-all transform hover:scale-105">
                                Toys
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-pink-600 transition-all transform hover:scale-105">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-pink-600 transition-all transform hover:scale-105">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h2 className="font-bold mb-4 text-pink-400 text-lg">Help & Support</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/faq" className="hover:text-pink-600 transition-all transform hover:scale-105">
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link to="/shipping" className="hover:text-pink-600 transition-all transform hover:scale-105">
                                Shipping
                            </Link>
                        </li>
                        <li>
                            <Link to="/returns" className="hover:text-pink-600 transition-all transform hover:scale-105">
                                Returns
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy" className="hover:text-pink-600 transition-all transform hover:scale-105">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h2 className="font-bold mb-4 text-pink-400 text-lg">Follow Us</h2>
                    <div className="flex space-x-3">
                        <a
                            href="#"
                            className="bg-pink-400 p-3 rounded-full hover:bg-pink-500 transition transform hover:rotate-12"
                        >
                            <FaFacebookF size={18} className="text-white" />
                        </a>
                        <a
                            href="#"
                            className="bg-yellow-400 p-3 rounded-full hover:bg-yellow-500 transition transform hover:-rotate-12"
                        >
                            <FaTwitter size={18} className="text-white" />
                        </a>
                        <a
                            href="#"
                            className="bg-green-400 p-3 rounded-full hover:bg-green-500 transition transform hover:scale-125"
                        >
                            <FaInstagram size={18} className="text-white" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-pink-200 mt-8 pt-4 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} ToyTreasure. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
