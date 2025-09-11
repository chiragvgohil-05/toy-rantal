// src/pages/Toys.jsx
import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

const products = [
    {
        id: 1,
        title: "Teddy Bear",
        description: "Soft and cuddly teddy bear for kids.",
        imageUrl: "https://picsum.photos/200?1",
        originalPrice: 500,
        discountedPrice: 350,
        discountPercentage: 30,
        rentalOptions: [
            { days: 7, price: 550 },
            { days: 15, price: 950 },
            { days: 30, price: 1700 },
        ],
        badge: "Popular",
        category: "Soft Toys"
    },
    {
        id: 2,
        title: "Toy Car",
        description: "Fast and fun toy car.",
        imageUrl: "https://picsum.photos/200?2",
        originalPrice: 300,
        discountedPrice: 200,
        discountPercentage: 33,
        rentalOptions: [
            { days: 7, price: 350 },
            { days: 15, price: 600 },
            { days: 30, price: 1100 },
        ],
        badge: "New",
        category: "Vehicles"
    },
    {
        id: 3,
        title: "Building Blocks",
        description: "Creative building blocks set.",
        imageUrl: "https://picsum.photos/200?3",
        originalPrice: 700,
        discountedPrice: 500,
        discountPercentage: 28,
        rentalOptions: [
            { days: 7, price: 750 },
            { days: 15, price: 1300 },
            { days: 30, price: 2400 },
        ],
        badge: "Hot",
        category: "Blocks"
    },
    {
        id: 4,
        title: "Barbie Doll",
        description: "Beautiful fashion doll for creative play.",
        imageUrl: "https://picsum.photos/200?4",
        originalPrice: 450,
        discountedPrice: 350,
        discountPercentage: 22,
        rentalOptions: [
            { days: 7, price: 450 },
            { days: 15, price: 800 },
        ],
        badge: "Trending",
        category: "Dolls"
    },
    {
        id: 5,
        title: "Jigsaw Puzzle",
        description: "100-piece educational puzzle for kids.",
        imageUrl: "https://picsum.photos/200?5",
        originalPrice: 400,
        discountedPrice: 300,
        discountPercentage: 25,
        rentalOptions: [
            { days: 15, price: 550 },
            { days: 30, price: 1000 },
        ],
        badge: "Educational",
        category: "Puzzles"
    },
    {
        id: 6,
        title: "Robot Toy",
        description: "Interactive robot with lights and sounds.",
        imageUrl: "https://picsum.photos/200?6",
        originalPrice: 800,
        discountedPrice: 600,
        discountPercentage: 25,
        rentalOptions: [
            { days: 7, price: 850 },
            { days: 15, price: 1500 },
            { days: 30, price: 2800 },
        ],
        badge: "Interactive",
        category: "Electronic Toys"
    },
];

const categories = ["All", "Soft Toys", "Vehicles", "Dolls", "Blocks", "Puzzles", "Electronic Toys"];

const Toys = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedRentalOption, setSelectedRentalOption] = useState("");
    const [priceRange, setPriceRange] = useState([0, 3000]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleOptionSelect = (productId, option) => {
        console.log(`Selected rental option for product ${productId}: ${option.days} days for ₹${option.price}`);
    };

    const filteredProducts = products.filter(
        (p) =>
            (selectedCategory === "All" || p.category === selectedCategory) &&
            (!selectedRentalOption || p.rentalOptions.some(opt => opt.days === parseInt(selectedRentalOption))) &&
            p.discountedPrice >= priceRange[0] &&
            p.discountedPrice <= priceRange[1]
    );

    const allRentalOptions = [...new Set(products.flatMap(p => p.rentalOptions.map(opt => opt.days)))].sort((a, b) => a - b);

    return (
        <div className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 min-h-screen py-10">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Mobile Filter Button */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="w-full py-3 bg-pink-400 text-white font-bold rounded-xl shadow-md hover:bg-pink-500 transition-all"
                    >
                        🔍 Filters
                    </button>
                </div>

                {/* Sidebar Filters - visible on desktop */}
                <aside className="hidden lg:block bg-white rounded-3xl shadow-xl p-6 h-fit sticky top-32 border-4 border-pink-300">
                    {/* Category Filter */}
                    <div className="mb-6 border-b border-gray-200 pb-4">
                        <h3 className="font-semibold text-purple-700 mb-3 text-lg flex items-center">
                            <span className="mr-2">🎯</span> Category
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3 py-2 rounded-xl transition-all ${selectedCategory === cat
                                        ? "bg-pink-400 text-white font-bold shadow-md"
                                        : "bg-gray-100 hover:bg-pink-100 text-gray-700"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Rental Option Filter */}
                    <div className="mb-6 border-b border-gray-200 pb-4">
                        <h3 className="font-semibold text-purple-700 mb-3 text-lg flex items-center">
                            <span className="mr-2">⏱️</span> Rental Period
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {allRentalOptions.map((days) => (
                                <button
                                    key={days}
                                    onClick={() => setSelectedRentalOption(selectedRentalOption === days.toString() ? "" : days.toString())}
                                    className={`px-3 py-2 rounded-xl transition-all ${selectedRentalOption === days.toString()
                                        ? "bg-yellow-400 text-gray-800 font-bold shadow-md"
                                        : "bg-gray-100 hover:bg-yellow-100 text-gray-700"
                                    }`}
                                >
                                    {days} days
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-purple-700 mb-3 text-lg flex items-center">
                            <span className="mr-2">💰</span> Price Range
                        </h3>
                        <div className="px-2">
                            <input
                                type="range"
                                min="0"
                                max="3000"
                                step="100"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-sm text-gray-600 mt-1">
                                <span>₹0</span>
                                <span>Up to ₹{priceRange[1]}</span>
                            </div>
                        </div>
                    </div>

                    {/* Reset Filters Button */}
                    <button
                        onClick={() => {
                            setSelectedCategory("All");
                            setSelectedRentalOption("");
                            setPriceRange([0, 3000]);
                        }}
                        className="w-full py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-xl shadow-md hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105"
                    >
                        Reset All Filters
                    </button>
                </aside>

                {/* Product Cards Section */}
                <div className="lg:col-span-3">
                    {/* Results Count */}
                    <div className="bg-white rounded-2xl p-4 mb-6 shadow-md border border-pink-200">
                        <h2 className="text-xl font-bold text-purple-700">
                            {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"} Found
                        </h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {selectedCategory !== "All" && (
                                <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
                                    Category: {selectedCategory}
                                </span>
                            )}
                            {selectedRentalOption && (
                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                                    Rental: {selectedRentalOption} days
                                </span>
                            )}
                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                                Price: up to ₹{priceRange[1]}
                            </span>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="pr-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    {...product}
                                    onOptionSelect={handleOptionSelect}
                                    className="shadow-xl border-4 border-pink-200 hover:border-yellow-300 transform hover:scale-105 transition duration-300 relative overflow-hidden"
                                >
                                </ProductCard>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10">
                                <div className="text-5xl mb-4">😢</div>
                                <h3 className="text-xl font-bold text-purple-700">No products found</h3>
                                <p className="text-gray-600">Try adjusting your filters to see more results.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Modal */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start pt-20 px-4">
                    <div className="bg-white w-full max-w-md rounded-3xl p-6 relative">
                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
                        >
                            ✖
                        </button>

                        {/* Filters Content */}
                        <div>
                            {/* Category Filter */}
                            <div className="mb-6 border-b border-gray-200 pb-4">
                                <h3 className="font-semibold text-purple-700 mb-3 text-lg flex items-center">
                                    <span className="mr-2">🎯</span> Category
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-3 py-2 rounded-xl transition-all ${selectedCategory === cat
                                                ? "bg-pink-400 text-white font-bold shadow-md"
                                                : "bg-gray-100 hover:bg-pink-100 text-gray-700"
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Rental Option Filter */}
                            <div className="mb-6 border-b border-gray-200 pb-4">
                                <h3 className="font-semibold text-purple-700 mb-3 text-lg flex items-center">
                                    <span className="mr-2">⏱️</span> Rental Period
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {allRentalOptions.map((days) => (
                                        <button
                                            key={days}
                                            onClick={() => setSelectedRentalOption(selectedRentalOption === days.toString() ? "" : days.toString())}
                                            className={`px-3 py-2 rounded-xl transition-all ${selectedRentalOption === days.toString()
                                                ? "bg-yellow-400 text-gray-800 font-bold shadow-md"
                                                : "bg-gray-100 hover:bg-yellow-100 text-gray-700"
                                            }`}
                                        >
                                            {days} days
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range Filter */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-purple-700 mb-3 text-lg flex items-center">
                                    <span className="mr-2">💰</span> Price Range
                                </h3>
                                <div className="px-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="3000"
                                        step="100"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                                        <span>₹0</span>
                                        <span>Up to ₹{priceRange[1]}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Reset Button */}
                            <button
                                onClick={() => {
                                    setSelectedCategory("All");
                                    setSelectedRentalOption("");
                                    setPriceRange([0, 3000]);
                                }}
                                className="w-full py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-xl shadow-md hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Toys;
