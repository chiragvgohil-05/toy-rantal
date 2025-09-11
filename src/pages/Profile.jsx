// src/pages/Profile.jsx
import React, { useState } from "react";

const Profile = () => {
    const [profile, setProfile] = useState({
        name: "Chirag Gohil",
        email: "chirag@example.com",
        phone: "+91 9876543210",
        address: "123 Main Street, Ahmedabad, India",
        city: "Ahmedabad",
        state: "Gujarat",
        zip: "380001",
        preferences: {
            newsletter: true,
            notifications: true,
        },
        avatar: "https://i.pravatar.cc/150?img=3",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setProfile((prev) => ({
                ...prev,
                preferences: { ...prev.preferences, [name]: checked },
            }));
        } else {
            setProfile((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = () => {
        console.log("Profile saved:", profile);
        alert("Profile saved successfully!");
    };

    return (
        <div className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-extrabold text-purple-700 mb-8">My Profile</h1>

                <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center">
                        <img
                            src={profile.avatar}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-pink-300 shadow-md mb-4"
                        />
                        <button className="px-4 py-2 bg-pink-400 text-white font-bold rounded-xl shadow-md hover:bg-pink-500 transition-all">
                            Change Photo
                        </button>
                    </div>

                    {/* Profile Form */}
                    <div className="lg:col-span-2">
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
                            className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-xl shadow-md hover:from-purple-500 hover:to-pink-500 transition-all"
                        >
                            Save Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
