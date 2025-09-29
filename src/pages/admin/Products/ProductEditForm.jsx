import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageUpload from "../../../components/ImageUpload";
import apiClient from "../../../apiClient";
import toast from "react-hot-toast";

const categoryMap = {
    "Soft Toys": 1,
    Vehicles: 2,
    Dolls: 3,
    Blocks: 4,
    Puzzles: 5,
    "Electronic Toys": 6,
};

const ProductEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        title: "",
        category: "",
        description: "",
        originalPrice: "",
        discountPrice: "",
        discountPercentage: "",
        rentalOptions: [
            { days: 7, price: "" },
            { days: 15, price: "" },
            { days: 30, price: "" },
        ],
    });

    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Fetch existing product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await apiClient.get(`/admin/products/${id}`);
                const product = response.data;

                const actual = parseFloat(product.actual_price);
                const discount = parseFloat(product.discount_price);
                const discountPercent =
                    actual && discount ? (((actual - discount) / actual) * 100).toFixed(2) : "";

                setProductData({
                    title: product.title || "",
                    category: product.category_name || "",
                    description: product.description || "",
                    originalPrice: product.actual_price || "",
                    discountPrice: product.discount_price || "",
                    discountPercentage: discountPercent,
                    rentalOptions: product.rentalOptions || [
                        { days: 7, price: "" },
                        { days: 15, price: "" },
                        { days: 30, price: "" },
                    ],
                });

                setImages(product.images?.map((img) => ({ url: img })) || []);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load product data");
            }
        };

        fetchProduct();
    }, [id]);

    // Update discount percentage whenever originalPrice or discountPrice changes
    useEffect(() => {
        const original = parseFloat(productData.originalPrice);
        const discount = parseFloat(productData.discountPrice);

        if (!isNaN(original) && !isNaN(discount) && original > 0) {
            const percent = ((original - discount) / original) * 100;
            setProductData((prev) => ({
                ...prev,
                discountPercentage: percent.toFixed(2),
            }));
        } else {
            setProductData((prev) => ({ ...prev, discountPercentage: "" }));
        }
    }, [productData.originalPrice, productData.discountPrice]);

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "title":
                if (!value) error = "Product name is required";
                else if (value.length < 3) error = "Product name must be at least 3 characters";
                break;
            case "category":
                if (!value) error = "Product category is required";
                break;
            case "description":
                if (!value) error = "Description is required";
                else if (value.length < 10) error = "Description must be at least 10 characters";
                break;
            case "originalPrice":
                if (!value) error = "Original price is required";
                else if (isNaN(value) || parseFloat(value) <= 0) error = "Please enter a valid price";
                break;
            case "discountPrice":
                if (value && (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > parseFloat(productData.originalPrice))) {
                    error = "Discount price must be less than original price";
                }
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const handleRentalChange = (index, value) => {
        let error = "";
        if (value && (isNaN(value) || parseFloat(value) <= 0)) {
            error = "Please enter a valid price";
        }
        setErrors((prev) => ({ ...prev, [`rental-${index}-price`]: error }));

        const updatedRentals = [...productData.rentalOptions];
        updatedRentals[index].price = value;
        setProductData((prev) => ({ ...prev, rentalOptions: updatedRentals }));
    };

    const handleRentalBlur = (index) => {
        setTouched((prev) => ({ ...prev, [`rental-${index}-price`]: true }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // --- Validate all fields ---
        const newErrors = {};
        Object.keys(productData).forEach((key) => {
            if (key !== "rentalOptions" && key !== "discountPercentage") {
                const error = validateField(key, productData[key]);
                if (error) newErrors[key] = error;
            }
        });

        // Validate rental options
        productData.rentalOptions.forEach((option, index) => {
            if (!option.price || option.price === "") {
                newErrors[`rental-${index}-price`] = "Rental price is required";
            } else if (isNaN(option.price) || parseFloat(option.price) <= 0) {
                newErrors[`rental-${index}-price`] = "Please enter a valid price";
            }
        });

        // Validate images
        if (images.length === 0) newErrors.images = "At least one image is required";

        setErrors(newErrors);

        // Mark all fields as touched
        const allTouched = {};
        Object.keys(productData).forEach(key => { allTouched[key] = true; });
        productData.rentalOptions.forEach((_, index) => { allTouched[`rental-${index}-price`] = true; });
        allTouched.images = true;
        setTouched(allTouched);

        if (Object.keys(newErrors).length > 0) {
            toast.error("Please fix the validation errors");
            return;
        }

        try {
            // --- Separate existing images and new images ---
            const existingImages = images.filter(img => img.url && !img.file).map(img => img.url);
            const newImages = images.filter(img => img.file);

            let uploadedImages = [...existingImages];

            // --- Upload new images in a single API call ---
            if (newImages.length > 0) {
                const formData = new FormData();

                // Append all new images to formData
                newImages.forEach((img) => {
                    formData.append("images[]", img.file);
                });

                const res = await apiClient.post(`/admin/products/${id}/images`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                if (res.data.images && res.data.images.length > 0) {
                    uploadedImages.push(...res.data.images);
                }
            }

            // --- Prepare update data ---
            const updateData = {
                title: productData.title,
                slug: productData.title.toLowerCase().replace(/\s+/g, "-"),
                category_id: categoryMap[productData.category] || 0,
                description: productData.description,
                actual_price: parseFloat(productData.originalPrice),
                discount_price: productData.discountPrice ? parseFloat(productData.discountPrice) : null,
                active: 1,
                rentalOptions: productData.rentalOptions.map(opt => ({
                    days: parseInt(opt.days),
                    price: parseFloat(opt.price)
                })),
                images: uploadedImages // all URLs only
            };

            console.log("Sending update data:", updateData);

            // --- Send PUT request to update product ---
            const response = await apiClient.put(`/admin/products/${id}`, updateData);

            if (response.data.message) {
                toast.success("Product updated successfully!");
                navigate("/admin/products");
            } else {
                toast.error(response.data.message || "Failed to update product");
            }
        } catch (err) {
            console.error("Update error:", err);
            console.error("Error details:", err.response?.data);
            toast.error(err.response?.data?.message || err.message || "Failed to update product");
        }
    };

    const hasError = (fieldName) => touched[fieldName] && errors[fieldName];

    return (
        <div className="mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="p-6 border-b border-gray-200 text-center">
                    <h1 className="text-2xl font-semibold text-gray-800">Edit Product</h1>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-medium text-gray-700 border-b pb-2">Basic Information</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={productData.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                                        hasError("title") ? "border-red-400" : "border-gray-300"
                                    }`}
                                />
                                {hasError("title") && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Category *</label>
                                <select
                                    name="category"
                                    value={productData.category}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                                        hasError("category") ? "border-red-400" : "border-gray-300"
                                    }`}
                                >
                                    <option value="">Select a category</option>
                                    {Object.keys(categoryMap).map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                {hasError("category") && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                                <textarea
                                    name="description"
                                    value={productData.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    rows={3}
                                    className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                                        hasError("description") ? "border-red-400" : "border-gray-300"
                                    }`}
                                />
                                {hasError("description") && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>
                        </div>

                        {/* Pricing Info */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-medium text-gray-700 border-b pb-2">Pricing Information</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price ($) *</label>
                                <input
                                    type="number"
                                    name="originalPrice"
                                    value={productData.originalPrice}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    min="0"
                                    step="0.01"
                                    className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                                        hasError("originalPrice") ? "border-red-400" : "border-gray-300"
                                    }`}
                                />
                                {hasError("originalPrice") && <p className="text-red-500 text-sm mt-1">{errors.originalPrice}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price ($)</label>
                                <input
                                    type="number"
                                    name="discountPrice"
                                    value={productData.discountPrice}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    min="0"
                                    step="0.01"
                                    className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                                        hasError("discountPrice") ? "border-red-400" : "border-gray-300"
                                    }`}
                                />
                                {hasError("discountPrice") && <p className="text-red-500 text-sm mt-1">{errors.discountPrice}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage (%)</label>
                                <input
                                    type="number"
                                    name="discountPercentage"
                                    value={productData.discountPercentage}
                                    readOnly
                                    className="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Images */}
                    <div>
                        <h2 className="text-lg font-medium text-gray-700 border-b pb-2 mb-4">Product Images</h2>
                        <ImageUpload images={images} setImages={setImages} error={errors.images} productId={id} />
                    </div>

                    {/* Rental Options */}
                    <div>
                        <h2 className="text-lg font-medium text-gray-700 border-b pb-2 mb-4">Rental Options</h2>
                        <div className="space-y-4">
                            {productData.rentalOptions.map((option, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Days</label>
                                        <input
                                            type="number"
                                            value={option.days}
                                            disabled
                                            className="w-full p-3 border rounded-lg bg-gray-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                                        <input
                                            type="number"
                                            value={option.price}
                                            onChange={(e) => handleRentalChange(index, e.target.value)}
                                            onBlur={() => handleRentalBlur(index)}
                                            min="0"
                                            step="0.01"
                                            className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                                                touched[`rental-${index}-price`] && errors[`rental-${index}-price`] ? "border-red-400" : "border-gray-300"
                                            }`}
                                        />
                                        {touched[`rental-${index}-price`] && errors[`rental-${index}-price`] && (
                                            <p className="text-red-500 text-sm mt-1">{errors[`rental-${index}-price`]}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-medium py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors shadow-md"
                        >
                            Edit Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductEditForm;