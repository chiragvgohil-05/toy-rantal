// src/pages/PrivacyPolicy.jsx
import React from "react";

const PrivacyPolicy = () => {
    const policySections = [
        {
            title: "Information We Collect",
            content: "We collect information you provide directly to us, such as when you create an account, place an order, or contact us. This may include your name, email address, phone number, shipping address, payment information, and any other information you choose to provide."
        },
        {
            title: "How We Use Your Information",
            content: "We use the information we collect to provide, maintain, and improve our services; process transactions and send related information; send you technical notices and support messages; respond to your comments and questions; and communicate with you about products and services offered by us."
        },
        {
            title: "Information Sharing",
            content: "We do not sell your personal information to third parties. We may share your information with service providers who perform services on our behalf, such as payment processing, delivery, and marketing assistance. We require these providers to use your information only for the purposes we've authorized."
        },
        {
            title: "Data Security",
            content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security."
        },
        {
            title: "Your Choices",
            content: "You may update your account information and preferences at any time by logging into your account. You can opt out of receiving promotional communications from us by following the instructions in those communications. Even if you opt out, we may still send you non-promotional messages, such as those about your account or our ongoing business relations."
        },
        {
            title: "Children's Privacy",
            content: "Our service is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information of a child under 13, we will take steps to delete such information as soon as possible."
        },
        {
            title: "Changes to This Policy",
            content: "We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice. We encourage you to review the Privacy Policy whenever you access our services to stay informed about our information practices."
        },
        {
            title: "Contact Us",
            content: "If you have any questions about this Privacy Policy, please contact us at privacy@playfulrent.com or through the contact information provided on our website."
        }
    ];

    return (
        <div className="bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-purple-700 mb-4">Privacy Policy</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-200 mb-8">
                    <div className="mb-6">
                        <p className="text-gray-600 mb-4">
                            At PlayfulRent, we take your privacy seriously. This Privacy Policy describes how we collect, use,
                            and share your personal information when you use our website and services.
                        </p>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <p className="text-blue-700 text-sm">
                                    By using our website, you consent to the practices described in this Privacy Policy.
                                    We encourage you to read this policy carefully to understand our views and practices regarding your personal data.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {policySections.map((section, index) => (
                            <div key={index}>
                                <h2 className="text-xl font-semibold text-purple-700 mb-3">{section.title}</h2>
                                <p className="text-gray-600">{section.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-200">
                    <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <span className="bg-purple-100 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
                        Data Protection Rights
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                            <h3 className="font-bold text-lg text-purple-700 mb-3">Your Rights</h3>
                            <p className="text-gray-600 mb-4">
                                Depending on your location, you may have the following rights regarding your personal data:
                            </p>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Access and receive a copy of your personal data</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Rectify inaccurate or incomplete personal data</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Request deletion of your personal data</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Restrict or object to processing of your personal data</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Data portability (receiving your data in a machine-readable format)</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
                            <h3 className="font-bold text-lg text-pink-700 mb-3">Exercising Your Rights</h3>
                            <p className="text-gray-600 mb-4">
                                To exercise any of these rights, please contact us using the details provided in the Contact Us section.
                                We will respond to your request within the timeframe required by applicable law.
                            </p>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                                <div className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-yellow-700 text-sm">
                                        We may need to verify your identity before processing your request, which may require us to request additional
                                        personal information from you. In certain circumstances, we may decline a request, particularly where we are
                                        unable to verify your identity or where we are legally permitted to do so.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;