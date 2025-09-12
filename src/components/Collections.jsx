// src/components/Collections.jsx
import React from "react";

const collections = [
    {
        title: "Soft Toys",
        img: "https://cdn-icons-png.flaticon.com/512/3884/3884890.png",
        color: "from-pink-200 to-pink-400",
    },
    {
        title: "Educational Toys",
        img: "https://cdn-icons-png.flaticon.com/512/3076/3076987.png",
        color: "from-yellow-200 to-yellow-400",
    },
    {
        title: "Outdoor Fun",
        img: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
        color: "from-green-200 to-green-400",
    },
    {
        title: "Puzzle & Games",
        img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        color: "from-blue-200 to-blue-400",
    },
];

const Collections = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-blue-50 via-pink-50 to-yellow-50">
            <div className="container mx-auto px-6 lg:px-12 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-pink-600 mb-10">
                    Explore Our Collections
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {collections.map((col, idx) => (
                        <div
                            key={idx}
                            className={`rounded-2xl shadow-lg p-6 bg-gradient-to-br ${col.color} hover:scale-105 transition-transform duration-300`}
                        >
                            <div className="flex justify-center mb-4">
                                <img src={col.img} alt={col.title} className="w-20 h-20" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{col.title}</h3>
                            <button className="mt-4 px-4 py-2 bg-white rounded-full shadow hover:bg-pink-100 transition">
                                View More
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Collections;
