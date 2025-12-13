"use client";

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
    const lastUpdated = 'December 1, 2024';

    const sections = [
        {
            title: '1. Acceptance of Terms',
            content: `By accessing or using Ghar Bazaar's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.

These terms apply to all users, including buyers, suppliers, and visitors. We reserve the right to update these terms at any time, and your continued use of the platform constitutes acceptance of any changes.`
        },
        {
            title: '2. User Accounts',
            content: `To access certain features, you must create an account. You are responsible for:

• Maintaining the confidentiality of your account credentials
• All activities that occur under your account
• Providing accurate and up-to-date information
• Notifying us immediately of any unauthorized access

We reserve the right to suspend or terminate accounts that violate our policies.`
        },
        {
            title: '3. Buying and Selling',
            content: `Ghar Bazaar facilitates transactions between buyers and suppliers. We are not a party to any transaction.

Buyers agree to:
• Provide accurate shipping and payment information
• Pay for orders in a timely manner
• Communicate respectfully with suppliers

Suppliers agree to:
• Accurately describe products and services
• Ship orders within the stated timeframe
• Handle returns and refunds per our policies`
        },
        {
            title: '4. Payments and Fees',
            content: `We accept various payment methods as displayed during checkout. Fees may apply:

• Transaction fees for suppliers
• Currency conversion fees for international transactions
• Shipping and handling charges

All prices are displayed in USD unless otherwise specified. We use secure payment processors and never store complete credit card information.`
        },
        {
            title: '5. Shipping and Delivery',
            content: `Shipping times and costs vary by location and method selected. Estimated delivery times are not guaranteed.

• Risk of loss transfers to the buyer upon delivery
• Tracking information will be provided when available
• International orders may be subject to customs duties

We are not responsible for delays caused by shipping carriers or customs.`
        },
        {
            title: '6. Returns and Refunds',
            content: `Our return policy allows returns within 30 days for most items. Items must be:

• Unused and in original packaging
• Accompanied by proof of purchase
• Shipped using our provided return labels

Refunds are processed within 5-7 business days after we receive and inspect returned items. Some items may not be eligible for return.`
        },
        {
            title: '7. Intellectual Property',
            content: `All content on Ghar Bazaar, including logos, text, images, and software, is protected by intellectual property laws.

You may not:
• Copy, modify, or distribute our content without permission
• Use our trademarks without written consent
• Scrape or harvest data from our platform

Users retain ownership of content they post but grant us a license to display it on our platform.`
        },
        {
            title: '8. Prohibited Activities',
            content: `The following activities are strictly prohibited:

• Fraudulent transactions or misrepresentation
• Selling counterfeit or illegal products
• Harassment or abuse of other users
• Circumventing our fee structure
• Attempting to hack or compromise our systems
• Spamming or sending unsolicited communications

Violations may result in account suspension or legal action.`
        },
        {
            title: '9. Limitation of Liability',
            content: `Ghar Bazaar is provided "as is" without warranties of any kind.

We are not liable for:
• Loss of profits or data
• Indirect, incidental, or consequential damages
• Third-party actions or content
• Service interruptions or errors

Our total liability shall not exceed the fees paid by you in the preceding 12 months.`
        },
        {
            title: '10. Dispute Resolution',
            content: `Any disputes arising from these terms shall be resolved through:

1. Direct negotiation between parties
2. Mediation through our dispute resolution service
3. Binding arbitration in accordance with AAA rules

These terms are governed by the laws of the State of New York. You agree to submit to the jurisdiction of courts located in New York County.`
        },
        {
            title: '11. Contact Information',
            content: `For questions about these Terms of Service, please contact:

Ghar Bazaar, Inc.
123 Commerce Street
New York, NY 10001
Email: legal@gharbazaar.com
Phone: +1 (800) 123-4567`
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main>
                {/* Hero */}
                <section className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                            <Link href="/" className="hover:text-white">Home</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white">Terms of Service</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Terms of Service</h1>
                        <p className="text-gray-300">Last updated: {lastUpdated}</p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl border border-gray-100 p-8 lg:p-12 shadow-sm">
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Welcome to Ghar Bazaar. These Terms of Service govern your use of our website, mobile applications, and services. Please read them carefully before using our platform.
                        </p>

                        <div className="space-y-8">
                            {sections.map((section, idx) => (
                                <div key={idx} className="border-b border-gray-100 pb-8 last:border-0">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
                                    <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                                        {section.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Related Links */}
                    <div className="mt-8 flex flex-wrap gap-4 justify-center">
                        <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                        <span className="text-gray-300">•</span>
                        <Link href="/faq" className="text-blue-600 hover:underline">FAQ</Link>
                        <span className="text-gray-300">•</span>
                        <Link href="/contact" className="text-blue-600 hover:underline">Contact Us</Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
