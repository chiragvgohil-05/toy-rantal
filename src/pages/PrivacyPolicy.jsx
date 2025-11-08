// src/pages/PrivacyPolicy.jsx
import React from "react";

const PrivacyPolicy = () => {
    const policySections = [
        {
            title: "Information We Collect",
            content:
                "We collect information you provide directly to us, such as when you create an account, place an order, or contact us. This may include your name, email address, phone number, and any other details required for managing toy rentals and store visits."
        },
        {
            title: "How We Use Your Information",
            content:
                "We use your information to manage toy rental bookings, confirm store pickups, and process returns or refunds. This includes verifying your identity at the store, managing rental timelines, and keeping track of payments and refunds."
        },
        {
            title: "Payments and Rentals",
            content:
                "All payments for toy rentals are handled directly at our store in cash. When you visit our store to collect your toy, you are required to pay the full toy amount as a refundable deposit along with the rental charge. Once your rental period is complete and the toy is returned in good condition, your full deposit amount will be refunded immediately. Only the rent amount will be retained by the store as the usage fee."
        },
        {
            title: "Information Sharing",
            content:
                "We do not sell your personal information to third parties. We may share limited data with trusted service providers who assist us in operating our business, such as communication, analytics, or record-keeping tools. These providers are bound to maintain confidentiality and use the data only for authorized purposes."
        },
        {
            title: "Data Security",
            content:
                "We implement appropriate physical and digital safeguards to protect your information, including in-store documentation and online records. However, no system is completely secure, and we encourage you to avoid sharing sensitive data beyond what is necessary for toy rental or return processing."
        },
        {
            title: "Your Choices",
            content:
                "You may update your personal details, contact number, or preferences by contacting our store directly. We do not send promotional or marketing messages without your consent."
        },
        {
            title: "Children's Privacy",
            content:
                "Our service is designed for parents and guardians who rent toys for children. We do not collect personal information directly from children under 13 years of age."
        },
        {
            title: "Changes to This Policy",
            content:
                "We may update this Privacy Policy periodically to reflect changes in our practices or services. The latest version will always be available on our website, with the updated date shown at the top."
        },
        {
            title: "Contact Us",
            content:
                "If you have any questions about this Privacy Policy or how we handle your information, please contact us at privacy@playfulrent.com or visit our store during working hours."
        }
    ];

    return (
        <div className="bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-purple-700 mb-4">
                        Privacy Policy
                    </h1>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-200 mb-8">
                    <div className="mb-6">
                        <p className="text-gray-600 mb-4">
                            At PlayfulRent, we take your privacy seriously. This Privacy Policy
                            explains how we handle your information when you rent, return, or make
                            payments for toys at our store.
                        </p>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <div className="flex items-start">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="text-blue-700 text-sm">
                                    By using our services or renting a toy from our store, you agree
                                    to the practices described in this Privacy Policy.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {policySections.map((section, index) => (
                            <div key={index}>
                                <h2 className="text-xl font-semibold text-purple-700 mb-3">
                                    {section.title}
                                </h2>
                                <p className="text-gray-600">{section.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data Protection Rights Section */}
                <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-200">
                    <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
                        <span className="bg-purple-100 p-2 rounded-full mr-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-purple-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                        </span>
                        Data Protection Rights
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                            <h3 className="font-bold text-lg text-purple-700 mb-3">Your Rights</h3>
                            <p className="text-gray-600 mb-4">
                                You have the right to request access to, correction of, or deletion
                                of your personal data. You may also object to our processing of your
                                data or request that we limit how we use it.
                            </p>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li>Access and review your stored information.</li>
                                <li>Request correction or deletion of inaccurate data.</li>
                                <li>Request restriction of data processing.</li>
                                <li>
                                    Withdraw consent for non-essential communications at any time.
                                </li>
                            </ul>
                        </div>

                        <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
                            <h3 className="font-bold text-lg text-pink-700 mb-3">
                                Exercising Your Rights
                            </h3>
                            <p className="text-gray-600 mb-4">
                                To exercise any of these rights, please contact us using the details
                                in the “Contact Us” section. We will respond to your request within
                                the timeframe required by law.
                            </p>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                                <p className="text-yellow-700 text-sm">
                                    We may request proof of identity to ensure your data security
                                    before processing any data-related request.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
