import React from "react";

const achievements = [
    { number: "1000+", label: "Fulfilled Orders", color: "text-green-500" },
    { number: "250+", label: "Happy Kids and Parents", color: "text-pink-500" },
    { number: "100+", label: "Toys & Ever Growing", color: "text-yellow-500" },
    { number: "4+", label: "Cities (Coming Soon)", color: "text-blue-500" },
];

const Achievements = () => {
    return (
        <section className="py-16 bg-gray-50 relative overflow-hidden">
            {/* Optional decorative background */}
            <div className="absolute inset-0 opacity-10">
                <img
                    src="https://img.freepik.com/free-photo/colorful-plastic-building-blocks_53876-87619.jpg" // Or use Tailwind patterns / SVG
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-semibold text-gray-700 mb-12">Our Achievements</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {achievements.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform"
                        >
                            <span className={`text-3xl md:text-4xl font-bold ${item.color}`}>
                                {item.number}
                            </span>
                            <p className="mt-2 text-gray-600 text-sm md:text-base">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
