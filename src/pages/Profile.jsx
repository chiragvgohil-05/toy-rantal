// src/pages/Profile.jsx
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import apiClient from "../apiClient"; // Axios instance with baseURL & token

const Profile = () => {
    const API_URL = process.env.REACT_APP_API_URL; // React automatically loads env variables prefixed with REACT_APP_

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        avatar: null,     // File object
        avatarUrl: "",    // Display uploaded avatar
    });
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    // Fetch profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const res = await apiClient.get("/me"); // GET profile
                if (res.data.user) {
                    setProfile((prev) => ({
                        ...prev,
                        ...res.data.user,
                        avatar: null,
                        avatarUrl: res.data.user.avatar || "https://i.pravatar.cc/150?img=3",
                    }));
                } else {
                    toast.error("Failed to fetch profile!");
                }
            } catch (err) {
                console.error(err);
                toast.error(err?.response?.data?.message || "Network error");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file selection
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfile((prev) => ({ ...prev, avatar: file }));
        }
    };

    // Upload avatar to backend
    const uploadAvatar = async () => {
        if (!profile.avatar) return profile.avatarUrl; // No new file

        const formData = new FormData();
        formData.append("avatar", profile.avatar);

        try {
            const res = await apiClient.post("/upload/avatar", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Avatar uploaded successfully!");
            return res.data.avatar; // backend returns new avatar URL
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Avatar upload failed!");
            return profile.avatarUrl;
        }
    };

    // Save profile changes
    const handleSave = async () => {
        try {
            setLoading(true);

            // First, upload avatar if selected
            const avatarUrl = profile.avatar ? await uploadAvatar() : profile.avatarUrl;

            // Update profile
            const res = await apiClient.post("/me/update", {
                name: profile.name,
                email: profile.email,
                phone: profile.phone,
                address: profile.address,
                city: profile.city,
                state: profile.state,
                zip: profile.zip,
                avatar: avatarUrl,
            });

            if (res.data.user) {
                setProfile((prev) => ({
                    ...prev,
                    ...res.data.user,
                    avatar: null,
                    avatarUrl: res.data.user.avatar || avatarUrl,
                }));
                toast.success("Profile updated successfully!");
            } else {
                toast.error(res?.data?.message || "Failed to update profile!");
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 py-10 min-h-screen">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-extrabold text-purple-700 mb-8">My Profile</h1>

                <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center">

                        <img
                            src={
                                profile.avatar
                                    ? URL.createObjectURL(profile.avatar) // newly selected file
                                    : profile.avatarUrl
                                        ? `${API_URL.replace("/api", "")}${profile.avatarUrl}` // remove /api if included
                                        : "https://i.pravatar.cc/150?img=3" // fallback
                            }
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-pink-300 shadow-md mb-4 object-cover"
                        />
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="px-4 py-2 bg-pink-400 text-white font-bold rounded-xl shadow-md hover:bg-pink-500 transition-all"
                        >
                            Change Photo
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                    </div>

                    {/* Profile Form */}
                    <div className="lg:col-span-2">
                        {/* Name & Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-gray-700 font-semibold">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    className="w-full mt-1 px-3 py-2 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-semibold">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    className="w-full mt-1 px-3 py-2 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                                />
                            </div>
                        </div>

                        {/* Phone & City */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-gray-700 font-semibold">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    className="w-full mt-1 px-3 py-2 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-semibold">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={profile.city}
                                    onChange={handleChange}
                                    className="w-full mt-1 px-3 py-2 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                                />
                            </div>
                        </div>

                        {/* State & ZIP */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-gray-700 font-semibold">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={profile.state}
                                    onChange={handleChange}
                                    className="w-full mt-1 px-3 py-2 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-semibold">ZIP Code</label>
                                <input
                                    type="text"
                                    name="zip"
                                    value={profile.zip}
                                    onChange={handleChange}
                                    className="w-full mt-1 px-3 py-2 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="mb-4">
                            <label className="text-gray-700 font-semibold">Address</label>
                            <textarea
                                name="address"
                                value={profile.address}
                                onChange={handleChange}
                                rows="3"
                                className="w-full mt-1 px-3 py-2 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                            ></textarea>
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-xl shadow-md hover:from-purple-500 hover:to-pink-500 transition-all"
                        >
                            {loading ? "Saving..." : "Save Profile"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
