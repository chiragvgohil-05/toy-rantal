// src/pages/Home.js
import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import ProductCard from "../components/ProductCard";
import '../style/Home.css';
import Collections from "../components/Collections";
import apiClient from "../apiClient";

const Home = () => {
    const [products, setProducts] = useState([]);

    const slides = [
        {
            id: 1,
            image: "https://picsum.photos/id/1015/1920/1080",
            title: "Welcome to Our Store",
            subtitle: "Discover amazing products with unbeatable prices",
            buttonText: "Shop Now",
            buttonLink: "/shop",
        },
        {
            id: 2,
            image: "https://picsum.photos/id/1018/1920/1080",
            title: "Fresh Arrivals",
            subtitle: "Check out the latest additions to our collection",
            buttonText: "Explore",
            buttonLink: "/new",
        },
        {
            id: 3,
            image: "https://picsum.photos/id/1025/1920/1080",
            title: "Exclusive Deals",
            subtitle: "Save big with our special offers",
            buttonText: "View Deals",
            buttonLink: "/deals",
        },
    ];
    // Create an array of products
    useEffect(() => {
        apiClient
            .get("/products")
            .then((response) => {
                const formattedProducts = response.data.map((p) => {
                    const discountPercentage =
                        p.actual_price && p.discount_price
                            ? Math.round(((p.actual_price - p.discount_price) / p.actual_price) * 100)
                            : 0;
                    console.log(`${process.env.REACT_APP_API_URL.replace("/api", "")}${p.images[0]}`)
                    return {
                        id: p.id,
                        title: p.title,
                        description: p.description,
                        imageUrl: `${process.env.REACT_APP_API_URL.replace("/api", "")}${p.images[0]}`,
                        originalPrice: p.actual_price,
                        discountedPrice: p.discount_price,
                        discountPercentage,
                        rentalOptions: p.rentalOptions || [],
                    };
                });

                setProducts(formattedProducts);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
            });
    }, []);

    // Handle rental option selection
    const handleOptionSelect = (selectionInfo) => {
        console.log("Selected option:", selectionInfo);
        // You can add this to a cart or state management here
    };

    return (
        <div className="home-page">
            <Slider slides={slides} interval={4000}/>
            <div>
                <Collections/>
            </div>
            <div className="relative bg-gradient-to-b from-blue-50 to-white py-16 overflow-hidden">

                <h2 className="text-4xl md:text-5xl font-extrabold text-center text-pink-600 mb-12 drop-shadow-lg">
                    Toy Gallery
                </h2>

                <div className="container mx-auto px-6 flex flex-wrap justify-center gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="transform hover:scale-105 transition-transform duration-300"
                        >
                            <ProductCard
                                id={product.id}
                                title={product.title}
                                description={product.description}
                                imageUrl={product.imageUrl}
                                originalPrice={product.originalPrice}
                                discountedPrice={product.discountedPrice}
                                discountPercentage={product.discountPercentage}
                                rentalOptions={product.rentalOptions}
                                onOptionSelect={handleOptionSelect}
                                className="shadow-xl rounded-2xl bg-white border-4 border-pink-200 hover:border-yellow-300"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div>
            </div>

            <section className="relative bg-gradient-to-t from-blue-50 to-white py-24 overflow-hidden">
                <div className="absolute top-10 left-10 w-16 h-16 bg-pink-400 rounded-full animate-bounce"></div>
                <div className="absolute bottom-20 right-20 w-20 h-20 bg-blue-400 rounded-full animate-ping"></div>

                <div className="relative max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-pink-600 drop-shadow-md mb-6">Benefits of
                        Toy Renting</h2>
                    <p className="text-gray-700 text-lg mb-14 max-w-2xl mx-auto">Fun, affordable, and eco-friendly
                        playtime for your little ones!</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        <div
                            className="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 hover:rotate-1 transition">
                            <div
                                className="w-24 h-24 mx-auto flex items-center justify-center bg-gradient-to-r from-pink-400 to-pink-600 rounded-full text-5xl mb-6">🧸
                            </div>
                            <h3 className="text-2xl font-bold text-pink-600">Endless Toys</h3>
                            <p className="text-gray-600 mt-3">Discover new toys every month and keep playtime
                                exciting!</p>
                        </div>

                        <div
                            className="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 hover:-rotate-1 transition">
                            <div
                                className="w-24 h-24 mx-auto flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full text-5xl mb-6">💸
                            </div>
                            <h3 className="text-2xl font-bold text-yellow-600">Save Money</h3>
                            <p className="text-gray-600 mt-3">Get premium toys without buying them — save for more
                                fun!</p>
                        </div>

                        <div
                            className="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 hover:rotate-2 transition">
                            <div
                                className="w-24 h-24 mx-auto flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600 rounded-full text-5xl mb-6">🌍
                            </div>
                            <h3 className="text-2xl font-bold text-green-600">Eco Friendly</h3>
                            <p className="text-gray-600 mt-3">Help the planet by reusing and recycling toys
                                sustainably.</p>
                        </div>

                        <div
                            className="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 hover:-rotate-2 transition">
                            <div
                                className="w-24 h-24 mx-auto flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 rounded-full text-5xl mb-6">📚
                            </div>
                            <h3 className="text-2xl font-bold text-blue-600">Learn & Play</h3>
                            <p className="text-gray-600 mt-3">Choose from fun educational toys that boost
                                creativity.</p>
                        </div>

                        <div
                            className="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 hover:rotate-1 transition">
                            <div
                                className="w-24 h-24 mx-auto flex items-center justify-center bg-gradient-to-r from-purple-400 to-purple-600 rounded-full text-5xl mb-6">🏡
                            </div>
                            <h3 className="text-2xl font-bold text-purple-600">Clutter Free</h3>
                            <p className="text-gray-600 mt-3">Keep your home tidy with fewer unused toys lying
                                around.</p>
                        </div>

                        <div
                            className="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 hover:-rotate-1 transition">
                            <div
                                className="w-24 h-24 mx-auto flex items-center justify-center bg-gradient-to-r from-red-400 to-red-600 rounded-full text-5xl mb-6">😊
                            </div>
                            <h3 className="text-2xl font-bold text-red-600">Happy Kids</h3>
                            <p className="text-gray-600 mt-3">Fresh toys = happy kids with smiles all day long!</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="how-it-works py-16 bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-12">
                        🚀 How It Works 🚀
                    </h2>
                    <div className="grid md:grid-cols-3 gap-10">

                        <div
                            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transition hover:-translate-y-2 hover:shadow-2xl">
                            <div className="w-20 h-20 bg-blue-100 flex items-center justify-center rounded-full mb-6">
                                <svg
                                    fill='#000000'
                                    width="50px"
                                    height="50px"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon flat-line"
                                >
                                    <polygon
                                        points="21 7 19 15 8 16 6.62 7 21 7"
                                        style={{
                                            fill: "rgb(44, 169, 188)",
                                            strokeWidth: 2,
                                        }}
                                    />
                                    <path
                                        d="M11,20.5h.1m5.9,0h.1"
                                        style={{
                                            fill: "none",
                                            stroke: "rgb(0, 0, 0)",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2.5,
                                        }}
                                    />
                                    <path
                                        d="M3,3H5.14a1,1,0,0,1,1,.85L6.62,7,8,16l11-1,2-8H6.62"
                                        style={{
                                            fill: "none",
                                            stroke: "rgb(0, 0, 0)",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                        }}
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Choose Toys</h3>
                            <p className="text-gray-600">Browse our wide collection and pick your child’s favorite
                                toys.</p>
                        </div>

                        <div
                            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transition hover:-translate-y-2 hover:shadow-2xl">
                            <div className="w-20 h-20 bg-green-100 flex items-center justify-center rounded-full mb-6">
                                <svg width="50px" height="50px" viewBox="0 0 1024 1024" className="icon" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M425.176 123.4h554.432v424.992H425.176z" fill="#E6246B"/>
                                    <path
                                        d="M893.832 809.152c47.384 0 85.784-38.392 85.784-85.784V543.624H425.976V241.288l-234.064-0.768L40.92 492.192V723.36c0 47.392 38.392 85.784 85.752 85.784h767.16z"
                                        fill="#F6B246"/>
                                    <path
                                        d="M893.832 809.152c47.384 0 85.784-38.392 85.784-85.784V603.832H40.92V723.36c0 47.392 38.392 85.784 85.752 85.784h767.16z"
                                        fill="#ECD4BE"/>
                                    <path
                                        d="M853.728 824.552c0 56.152-45.504 101.592-101.6 101.592-56.152 0-101.592-45.448-101.592-101.592 0-56.096 45.448-101.6 101.592-101.6 56.088 0 101.6 45.512 101.6 101.6zM379.584 824.552c0 56.152-45.48 101.592-101.6 101.592s-101.6-45.448-101.6-101.592c0-56.096 45.48-101.6 101.6-101.6s101.6 45.512 101.6 101.6z"
                                        fill="#0093D3"/>
                                    <path d="M264.192 454.568H62.848l109.128-178.736h92.216z" fill="#E09431"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Get Them Delivered</h3>
                            <p className="text-gray-600">We deliver clean, sanitized toys right to your doorstep.</p>
                        </div>

                        <div
                            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transition hover:-translate-y-2 hover:shadow-2xl">
                            <div className="w-20 h-20 bg-pink-100 flex items-center justify-center rounded-full mb-6">
                                <svg width="50px" height="50px" viewBox="-0.052 -0.028999999999999998 100.054 100.054"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#EBEEEF"
                                          d="M99.98 59.968s-.01-1.188-2.021-2.002c-8.553-4.242-42.326-20.5-42.326-20.5-1.232-.616-2.229-.616-3.461 0L1.945 62.112c-2.01.64-1.981 1.974-1.981 1.974-.021.008-.02 8.983 0 8.979 0 0 .034 1.215 2.021 1.91C10.531 78.82 44.25 94.539 44.25 94.539c1.231.614 2.229.614 3.461 0 0 0 40.562-19.354 50.223-23.727 1.949-.666 2.047-1.926 2.047-1.926.024.012.031-8.911-.001-8.918z"/>
                                    <path fill="#34495E"
                                          d="M30.462 60.748c4.684-2.346 12.275-2.346 16.96 0 4.684 2.344 4.684 6.146 0 8.488-4.685 2.346-12.276 2.346-16.96 0-4.683-2.343-4.683-6.145 0-8.488zm23-10c4.685-2.345 12.275-2.345 16.96 0 4.684 2.344 4.684 6.146 0 8.488-4.685 2.346-12.275 2.346-16.96 0-4.683-2.343-4.683-6.145 0-8.488z"/>
                                    <path fill="#C0392C"
                                          d="M55.586 49.311c3.514-1.758 9.207-1.758 12.721 0 1.625.814 2.498-.138 2.619.928.018.161.02 3.322.004 3.482-.106 1.075-.98 2.136-2.623 2.957-3.514 1.758-9.207 1.758-12.721 0-1.599-.8-2.469-1.826-2.613-2.871-.021-.156-.024-3.312-.016-3.467.075-1.101.951-.19 2.629-1.029z"/>
                                    <path fill="#E74C3C"
                                          d="M55.586 47.311c3.514-1.758 9.207-1.758 12.721 0 3.512 1.758 3.512 4.608 0 6.367-3.514 1.758-9.207 1.758-12.721 0-3.513-1.759-3.513-4.609 0-6.367z"/>
                                    <path fill="#95A5A6"
                                          d="M32.586 59.311c3.513-1.758 9.208-1.758 12.72 0 3.513 1.758 3.513 5.608 0 7.367-3.512 1.758-9.207 1.758-12.72 0-3.513-1.759-3.513-5.61 0-7.367z"/>
                                    <path fill="#34495E" d="M34.958 25.001v37c0 1.104 1.791 2 4 2s4-.896 4-2v-37h-8z"/>
                                    <path fill="#2C3E50"
                                          d="M34.958 31.445c1.274.353 2.612.556 4 .556 1.387 0 2.725-.204 4-.556v-6.443h-8v6.443z"/>
                                    <path fill="#E74C3C"
                                          d="M38.958.001c8.284 0 15 6.716 15 15s-6.716 15-15 15-15-6.716-15-15 6.716-15 15-15z"/>
                                    <path fill="#C0392C"
                                          d="M26.958 12.001c0-3.376 1.129-6.481 3.012-8.988-3.644 2.737-6.012 7.081-6.012 11.988 0 8.284 6.716 15 15 15 4.908 0 9.251-2.368 11.986-6.012a14.903 14.903 0 0 1-8.986 3.012c-8.284 0-15-6.716-15-15z"/>
                                    <path fill="#BDC3C7"
                                          d="M99.98 68.887s-.099 1.26-2.047 1.926c-9.66 4.371-50.224 23.726-50.224 23.726-1.232.615-2.229.615-3.461 0 0 0-33.719-15.718-42.265-19.562-1.987-.694-2.021-1.91-2.021-1.91-.006.001-.01-.856-.012-2.039-.006 2.642-.001 7.041.012 7.039 0 0 .034 1.216 2.021 1.91C10.531 83.82 44.25 99.539 44.25 99.539c1.231.614 2.229.614 3.461 0 0 0 40.562-19.354 50.223-23.727 1.949-.666 2.047-1.926 2.047-1.926.02.008.025-4.646.02-7.231-.007 1.281-.013 2.236-.021 2.232z"/>
                                    <path fill="#D4D7DA"
                                          d="M99.977 59.917c-.021.149-.227 1.272-2.043 1.896-9.66 4.371-50.223 23.726-50.223 23.726-1.232.615-2.229.615-3.461 0 0 0-33.718-15.718-42.265-19.562-1.959-.685-2.02-1.869-2.021-1.903v.014c-.021.006-.02 8.983 0 8.979 0 0 .034 1.216 2.021 1.91C10.531 78.82 44.25 94.539 44.25 94.539c1.231.614 2.229.614 3.461 0 0 0 40.562-19.354 50.223-23.727 1.949-.666 2.047-1.926 2.047-1.926.024.012.031-8.912 0-8.918l-.004-.051z"/>
                                    <path fill="#BDC3C7"
                                          d="M44.25 85.539S10.532 69.82 1.985 65.977c-1.959-.687-2.02-1.869-2.021-1.903v.014c-.021.008-.02 8.983 0 8.979 0 0 .034 1.216 2.021 1.91C10.531 78.82 44.25 94.539 44.25 94.539c.615.307 1.173.461 1.73.461v-9c-.557 0-1.115-.154-1.73-.461z"/>
                                    <path fill="#95A5A6"
                                          d="M44.25 94.539S10.532 78.82 1.985 74.977c-1.987-.694-2.021-1.91-2.021-1.91-.006.001-.01-.854-.012-2.039-.006 2.642-.001 7.041.012 7.039 0 0 .034 1.216 2.021 1.91C10.531 83.82 44.25 99.539 44.25 99.539c.616.308 1.173.461 1.73.461v-5c-.557 0-1.115-.154-1.73-.461z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Play & Return</h3>
                            <p className="text-gray-600">Enjoy toys for the rental period, then schedule an easy
                                return.</p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;