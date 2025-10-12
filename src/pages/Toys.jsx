// src/pages/Toys.jsx
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import apiClient from "../apiClient"; // ✅ Import your API client

const Toys = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([{ id: 0, name: "All", slug: "all" }]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // ✅ Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get("/products");
                const formattedProducts = response.data.map((p) => {
                    const discountPercentage =
                        p.actual_price && p.discount_price
                            ? Math.round(((p.actual_price - p.discount_price) / p.actual_price) * 100)
                            : 0;

                    return {
                        id: p.id,
                        title: p.title,
                        description: p.description,
                        imageUrl: `${process.env.REACT_APP_API_URL.replace("/api", "")}${p.images[0]}`,
                        originalPrice: p.actual_price,
                        discountedPrice: p.discount_price,
                        discountPercentage,
                        category: p.category_name || "Uncategorized",
                        badge: p.badge || "New",
                        rentalOptions: p.rentalOptions || [], // ✅ add this
                    };
                });

                setProducts(formattedProducts);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // ✅ Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiClient.get("/categories");
                if (response.data && Array.isArray(response.data)) {
                    const formatted = response.data.map((cat) => ({
                        id: cat.id,
                        name: cat.name,
                        slug: cat.slug,
                    }));
                    setCategories([{ id: 0, name: "All", slug: "all" }, ...formatted]);
                } else {
                    console.warn("Unexpected category response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // ✅ Filter products based on selected category & search query
    const filteredProducts = products.filter(
        (p) =>
            (selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase()) &&
            (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleOptionSelect = (selectionInfo) => {
        console.log("Selected option:", selectionInfo);
        // You can add this to a cart or state management here
    };

    if (loading) {
        return (
            <div className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 min-h-screen py-10 flex justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500 mx-auto"></div>
                    <p className="mt-4 text-purple-700 font-semibold">Loading products...</p>
                </div>
            </div>
        );
    }

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

                {/* Sidebar Filters */}
                <aside className="hidden lg:block bg-white rounded-3xl shadow-xl p-6 h-fit sticky top-32 border-4 border-pink-300">
                    {/* Category Filter */}
                    <div className="mb-6 border-b border-gray-200 pb-4">
                        <h3 className="font-semibold text-purple-700 mb-3 text-lg flex items-center">
                            <span className="mr-2">🎯</span> Category
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`px-3 py-2 rounded-xl transition-all ${
                                        selectedCategory === cat.name
                                            ? "bg-pink-400 text-white font-bold shadow-md"
                                            : "bg-gray-100 hover:bg-pink-100 text-gray-700"
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 🔎 Product Search */}
                    <div className="mb-6 border-b border-gray-200 pb-4">
                        <h3 className="font-semibold text-purple-700 mb-3 text-lg flex items-center">
                            <span className="mr-2">🔎</span> Search Product
                        </h3>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name or description..."
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-pink-400 outline-none"
                        />
                    </div>

                    {/* Reset Filters Button */}
                    <button
                        onClick={() => {
                            setSelectedCategory("All");
                            setSearchQuery("");
                        }}
                        className="w-full py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-xl shadow-md hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105"
                    >
                        Reset All Filters
                    </button>
                </aside>

                {/* Product Cards Section */}
                <div className="lg:col-span-3">
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
                            {searchQuery && (
                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                                    Search: {searchQuery}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="pr-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="transform hover:scale-105 transition-transform duration-300"
                                >
                                    <ProductCard
                                        id={product.id}
                                        title={product.title}
                                        description={product.description}
                                        imageUrl={product.imageUrl}
                                        originalPrice={product.originalPrice}
                                        discountedPrice={product.discountedPrice}
                                        discountPercentage={product.discountPercentage}
                                        rentalOptions={product.rentalOptions} // ✅ now it exists
                                        onOptionSelect={handleOptionSelect}
                                        className="shadow-xl rounded-2xl bg-white border-4 border-pink-200 hover:border-yellow-300"
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10">
                                <div className="text-5xl mb-4">😢</div>
                                <h3 className="text-xl font-bold text-purple-700">No products found</h3>
                                <p className="text-gray-600">Try adjusting your filters or search again.</p>
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
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.name)}
                                            className={`px-3 py-2 rounded-xl transition-all ${
                                                selectedCategory === cat.name
                                                    ? "bg-pink-400 text-white font-bold shadow-md"
                                                    : "bg-gray-100 hover:bg-pink-100 text-gray-700"
                                            }`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Search Input */}
                            <div className="mb-6 border-b border-gray-200 pb-4">
                                <h3 className="font-semibold text-purple-700 mb-3 text-lg flex items-center">
                                    <span className="mr-2">🔎</span> Search Product
                                </h3>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by name or description..."
                                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-pink-400 outline-none"
                                />
                            </div>

                            {/* Reset Button */}
                            <button
                                onClick={() => {
                                    setSelectedCategory("All");
                                    setSearchQuery("");
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
