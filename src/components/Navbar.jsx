// src/components/Navbar.jsx
import React, { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";
import Logo from "../assets/logo2.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // mobile menu
    const [userDropdown, setUserDropdown] = useState(false); // user dropdown
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const { isLoggedIn, logout, user } = useContext(AuthContext);

    const activeClass = "border-b-2 border-pink-600";

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setUserDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-20">
                {/* Logo */}
                <div className="flex items-center">
                    <NavLink to="/" className="text-2xl font-bold text-pink-600 h-20 pt-3">
                        <img src={Logo} alt="Logo" className="h-full w-auto" />
                    </NavLink>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 font-medium text-gray-700">
                    <NavLink to="/" className={({ isActive }) => `hover:text-pink-600 transition ${isActive ? activeClass : ""}`}>Home</NavLink>
                    <NavLink to="/toys" className={({ isActive }) => `hover:text-pink-600 transition ${isActive ? activeClass : ""}`}>Toys</NavLink>
                    <NavLink to="/about" className={({ isActive }) => `hover:text-pink-600 transition ${isActive ? activeClass : ""}`}>About Us</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => `hover:text-pink-600 transition ${isActive ? activeClass : ""}`}>Contact Us</NavLink>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4 relative">
                    {isLoggedIn && (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setUserDropdown(!userDropdown)}
                                className="flex items-center text-gray-600 hover:text-pink-600 focus:outline-none"
                            >
                                <FaUser size={20} />
                                <span className="ml-2 hidden md:inline">{user?.name || "User"}</span>
                            </button>

                            {userDropdown && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
                                    <NavLink
                                        to="/profile"
                                        onClick={() => setUserDropdown(false)}
                                        className="block px-4 py-2 text-gray-700 hover:bg-pink-100"
                                    >
                                        Profile
                                    </NavLink>
                                    <NavLink
                                        to="/orders"
                                        onClick={() => setUserDropdown(false)}
                                        className="block px-4 py-2 text-gray-700 hover:bg-pink-100"
                                    >
                                        Orders
                                    </NavLink>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-pink-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

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
                        <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => `hover:text-pink-600 ${isActive ? activeClass : ""}`}>Home</NavLink>
                        <NavLink to="/toys" onClick={() => setIsOpen(false)} className={({ isActive }) => `hover:text-pink-600 ${isActive ? activeClass : ""}`}>Toys</NavLink>
                        <NavLink to="/about" onClick={() => setIsOpen(false)} className={({ isActive }) => `hover:text-pink-600 ${isActive ? activeClass : ""}`}>About Us</NavLink>
                        <NavLink to="/contact" onClick={() => setIsOpen(false)} className={({ isActive }) => `hover:text-pink-600 ${isActive ? activeClass : ""}`}>Contact Us</NavLink>
                        {isLoggedIn && (
                            <>
                                <NavLink to="/profile" onClick={() => setIsOpen(false)} className="hover:text-pink-600">Profile</NavLink>
                                <button onClick={handleLogout} className="text-left hover:text-pink-600">Logout</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
