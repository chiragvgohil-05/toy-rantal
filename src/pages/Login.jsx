// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser, getProfile } from "../api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await loginUser(formData);

            if (response?.data?.token) {
                const token = response.data.token;
                localStorage.setItem("token", token);

                // Fetch user profile to get role
                const profileRes = await getProfile(); // GET /me
                if (profileRes?.data?.user) {
                    const user = profileRes.data.user;
                    login(user, token); // store user in context

                    toast.success("Logged in successfully!");

                    // Redirect based on role
                    if (user.role === "admin") navigate("/admin/dashboard");
                    else navigate("/");
                } else {
                    toast.error("Failed to fetch user profile!");
                }
            } else {
                toast.error(response?.data?.message || "Login failed!");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error?.message || "Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
                <h2 className="text-3xl font-extrabold text-purple-700 mb-6 text-center">
                    Welcome Back
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Login to continue to your account
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-2 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                className="w-full px-4 py-2 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-xl shadow-md hover:from-purple-500 hover:to-pink-500 transition-all ${
                            loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="mt-4 flex justify-end text-sm text-gray-600">
                    <NavLink to="/register" className="hover:text-pink-500 transition">
                        Sign Up
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Login;
