// src/components/AdminLayout.jsx
import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
    FaTachometerAlt,
    FaBoxOpen,
    FaShoppingCart,
    FaBars,
    FaSignOutAlt,
    FaUserCircle
} from "react-icons/fa";
import Logo from "../assets/logo2.png";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    // Handle responsiveness
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);

            // On larger screens, automatically open the sidebar
            if (!mobile) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        // Set initial state based on screen size
        if (window.innerWidth >= 1024) {
            setSidebarOpen(true);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        if (isMobile) {
            setSidebarOpen(false);
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Overlay for mobile when sidebar is open */}
            {sidebarOpen && isMobile && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`bg-white shadow-xl transition-all duration-300 z-30
                ${sidebarOpen ? "w-64" : "w-0"} 
                flex flex-col fixed lg:relative h-full overflow-hidden`}
            >
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 min-w-max">
                    <div className={`flex items-center gap-2 ${sidebarOpen ? "" : "lg:opacity-0 lg:w-0 overflow-hidden"}`}>
                        <span className="text-2xl h-14 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 whitespace-nowrap">
                            <img src={Logo} alt="Logo" className="h-full w-auto" />
                        </span>
                    </div>
                    <button
                        className="text-gray-600 focus:outline-none p-1 rounded-full hover:bg-purple-100 flex-shrink-0"
                        onClick={toggleSidebar}
                    >
                        <FaBars size={20} />
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 mt-4 px-2">
                    <NavLink
                        to="/admin/dashboard"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl my-1 text-gray-700 
                            hover:bg-purple-100 hover:text-purple-700 transition-all
                            ${isActive ? "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 font-bold shadow-sm" : ""}`
                        }
                    >
                        <FaTachometerAlt className="flex-shrink-0" />
                        <span className={`${sidebarOpen ? "inline" : "hidden lg:inline"}`}>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/admin/products"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl my-1 text-gray-700 
                            hover:bg-purple-100 hover:text-purple-700 transition-all
                            ${isActive ? "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 font-bold shadow-sm" : ""}`
                        }
                    >
                        <FaBoxOpen className="flex-shrink-0" />
                        <span className={`${sidebarOpen ? "inline" : "hidden lg:inline"}`}>Products</span>
                    </NavLink>

                    <NavLink
                        to="/admin/orders"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl my-1 text-gray-700 
                            hover:bg-purple-100 hover:text-purple-700 transition-all
                            ${isActive ? "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 font-bold shadow-sm" : ""}`
                        }
                    >
                        <FaShoppingCart className="flex-shrink-0" />
                        <span className={`${sidebarOpen ? "inline" : "hidden lg:inline"}`}>Orders</span>
                    </NavLink>


                    {/* Profile Link */}
                    <NavLink
                        to="/admin/profile"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl my-1 text-gray-700 
                            hover:bg-purple-100 hover:text-purple-700 transition-all
                            ${isActive ? "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 font-bold shadow-sm" : ""}`
                        }
                    >
                        <FaUserCircle className="flex-shrink-0" />
                        <span className={`${sidebarOpen ? "inline" : "hidden lg:inline"}`}>Profile</span>
                    </NavLink>
                </nav>

                {/* Logout button */}
                <div className="p-4 border-t border-gray-200">
                    <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-red-100 hover:text-red-600 transition-all">
                        <FaSignOutAlt className="flex-shrink-0" />
                        <span className={`${sidebarOpen ? "inline" : "hidden lg:inline"}`}>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen && !isMobile ? "lg:ml-0" : "ml-0"}`}>
                {/* Header */}
                <header className="bg-white shadow-sm px-4 py-3 flex justify-between items-center sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <button
                            className={`"text-gray-600 focus:outline-none p-1 rounded-md hover:bg-purple-100 mr-2" ${sidebarOpen ? "lg:hidden" : ""}`}
                            onClick={toggleSidebar}
                        >
                            <FaBars size={20} />
                        </button>
                        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                            Admin Panel
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-600 text-sm hidden sm:block">Welcome, Admin!</span>
                        <NavLink to="/admin/profile" className="flex items-center">
                            <img
                                src="https://picsum.photos/40"
                                alt="admin"
                                className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
                            />
                        </NavLink>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-4 md:p-6 bg-transparent">
                    <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 min-h-full">
                        <Outlet />
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white shadow-sm px-6 py-3 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} ToyRent - Making Playtime Accessible for Everyone</p>
                </footer>
            </div>
        </div>
    );
};

export default AdminLayout;