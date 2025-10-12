import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../apiClient";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null); // Track index
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState("");

    // Fetch product and rental options
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const productResponse = await apiClient.get(`/products/${id}`);
                const p = productResponse.data;

                const discountPercentage =
                    p.actual_price && p.discount_price
                        ? Math.round(((p.actual_price - p.discount_price) / p.actual_price) * 100)
                        : 0;

                setProduct({
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    imageUrl: `${process.env.REACT_APP_API_URL.replace("/api", "")}${p.images?.[0] || ""}`,
                    originalPrice: p.actual_price,
                    discountedPrice: p.discount_price,
                    discountPercentage,
                    plans: p.rentalOptions.length > 0
                        ? p.rentalOptions
                        : [
                            { days: 7, price: 500 },
                            { days: 15, price: 900 },
                            { days: 30, price: 1500 },
                        ],
                });

                setStartDate(new Date().toISOString().split("T")[0]);
            } catch (err) {
                console.error("Error fetching product:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id]);

    const handleSelectPlan = (plan, index) => {
        setSelectedPlan(plan);
        setSelectedOptionIndex(index);
    };

    const handleAddToCart = async () => {
        if (!selectedPlan) {
            alert("Please select a rental plan");
            return;
        }

        if (!startDate) {
            alert("Please select a start date");
            return;
        }

        try {
            await apiClient.post("/cart/items", {
                product_id: product.id,
                option_index: selectedOptionIndex, // send index to backend
                start_date: startDate,
            });

            alert(`Added ${product.title} (${selectedPlan.days} days) to cart!`);
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add item to cart. Please try again.");
        }
    };

    const calculateEndDate = () => {
        if (!selectedPlan || !startDate) return "";
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + selectedPlan.days - 1);
        return end.toISOString().split("T")[0];
    };

    if (loading) return <div className="text-center py-20 text-gray-500">Loading product...</div>;
    if (!product) return <div className="text-center py-20 text-red-500">Product not found.</div>;

    return (
        <div className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 py-10 px-4">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-4 py-2 bg-purple-400 text-white rounded-lg shadow-md hover:bg-purple-500 flex gap-2 items-center"
            >
                Back
            </button>

            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Product Image */}
                    <div className="relative">
                        <img src={product.imageUrl} alt={product.title} className="w-full h-96 object-cover" />
                        {product.discountPercentage > 0 && (
                            <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-md">
                {product.discountPercentage}% OFF
              </span>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6 flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-extrabold text-purple-700 mb-2">{product.title}</h1>
                            <p className="text-gray-600 mb-4">{product.description}</p>

                            <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl font-bold text-pink-600">
                  ₹{product.discountedPrice || product.originalPrice}
                </span>
                                {product.discountedPrice && (
                                    <span className="text-gray-400 line-through">₹{product.originalPrice}</span>
                                )}
                            </div>

                            {/* Start Date */}
                            <div className="mb-4">
                                <label className="block text-lg font-semibold text-purple-600 mb-2">
                                    Rental Start Date
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    min={new Date().toISOString().split("T")[0]}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>

                            {/* Rental Plans */}
                            <div className="space-y-2 mb-4">
                                <h2 className="text-lg font-semibold text-purple-600 mb-1">Rental Plans</h2>
                                <div className="flex flex-wrap gap-3">
                                    {product.plans.map((plan, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSelectPlan(plan, idx)}
                                            className={`px-4 py-2 rounded-lg border font-medium ${
                                                selectedOptionIndex === idx
                                                    ? "bg-purple-500 text-white border-purple-600"
                                                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                                            }`}
                                        >
                                            {plan.days} days - ₹{plan.price}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Selected Plan Summary */}
                            {selectedPlan && startDate && (
                                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                                    <h3 className="font-semibold text-purple-700 mb-2">Rental Summary</h3>
                                    <p className="text-sm text-gray-600">
                                        <strong>Plan:</strong> {selectedPlan.days} days<br />
                                        <strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}<br />
                                        <strong>End Date:</strong> {new Date(calculateEndDate()).toLocaleDateString()}<br />
                                        <strong>Total Price:</strong> ₹{selectedPlan.price}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            className="mt-6 w-full py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-xl shadow-md hover:from-purple-500 hover:to-pink-500 transition-all"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
