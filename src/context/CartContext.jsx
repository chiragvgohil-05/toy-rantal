// src/context/CartContext.jsx
import React, { createContext, useState, useEffect } from "react";
import apiClient from "../apiClient";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    const fetchCartCount = async () => {
        try {
            const response = await apiClient.get("/cart");
            if (response.data?.items) {
                // Count total quantity
                const totalCount = response.data.items.length;
                setCartCount(totalCount);
            }
        } catch (error) {
            console.error("Error fetching cart count:", error);
            setCartCount(0);
        }
    };

    useEffect(() => {
        fetchCartCount();
    }, []);

    return (
        <CartContext.Provider value={{ cartCount, fetchCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
