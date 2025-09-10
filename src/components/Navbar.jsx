// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Use NavLink
import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";
import Logo from "../assets/Untitled design.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const activeClass = "border-b-2 border-pink-600";

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-28">
                {/* Logo */}
                <div className="flex items-center">
                    <NavLink to="/" className="text-2xl font-bold text-pink-600 h-44 pt-3">
                        <img src={Logo} alt="Logo" className="h-full w-auto" />
                    </NavLink>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 font-medium text-gray-700">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `hover:text-pink-600 transition ${isActive ? activeClass : ""}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/toys"
                        className={({ isActive }) =>
                            `hover:text-pink-600 transition ${isActive ? activeClass : ""}`
                        }
                    >
                        Toys
                    </NavLink>
                    <NavLink
                        to="/toys"
                        className={({ isActive }) =>
                            `hover:text-pink-600 transition ${isActive ? activeClass : ""}`
                        }
                    >
                        How it works
                    </NavLink>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4">
                    <NavLink
                        to="/account"
                        className="hidden md:block text-gray-600 hover:text-pink-600"
                    >
                        <FaUser size={20} />
                    </NavLink>

                    <NavLink to="/cart" className="relative text-gray-600 hover:text-pink-600">
                        <FaShoppingCart size={22} />
                        <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full px-1">
                          2
                        </span>
                    </NavLink>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-700 hover:text-pink-600"
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="flex flex-col space-y-4 text-start py-4 px-6 font-medium text-gray-700">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `hover:text-pink-600 ${isActive ? activeClass : ""}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/toys"
                            className={({ isActive }) =>
                                `hover:text-pink-600 ${isActive ? activeClass : ""}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            Toys
                        </NavLink>

                        <NavLink
                            to="/account"
                            className={({ isActive }) =>
                                `hover:text-pink-600 ${isActive ? activeClass : ""}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            My Account
                        </NavLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
