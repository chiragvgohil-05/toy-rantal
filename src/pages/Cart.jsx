// src/pages/Cart.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../apiClient";
import toast from "react-hot-toast";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [showPromoMessage, setShowPromoMessage] = useState(false);
    const [promoMessage, setPromoMessage] = useState("");
    const navigate = useNavigate();

    // Fetch cart data from API
    // In your Cart component, update the fetchCartData function:
    // In your Cart component, update the fetchCartData function:
    const fetchCartData = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get("/cart");

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const cartData = response.data;

            // Transform API response to match component structure
            // In your fetchCartData function, update the transformation:
            const transformedItems = cartData.items.map(item => ({
                id: item.id,
                title: item.title,
                rentalDays: item.duration_days,
                price: item.price_inr,
                quantity: 1,
                imageUrl: item.image_url || `https://picsum.photos/200?${item.product_id}`,
                productId: item.product_id,
                startDate: item.start_date,
                endDate: item.end_date
            }));

            setCartItems(transformedItems);
        } catch (error) {
            console.error("Error fetching cart:", error);
            alert(`Failed to load cart: ${error.message}`);
            setCartItems([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    const incrementQty = async (id) => {
        // For rental items, we typically don't increment quantity
        // Instead, we add the same item again with same configuration
        try {
            const item = cartItems.find(item => item.id === id);
            if (item) {
                // Add duplicate item with same configuration
                await apiClient.post("/cart/items", {
                    product_id: item.productId,
                    option_index: await findOptionIndex(item.productId, item.rentalDays),
                    start_date: item.startDate
                });
                await fetchCartData(); // Refresh cart
            }
        } catch (error) {
            console.error("Error adding item:", error);
            alert("Failed to add item");
        }
    };

    const decrementQty = async (id) => {
        // For rental items, we remove one instance
        try {
            await removeItem(id);
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const removeItem = async (id) => {
        try {
            await apiClient.delete(`/cart/items/${id}`);
            // Update local state immediately for better UX
            setCartItems(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error removing item:", error);
            alert("Failed to remove item from cart");
            // Refresh cart to sync with server
            await fetchCartData();
        }
    };

    // Helper function to find option index based on product and rental days
    const findOptionIndex = async (productId, rentalDays) => {
        try {
            const response = await apiClient.get(`/products/${productId}`);
            const product = response.data;
            const rentalOptions = product.rentalOptions || [];

            const index = rentalOptions.findIndex(option =>
                option.days === rentalDays
            );

            return index >= 0 ? index : 0;
        } catch (error) {
            console.error("Error finding option index:", error);
            return 0;
        }
    };

    const applyPromoCode = () => {
        if (promoCode.toUpperCase() === "TOY20") {
            setDiscount(0.2); // 20% discount
            setPromoMessage("Promo code applied! 20% discount added.");
            setShowPromoMessage(true);
        } else if (promoCode.toUpperCase() === "TOY10") {
            setDiscount(0.1); // 10% discount
            setPromoMessage("Promo code applied! 10% discount added.");
            setShowPromoMessage(true);
        } else {
            setDiscount(0);
            setPromoMessage("Invalid promo code. Please try again.");
            setShowPromoMessage(true);
        }

        // Hide message after 3 seconds
        setTimeout(() => {
            setShowPromoMessage(false);
        }, 3000);
    };

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const discountAmount = subtotal * discount;
    const totalAmount = subtotal - discountAmount;
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const handleRedirectToys = () => {
        navigate("/toys");
    };

    const handleProceedToCheckout = async () => {
        if (cartItems.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        try {
            const response = await apiClient.post("/orders", {});

            // If your API returns the created order
            console.log(response, "response")
            if (response.data.success && response.data.order_id) {
                toast.success("Order created successfully!");
                navigate(`/orders/${response.data.order_id}`); // or "/order-confirmation"
            } else {
                throw new Error("Failed to create order");
            }
        } catch (error) {
            console.error("Error creating order:", error);
            toast.error(`Failed to create order: ${error.message}`);
        }
    };



    if (loading) {
        return (
            <div className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 min-h-screen py-10">
                <div className="container mx-auto px-4">
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🛒</div>
                        <h2 className="text-2xl font-bold text-purple-700 mb-2">
                            Loading your cart...
                        </h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-extrabold text-purple-700 mb-6 text-center md:text-left">
                    Your Cart {totalItems > 0 && `(${totalItems} items)`}
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🛒</div>
                        <h2 className="text-2xl font-bold text-purple-700 mb-2">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Add some toys to rent and come back here!
                        </p>
                        <button
                            onClick={handleRedirectToys}
                            className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-xl shadow-md hover:from-purple-500 hover:to-pink-500 transition-all"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-md p-4 border border-pink-200 transition-all hover:shadow-lg"
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full sm:w-24 h-24 rounded-xl object-cover mb-4 sm:mb-0"
                                    />
                                    <div className="sm:ml-4 flex-1 w-full">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-purple-700">
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm">
                                                    Rental Period: {item.rentalDays} days
                                                </p>
                                                <p className="text-gray-600 text-sm">
                                                    Start: {new Date(item.startDate).toLocaleDateString()}
                                                    {" → "}
                                                    End: {new Date(item.endDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                                aria-label={`Remove ${item.title}`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>

                                        <p className="text-gray-800 font-semibold mt-2">
                                            ₹{item.price} for {item.rentalDays} days
                                        </p>

                                        {/* Quantity Controls - For rental, usually 1 per item */}
                                        <div className="flex items-center mt-4 justify-between">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => decrementQty(item.id)}
                                                    className="px-3 py-1 bg-gray-200 rounded-l-lg hover:bg-gray-300 transition disabled:opacity-50"
                                                    aria-label="Remove one"
                                                    title="Remove this rental item"
                                                >
                                                    -
                                                </button>
                                                <span className="px-4 py-1 bg-gray-100 border-t border-b text-gray-800 min-w-[3rem] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => incrementQty(item.id)}
                                                    className="px-3 py-1 bg-gray-200 rounded-r-lg hover:bg-gray-300 transition"
                                                    aria-label="Add another"
                                                    title="Add another rental with same configuration"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <div className="text-lg font-bold text-purple-700">
                                                ₹{item.price * item.quantity}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="bg-white rounded-2xl shadow-md p-6 border border-pink-200 h-fit sticky top-6">
                            <h2 className="text-xl font-bold text-purple-700 mb-4">
                                Order Summary
                            </h2>

                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between">
                                    <span>Items ({cartItems.length}):</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>

                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount ({discount * 100}%):</span>
                                        <span>-₹{discountAmount.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between font-bold text-lg border-t pt-3 mt-1 border-gray-200">
                                    <span>Total Amount:</span>
                                    <span>₹{totalAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Promo Code Section */}
                            <div className="mb-4">
                                {showPromoMessage && (
                                    <p className={`text-sm mt-2 ${
                                        discount > 0 ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {promoMessage}
                                    </p>
                                )}
                            </div>

                            <button
                                onClick={handleProceedToCheckout}
                                className="w-full py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-xl shadow-md hover:from-purple-500 hover:to-pink-500 transition-all transform hover:-translate-y-0.5"
                            >
                                Place Order
                            </button>

                            <div className="text-center mt-4">
                                <button
                                    className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                                    onClick={handleRedirectToys}
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;