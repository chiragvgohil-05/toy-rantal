// src/pages/admin/AdminProducts.jsx
import React, { useState } from "react";
import {NavLink, useNavigate} from "react-router-dom";
import AdminProductCard from "../../../components/AdminProductCard";

// Dummy data matching the AdminProductCard structure
const products = [
    {
        id: 1,
        title: "Premium Teddy Bear",
        description: "A soft and cuddly premium teddy bear made with high-quality materials. Perfect for children of all ages.",
        category: "Toys",
        originalPrice: 350,
        discountedPrice: 299,
        discountPercentage: 15,
        images: [
            { url: "https://via.placeholder.com/300x200?text=Teddy+Bear", alt: "Teddy Bear" }
        ],
        rentalOptions: [
            { days: 3, price: 50 },
            { days: 7, price: 90 },
            { days: 14, price: 150 }
        ],
        stock: 12
    },
    {
        id: 2,
        title: "Remote Control Car",
        description: "A high-speed remote control car with realistic features and long battery life. Suitable for kids aged 6+.",
        category: "Electronics",
        originalPrice: 200,
        discountedPrice: 179,
        discountPercentage: 10,
        images: [
            { url: "https://via.placeholder.com/300x200?text=Toy+Car", alt: "Toy Car" }
        ],
        rentalOptions: [
            { days: 2, price: 40 },
            { days: 5, price: 75 },
            { days: 10, price: 120 }
        ],
        stock: 20
    },
    {
        id: 3,
        title: "Educational Building Blocks",
        description: "Colorful building blocks set that helps develop creativity and motor skills. Includes 150 pieces.",
        category: "Educational",
        originalPrice: 500,
        discountedPrice: null,
        discountPercentage: 0,
        images: [
            { url: "https://via.placeholder.com/300x200?text=Building+Blocks", alt: "Building Blocks" }
        ],
        rentalOptions: [
            { days: 7, price: 100 },
            { days: 14, price: 180 },
            { days: 30, price: 300 }
        ],
        stock: 8
    }
];

const AdminProducts = () => {
    const [productList, setProductList] = useState(products);
    const navigate = useNavigate();

    const handleEditProduct = (product) => {
        navigate(`/admin/products/edit/${product.id}`);
    };

    const handleDeleteProduct = (product) => {
        console.log("Deleting product:", product);
        // Update the product list by filtering out the deleted product
        setProductList(prevProducts => prevProducts.filter(p => p.id !== product.id));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6 border-b pb-6">
                <h2 className="text-2xl font-bold text-gray-700">Products Management</h2>
                <button>
                    <NavLink
                        to="/admin/products/create"
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-white rounded-lg hover:bg-purple-700 transition"
                    >
                        Add New Product
                    </NavLink>
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productList.map(product => (
                    <AdminProductCard
                        key={product.id}
                        product={product}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                ))}
            </div>

            {/* Empty state */}
            {productList.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-5xl mb-4">
                        <i className="fas fa-box-open"></i>
                    </div>
                    <h3 className="text-xl font-medium text-gray-600 mb-2">No products found</h3>
                    <p className="text-gray-500">Get started by adding your first product.</p>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;