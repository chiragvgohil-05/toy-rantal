import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import '../../styles/ProductCreate.css';
import Input from "../../../components/Input";
import CheckBox from "../../components/CheckBox";
import Select from "../../../components/Select";
import ImagePicker from "../../../components/ImagePicker";
import TextArea from "../../../components/TextArea";
import { useNavigate } from 'react-router-dom';

const ProductCreate = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        originalPrice: '',
        imageUrl: '',
        isNew: false,
        discount: '0',
        inStock: true,
        brand: '',
        category: '',
        description: ''
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Product name is required';
        }

        if (!formData.price || parseFloat(formData.price) <= 0) {
            newErrors.price = 'Valid price is required';
        }

        if (formData.originalPrice && parseFloat(formData.originalPrice) < parseFloat(formData.price)) {
            newErrors.originalPrice = 'Original price should be greater than or equal to current price';
        }

        if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
            newErrors.imageUrl = 'Please enter a valid URL';
        }

        if (parseFloat(formData.discount) < 0 || parseFloat(formData.discount) > 100) {
            newErrors.discount = 'Discount must be between 0 and 100';
        }

        if (!formData.brand.trim()) {
            newErrors.brand = 'Brand is required';
        }
        if (!formData.category.trim()) {
            newErrors.category = 'Category is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Process the form data
            const productData = {
                id: Date.now(),
                name: formData.name.trim(),
                price: parseFloat(formData.price),
                originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
                imageUrl: formData.imageUrl || null,
                isNew: formData.isNew,
                discount: parseFloat(formData.discount),
                inStock: formData.inStock,
                brand: formData.brand.trim(),
                category: formData.category.trim(),
                description: formData.description.trim()
            };

            console.log('Product added:', productData);

            // Reset form after success
            setTimeout(() => {
                setFormData({
                    name: '',
                    price: '',
                    originalPrice: '',
                    imageUrl: '',
                    isNew: false,
                    discount: '0',
                    inStock: true,
                    brand: '',
                    category: '',
                    description: ''
                });
            }, 2000);

        } catch (error) {
            console.error('Error adding product:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            price: '',
            originalPrice: '',
            imageUrl: '',
            isNew: false,
            discount: '0',
            inStock: true,
            brand: '',
            category: '',
            description: ''
        });
        setErrors({});
    };

    const handleImagesChange = (images) => {
        console.log('Selected images:', images);
    };

    return (
        <>
            <div>
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{cursor:"pointer"}} onClick={() => navigate(-1)}>
                    <path d="M11 6L5 12M5 12L11 18M5 12H19" stroke="#000000" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div className="product-form-container">
                <div className="product-form-wrapper">
                    <div className="product-form-card">
                        {/* Header */}
                        <div className="product-form-header">
                            <div className="product-form-header-content">
                                <div>
                                    <h1 className="product-form-title">Add New Product</h1>
                                    <p className="product-form-subtitle">Fill in the product details below</p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="product-form-content">
                            <div className="product-form-grid">
                                <div className="product-form-section">
                                    {/* Product Name */}
                                    <div className="product-form-full-width">
                                        <Input
                                            label="Product Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter product name"
                                            className="product-form-input"
                                            required
                                            error={errors.name}
                                        />
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <Select
                                            label="Category"
                                            name="category"
                                            options={['soffa', 'chair']}
                                            value={formData.category}
                                            onChange={(e) => handleChange({ target: { name: 'category', value: e.target.value } })}
                                            placeholder="Select Category"
                                            required
                                            error={errors.category}
                                        />
                                    </div>
                                </div>

                                <div className="product-form-section">
                                    {/* Original Price */}
                                    <div>
                                        <Input
                                            label="Original Price (₹)"
                                            name="originalPrice"
                                            type="number"
                                            value={formData.originalPrice}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            error={errors.originalPrice}
                                        />
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <Input
                                            label="Current Price (₹)"
                                            name="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            required
                                            error={errors.price}
                                        />
                                    </div>
                                </div>

                                <div className="product-form-section">
                                    <div>
                                        <Input
                                            label="Brand"
                                            name="brand"
                                            value={formData.brand}
                                            onChange={handleChange}
                                            placeholder="e.g. Nike, Samsung"
                                            required
                                            error={errors.brand}
                                        />
                                    </div>

                                    {/* Discount */}
                                    <div>
                                        <Input
                                            label="Discount (%)"
                                            name="discount"
                                            type="number"
                                            value={formData.discount}
                                            onChange={handleChange}
                                            placeholder="0"
                                            min="0"
                                            max="100"
                                            error={errors.discount}
                                        />
                                    </div>
                                </div>

                                <div className="product-form-section">
                                    {/* Description */}
                                    <div className="product-form-full-width">
                                        <TextArea
                                            label="Description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Brief product description"
                                            rows={4}
                                        />
                                    </div>
                                </div>

                                <div className="product-image-section">
                                    <div className="product-form-full-width">
                                        <ImagePicker
                                            onFilesChange={handleImagesChange}
                                            multiple={true}
                                            maxFiles={8}
                                            maxFileSize={10} // 10MB
                                            acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
                                        />
                                    </div>
                                </div>

                                {/* Checkboxes */}
                                <div className="product-form-checkbox-group">
                                    <div className="product-form-checkbox">
                                        <CheckBox
                                            name="inStock"
                                            label="In Stock"
                                            checked={formData.inStock}
                                            onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="product-form-actions">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="product-form-reset"
                                >
                                    <FaTimes className="w-4 h-4" />
                                    <span>Reset Form</span>
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    onClick={handleSubmit}
                                    className={`product-form-submit ${isSubmitting ? 'product-form-submit-disabled' : 'product-form-submit-primary'}`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="product-form-spinner"></div>
                                            <span>Adding Product...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaPlus className="w-4 h-4" />
                                            <span>Add Product</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ProductCreate;