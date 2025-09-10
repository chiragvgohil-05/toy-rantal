// src/components/BenefitsSection.jsx
import React from "react";

const benefits = [
    {
        title: "Enhances Child Development",
        description:
            "Playing with different toys regularly keeps children engaged and stimulated, supporting their cognitive development and fostering creativity.",
        icon: "🪁",
        color: "border-yellow-400",
    },
    {
        title: "Budget Friendly",
        description:
            "Renting is a budget friendly option. It allows parents to provide a variety of toys without the expense of purchasing each one. Renting is especially beneficial as children quickly outgrow toys or lose interest in them.",
        icon: "🐖",
        color: "border-blue-400",
    },
    {
        title: "Clutter Free Playtime",
        description:
            "Renting toys helps in reducing clutter and managing limited storage space. Instead of collecting unused toys at home, you can rotate and return items, keeping your home organised and clutter free.",
        icon: "🪁",
        color: "border-cyan-400",
    },
    {
        title: "Eco-Friendly Solution",
        description:
            "By Renting toys you contribute to the reduction of toys related waste, especially plastic toys. This has an overall positive effect on the environment.",
        icon: "🐖",
        color: "border-cyan-400",
    },
];

const BenefitsSection = () => {
    return (
        <section className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8">
            {/* Image Section */}
            <div className="md:w-1/2 flex justify-center">
                <img
                    src="https://img.freepik.com/free-photo/colorful-plastic-building-blocks_53876-87619.jpg"
                    alt="Child playing"
                    className="rounded-lg border-2 border-pink-500 shadow-lg"
                />
            </div>

            {/* Benefits Section */}
            <div className="md:w-1/2 flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-start md:text-left mb-4">
                    Benefits Of Renting
                </h2>

                {benefits.map((item, index) => (
                    <div
                        key={index}
                        className={`border ${item.color} rounded-md p-4 flex gap-4 items-start`}
                    >
                        <span className="text-2xl">{item.icon}</span>
                        <div className="text-start">
                            <h3 className="font-semibold text-lg ">{item.title}</h3>
                            <p className="text-sm">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BenefitsSection;
