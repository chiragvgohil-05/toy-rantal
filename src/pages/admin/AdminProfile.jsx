import React, { useState } from 'react';
import {FaPencil} from "react-icons/fa6";

const AdminProfile = () => {
    const [adminData, setAdminData] = useState({
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        profilePicture: null,
        previewUrl: null
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAdminData(prev => ({
                    ...prev,
                    profilePicture: file,
                    previewUrl: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // In a real app, this would save to an API
        console.log('Saving data:', adminData);
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    const handleCancel = () => {
        // Reset form or revert changes
        setIsEditing(false);
    };

    return (
        <div>
            <div className="mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 border-b pb-5">Admin Profile</h1>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative mb-4">
                            {adminData.previewUrl ? (
                                <img
                                    src={adminData.previewUrl}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
                                />
                            ) : (
                                <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                                    {adminData.name.charAt(0)}
                                </div>
                            )}

                            {isEditing && (
                                <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer shadow-md">
                                    <FaPencil/>
                                    <input
                                        id="profile-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

                        <h2 className="text-xl font-semibold text-gray-800">{adminData.name}</h2>
                        <p className="text-gray-600">{adminData.email}</p>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Personal Information</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={adminData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Enter your name"
                                    />
                                ) : (
                                    <p className="px-4 py-2 bg-gray-50 rounded-lg">{adminData.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={adminData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Enter your email"
                                    />
                                ) : (
                                    <p className="px-4 py-2 bg-gray-50 rounded-lg">{adminData.email}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end mt-8 space-x-3">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                    >
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;