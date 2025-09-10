// src/pages/Home.js
import React, { useState } from "react";
import Slider from "../components/Slider";
import ProductCard from "../components/ProductCard";
import Achievements from "../components/Achievements";
import BenefitsSection from "../components/BenefitsSection";

const Home = () => {

    // Create an array of products
    const products = [
        {
            id: 1,
            title: "Premium Building Blocks",
            description: "Educational building blocks for creative play and learning.",
            imageUrl: "https://img.freepik.com/free-photo/colorful-plastic-building-blocks_53876-87619.jpg",
            originalPrice: 1800,
            discountedPrice: 1400,
            discountPercentage: 22,
            rentalOptions: [
                { days: 7, price: 400 },
                { days: 15, price: 750 },
                { days: 30, price: 1300 },
            ]
        },
        {
            id: 2,
            title: "Remote Control Car",
            description: "High-speed RC car with realistic features and long battery life.",
            imageUrl: "https://img.freepik.com/free-photo/toy-car-isolated-white-background_130265-7234.jpg",
            originalPrice: 2500,
            discountedPrice: 2000,
            discountPercentage: 20,
            rentalOptions: [
                { days: 7, price: 600 },
                { days: 15, price: 1100 },
                { days: 30, price: 1900 },
            ]
        },
        {
            id: 3,
            title: "Educational Science Kit",
            description: "Complete science experiment kit for young explorers.",
            imageUrl: "https://img.freepik.com/free-photo/science-tools-blue-background_23-2147850639.jpg",
            originalPrice: 2200,
            discountedPrice: 1800,
            discountPercentage: 18,
            rentalOptions: [
                { days: 7, price: 550 },
                { days: 15, price: 950 },
                { days: 30, price: 1700 },
            ]
        }
    ];

    const slidesData = [
        {
            img: "https://img.freepik.com/free-photo/kids-toys_144627-38648.jpg",
            title: "Rent Premium Toys",
            desc: "Affordable and fun toys delivered to your doorstep.",
            link: "/shop",
        },
        {
            img: "https://img.freepik.com/free-photo/wooden-toys_144627-28215.jpg",
            title: "Wide Range of Categories",
            desc: "Educational, fun, and creative toys for kids of all ages.",
            link: "/shop",
        },
        {
            img: "https://img.freepik.com/free-photo/stacked-toy-blocks_144627-27713.jpg",
            title: "Save Money, Rent Smarter",
            desc: "No need to buy, just rent and return when done!",
            link: "/shop",
        },
    ];

    // Handle rental option selection
    const handleOptionSelect = (selectionInfo) => {
        console.log("Selected option:", selectionInfo);
        // You can add this to a cart or state management here
    };

    return (
        <div className="home-page">
            <Slider slides={slidesData} />
            <div className="bg-gray-100 py-8">
                <h2 className="text-3xl font-bold text-center mb-8">Toy Gallery</h2>
                <div className="flex flex-wrap justify-center">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            description={product.description}
                            imageUrl={product.imageUrl}
                            originalPrice={product.originalPrice}
                            discountedPrice={product.discountedPrice}
                            discountPercentage={product.discountPercentage}
                            rentalOptions={product.rentalOptions}
                            onOptionSelect={handleOptionSelect}
                            className="m-4"
                        />
                    ))}
                </div>
            </div>
            <div className="bg-gray-100 py-8">
                <h2 className="text-3xl font-bold text-center mb-8">Featured Toys</h2>
                <div className="flex flex-wrap justify-center">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            description={product.description}
                            imageUrl={product.imageUrl}
                            originalPrice={product.originalPrice}
                            discountedPrice={product.discountedPrice}
                            discountPercentage={product.discountPercentage}
                            rentalOptions={product.rentalOptions}
                            onOptionSelect={handleOptionSelect}
                            className="m-4"
                        />
                    ))}
                </div>
            </div>
            <div>
                <Achievements />
            </div>
            <div>
                <BenefitsSection/>
            </div>
        </div>
    );
};

export default Home;