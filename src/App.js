// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// User Components
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Toys from "./pages/Toys";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Components
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/Products/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import ProductCreateForm from "./pages/admin/Products/ProductCreateForm";
import ProductEditForm from "./pages/admin/Products/ProductEditForm";
import AdminProfile from "./pages/admin/AdminProfile";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./pages/Checkout";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// Fake auth for demo
const isAdmin = true;  // change to false to simulate user login
const isLoggedIn = true;

function App() {
    return (
        <Router>
            <Routes>

                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* User Routes */}
                <Route path="/" element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}>
                    <Route index element={<Home />} />
                    <Route path="toys" element={<Toys />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="products/:id" element={<ProductDetail />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="about" element={<AboutUs />} />
                    <Route path="contact" element={<ContactUs />} />
                    <Route path="shipping" element={<Shipping />} />
                    <Route path="returns" element={<Returns />} />
                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={isAdmin ? <AdminLayout /> : <Navigate to="/login" />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="products/create" element={<ProductCreateForm />} />
                    <Route path="products/edit/:id" element={<ProductEditForm />} />
                    <Route path="profile" element={<AdminProfile />} />
                </Route>

                {/* Catch All */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
