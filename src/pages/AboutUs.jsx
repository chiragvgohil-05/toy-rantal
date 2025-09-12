// src/pages/AboutUs.jsx
import React from "react";

const AboutUs = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Founder & CEO",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
            description: "With 10+ years in the toy industry, Sarah founded PlayfulRent to make quality toys accessible to all families."
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Operations Manager",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
            description: "Michael ensures our rental process is smooth and efficient from order to delivery and back."
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            role: "Toy Curator",
            image: "https://images.unsplash.com/photo-1551836026-d5c8c5ab235e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
            description: "Emma carefully selects and tests all toys to ensure they're safe, educational, and fun for children."
        },
        {
            id: 4,
            name: "David Kim",
            role: "Customer Experience",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
            description: "David and his team are here to help you with any questions about your rentals or account."
        }
    ];

    const values = [
        {
            title: "Sustainability",
            icon: "🌱",
            description: "We reduce toy waste by circulating quality toys through multiple families."
        },
        {
            title: "Education",
            icon: "📚",
            description: "Our toys are selected to promote learning and development at every age."
        },
        {
            title: "Accessibility",
            icon: "🤝",
            description: "We believe all children deserve access to quality toys regardless of budget."
        },
        {
            title: "Convenience",
            icon: "📦",
            description: "Free delivery and pickup makes toy rotation effortless for busy families."
        }
    ];

    const stats = [
        { number: "10,000+", label: "Happy Kids" },
        { number: "5,000+", label: "Quality Toys" },
        { number: "50+", label: "Cities Served" },
        { number: "98%", label: "Satisfaction Rate" }
    ];

    return (
        <div className="bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 min-h-screen">
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-r from-purple-400 to-pink-400 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Making childhood more playful, one rental at a time
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Introduction */}
                <section className="mb-16">
                    <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-200">
                        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">Why PlayfulRent?</h2>
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <p className="text-gray-700 mb-4">
                                    Founded in 2020, PlayfulRent began with a simple observation: children outgrow toys quickly,
                                    while parents struggle with clutter and expenses of constantly buying new toys.
                                </p>
                                <p className="text-gray-700 mb-4">
                                    We created a solution that benefits everyone - kids get a rotating selection of engaging toys,
                                    parents save money and space, and the environment benefits from reduced waste.
                                </p>
                                <p className="text-gray-700">
                                    Today, we're proud to serve thousands of families across the country with our curated collection
                                    of educational, developmental, and just plain fun toys for all ages.
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <img
                                    src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
                                    alt="Children playing with toys"
                                    className="rounded-xl shadow-lg max-w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="mb-16">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-400 rounded-2xl shadow-md p-8 text-white">
                        <h2 className="text-3xl font-bold mb-8 text-center">By The Numbers</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                                    <div className="text-sm md:text-base">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="mb-16">
                    <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-200">
                        <h2 className="text-3xl font-bold text-purple-700 mb-8 text-center">Our Values</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, index) => (
                                <div key={index} className="text-center p-6 bg-purple-50 rounded-xl border border-purple-200">
                                    <div className="text-4xl mb-4">{value.icon}</div>
                                    <h3 className="text-xl font-semibold text-purple-700 mb-2">{value.title}</h3>
                                    <p className="text-gray-600">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="mb-16">
                    <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-200">
                        <h2 className="text-3xl font-bold text-purple-700 mb-8 text-center">Meet Our Team</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamMembers.map(member => (
                                <div key={member.id} className="text-center">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-purple-200"
                                    />
                                    <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                                    <p className="text-purple-600 mb-2">{member.role}</p>
                                    <p className="text-gray-600 text-sm">{member.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section>
                    <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-200">
                        <h2 className="text-3xl font-bold text-purple-700 mb-8 text-center">How It Works</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                                <div className="text-4xl mb-4">1</div>
                                <h3 className="text-xl font-semibold text-purple-700 mb-2">Browse & Select</h3>
                                <p className="text-gray-600">Choose from hundreds of toys curated by age and developmental stage</p>
                            </div>
                            <div className="text-center p-6 bg-pink-50 rounded-xl border border-pink-200">
                                <div className="text-4xl mb-4">2</div>
                                <h3 className="text-xl font-semibold text-purple-700 mb-2">We Deliver</h3>
                                <p className="text-gray-600">Get toys delivered to your door, sanitized and ready to play</p>
                            </div>
                            <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-200">
                                <div className="text-4xl mb-4">3</div>
                                <h3 className="text-xl font-semibold text-purple-700 mb-2">Return & Repeat</h3>
                                <p className="text-gray-600">When ready, return and select new toys to keep playtime fresh</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;