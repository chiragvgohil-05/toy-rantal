import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AdminProductCard from "../../../components/AdminProductCard";
import apiClient from "../../../apiClient";
import toast from "react-hot-toast";

const AdminProducts = () => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get("/admin/products");
                const data = response.data || [];
                console.log("Fetched products:", data);
                // Map API response to AdminProductCard structure
                const mappedProducts = data.map(prod => ({
                    id: prod.id,
                    title: prod.title,
                    description: prod.description,
                    category: prod.category_name || "Unknown",
                    originalPrice: prod.actual_price || 0,
                    discountedPrice: prod.discount_price || 0,
                    discountPercentage: prod.actual_price && prod.discount_price
                        ? Math.round((1 - prod.discount_price / prod.actual_price) * 100)
                        : 0,
                    images: Array.isArray(prod.images)
                        ? prod.images.map(url => ({ url, alt: prod.title }))
                        : [],
                    rentalOptions: Array.isArray(prod.rentalOptions)
                        ? prod.rentalOptions
                        : [],
                    stock: Array.isArray(prod.units) ? prod.units.length : 0,
                }));

                setProductList(mappedProducts);
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleEditProduct = (product) => {
        navigate(`/admin/products/edit/${product.id}`);
    };

    const handleDeleteProduct = async (product) => {
               try {
            await apiClient.delete(`/admin/products/${product.id}`);
            setProductList(prev => prev.filter(p => p.id !== product.id));
            toast.success("Product deleted successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete product");
        }
    };

    if (loading) return <div className="text-center py-12">Loading products...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6 border-b pb-6">
                <h2 className="text-2xl font-bold text-gray-700">Products Management</h2>
                <NavLink
                    to="/admin/products/create"
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-white rounded-lg hover:bg-purple-700 transition"
                >
                    Add New Product
                </NavLink>
            </div>

            {productList.length > 0 ? (
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
            ) : (
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
