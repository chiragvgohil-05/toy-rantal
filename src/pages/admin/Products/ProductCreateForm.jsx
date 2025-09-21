import React, { useState, useEffect } from 'react';
import ImageUpload from "../../../components/ImageUpload";
import apiClient from "../../../apiClient";
const ProductCreateForm = () => {
    // Map categories to IDs
    const categoryMap = {
        "Soft Toys": 1,
        "Vehicles": 2,
        "Dolls": 3,
        "Blocks": 4,
        "Puzzles": 5,
        "Electronic Toys": 6
    };

    const [productData, setProductData] = useState({
        title: "",
        category: "",
        description: "",
        originalPrice: "",
        discountedPrice: "",
        discountPercentage: "",
        rentalOptions: [
            { days: 7, price: "" },
            { days: 15, price: "" },
            { days: 30, price: "" },
        ]
    });

    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Calculate discounted price
    useEffect(() => {
        const original = parseFloat(productData.originalPrice);
        const discountPercent = parseFloat(productData.discountPercentage);

        if (!isNaN(original) && !isNaN(discountPercent) && discountPercent >= 0 && discountPercent <= 100) {
            const discounted = (original - (original * discountPercent / 100)).toFixed(2);
            setProductData(prev => ({ ...prev, discountedPrice: discounted }));
        } else {
            setProductData(prev => ({ ...prev, discountedPrice: "" }));
        }
    }, [productData.originalPrice, productData.discountPercentage]);

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
            case "discountPercentage":
                if (value && (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > 100)) {
                    error = "Discount must be between 0 and 100%";
                }
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({ ...prev, [name]: value }));

        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleRentalChange = (index, value) => {
        let error = "";
        if (value && (isNaN(value) || parseFloat(value) <= 0)) {
            error = "Please enter a valid price";
        }
        setErrors(prev => ({ ...prev, [`rental-${index}-price`]: error }));

        const updatedRentals = [...productData.rentalOptions];
        updatedRentals[index].price = value;
        setProductData(prev => ({ ...prev, rentalOptions: updatedRentals }));
    };

    const handleRentalBlur = (index) => {
        setTouched(prev => ({ ...prev, [`rental-${index}-price`]: true }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {};
        Object.keys(productData).forEach((key) => {
            if (key !== "rentalOptions") {
                const error = validateField(key, productData[key]);
                if (error) newErrors[key] = error;
            }
        });

        productData.rentalOptions.forEach((option, index) => {
            if (!option.price) {
                newErrors[`rental-${index}-price`] = "Rental price is required";
            }
        });

        if (images.length === 0) newErrors.images = "At least one image is required";

        setErrors(newErrors);
        setTouched(Object.keys(productData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

        if (Object.keys(newErrors).length > 0) return; // Stop if errors

        try {
            const formData = new FormData();
            formData.append("title", productData.title);
            formData.append("slug", productData.title.toLowerCase().replace(/\s+/g, "-"));
            formData.append("category_id", categoryMap[productData.category] || 0);
            formData.append("description", productData.description);
            formData.append("actual_price", productData.originalPrice);
            formData.append("discount_price", productData.discountedPrice);
            formData.append("active", 1);

            // Rental options
            productData.rentalOptions.forEach((opt, i) => {
                formData.append(`rentalOptions[${i}][days]`, opt.days);
                formData.append(`rentalOptions[${i}][price]`, opt.price);
            });

            // Images
            // images.forEach((img) => {
            //     formData.append("images[]", img.file); // important: use images[]
            // });

            // POST request using apiClient
            const response = await apiClient.post("/admin/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Must be multipart/form-data
                },
            });

            console.log(response, "chirag")

            if (response.data.success) {
                alert("Product created successfully!");

                // Reset form
                setProductData({
                    title: "",
                    category: "",
                    description: "",
                    originalPrice: "",
                    discountedPrice: "",
                    discountPercentage: "",
                    rentalOptions: [
                        { days: 7, price: "" },
                        { days: 15, price: "" },
                        { days: 30, price: "" },
                    ],
                });
                setImages([]);
                setErrors({});
                setTouched({});
            } else {
                alert(response.data.message || "Failed to create product");
            }
        } catch (err) {
            console.error(err);
            alert(err.message || JSON.stringify(err));
        }
    };

    const hasError = (fieldName) => touched[fieldName] && errors[fieldName];

    return (
        <div className="mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 text-center">
                    <h1 className="text-2xl font-semibold text-gray-800">Create Product</h1>
                    <p className="text-gray-500 text-sm">Fill in the details to add a new product</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-medium text-gray-700 border-b pb-2">Basic Information</h2>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={productData.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${hasError('title') ? 'border-red-400' : 'border-gray-300'}`}
                                    placeholder="e.g., Premium Building Blocks"
                                />
                                {hasError('title') && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Category *</label>
                                <select
                                    name="category"
                                    value={productData.category}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${hasError('category') ? 'border-red-400' : 'border-gray-300'}`}
                                >
                                    <option value="">Select a category</option>
                                    {Object.keys(categoryMap).map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                {hasError('category') && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                                <textarea
                                    name="description"
                                    value={productData.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    rows={3}
                                    className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${hasError('description') ? 'border-red-400' : 'border-gray-300'}`}
                                    placeholder="Describe the product..."
                                />
                                {hasError('description') && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>
                        </div>

                        {/* Pricing Information */}
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
                                    className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${hasError('originalPrice') ? 'border-red-400' : 'border-gray-300'}`}
                                    placeholder="1800"
                                />
                                {hasError('originalPrice') && <p className="text-red-500 text-sm mt-1">{errors.originalPrice}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Discounted Price ($)</label>
                                <input
                                    type="number"
                                    name="discountedPrice"
                                    value={productData.discountedPrice}
                                    readOnly
                                    className="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
                                    placeholder="Calculated automatically"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage (%)</label>
                                <input
                                    type="number"
                                    name="discountPercentage"
                                    value={productData.discountPercentage}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${hasError('discountPercentage') ? 'border-red-400' : 'border-gray-300'}`}
                                    placeholder="22"
                                />
                                {hasError('discountPercentage') && <p className="text-red-500 text-sm mt-1">{errors.discountPercentage}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <h2 className="text-lg font-medium text-gray-700 border-b pb-2 mb-4">Product Images</h2>
                        <ImageUpload images={images} setImages={setImages} error={errors.images} />
                    </div>

                    {/* Rental Options */}
                    <div>
                        <h2 className="text-lg font-medium text-gray-700 border-b pb-2 mb-4">Rental Options</h2>
                        <div className="space-y-4">
                            {productData.rentalOptions.map((option, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Days</label>
                                        <input type="number" value={option.days} disabled className="w-full p-3 border rounded-lg bg-gray-100" />
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
                                            className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${touched[`rental-${index}-price`] && errors[`rental-${index}-price`] ? 'border-red-400' : 'border-gray-300'}`}
                                            placeholder="Enter rental price"
                                        />
                                        {touched[`rental-${index}-price`] && errors[`rental-${index}-price`] && <p className="text-red-500 text-sm mt-1">{errors[`rental-${index}-price`]}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-medium py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors shadow-md"
                        >
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductCreateForm;
