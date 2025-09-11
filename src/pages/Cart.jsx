// src/pages/Cart.jsx
import React, { useState } from "react";

const initialCart = [
    {
        id: 1,
        title: "Teddy Bear",
        rentalDays: 7,
        price: 550,
        quantity: 1,
        imageUrl: "https://picsum.photos/200?1",
    },
    {
        id: 2,
        title: "Toy Car",
        rentalDays: 15,
        price: 600,
        quantity: 2,
        imageUrl: "https://picsum.photos/200?2",
    },
];

const Cart = () => {
    const [cartItems, setCartItems] = useState(initialCart);

    const incrementQty = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQty = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-extrabold text-purple-700 mb-6">Your Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🛒</div>
                        <h2 className="text-2xl font-bold text-purple-700 mb-2">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-600">
                            Add some toys to rent and come back here!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center bg-white rounded-2xl shadow-md p-4 border border-pink-200"
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-24 h-24 rounded-xl object-cover"
                                    />
                                    <div className="ml-4 flex-1">
                                        <h3 className="text-lg font-bold text-purple-700">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            Rental: {item.rentalDays} days
                                        </p>
                                        <p className="text-gray-800 font-semibold mt-1">
                                            ₹{item.price} per unit
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center mt-2">
                                            <button
                                                onClick={() => decrementQty(item.id)}
                                                className="px-3 py-1 bg-gray-200 rounded-l-lg hover:bg-gray-300 transition"
                                            >
                                                -
                                            </button>
                                            <span className="px-4 py-1 bg-gray-100 border-t border-b text-gray-800">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => incrementQty(item.id)}
                                                className="px-3 py-1 bg-gray-200 rounded-r-lg hover:bg-gray-300 transition"
                                            >
                                                +
                                            </button>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="ml-4 text-red-500 hover:text-red-700 font-bold"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="bg-white rounded-2xl shadow-md p-6 border border-pink-200 h-fit">
                            <h2 className="text-xl font-bold text-purple-700 mb-4">
                                Order Summary
                            </h2>
                            <div className="flex justify-between mb-2">
                                <span>Items:</span>
                                <span>{cartItems.length}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Total Quantity:</span>
                                <span>
                                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                </span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2 border-gray-200">
                                <span>Total Amount:</span>
                                <span>₹{totalAmount}</span>
                            </div>

                            <button className="mt-6 w-full py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-xl shadow-md hover:from-purple-500 hover:to-pink-500 transition-all">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
