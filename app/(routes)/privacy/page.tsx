"use client";

import Link from 'next/link';
import { ChevronRight, Shield } from 'lucide-react';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
    const lastUpdated = 'December 1, 2024';

    const sections = [
        {
            title: '1. Information We Collect',
            content: `We collect information to provide and improve our services:

**Personal Information:**
• Name, email address, phone number
• Shipping and billing addresses
• Payment information (processed securely by payment providers)
• Account credentials

**Usage Information:**
• Device and browser information
• IP address and location data
• Pages visited and actions taken
• Shopping preferences and history

**Cookies and Tracking:**
We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content.`
        },
        {
            title: '2. How We Use Your Information',
            content: `We use collected information to:

• Process and fulfill your orders
• Communicate about orders, products, and services
• Provide customer support
• Personalize your shopping experience
• Improve our platform and services
• Detect and prevent fraud
• Comply with legal obligations

We do not sell your personal information to third parties.`
        },
        {
            title: '3. Information Sharing',
            content: `We share information with:

**Service Providers:**
• Payment processors
• Shipping carriers
• Cloud hosting services
• Analytics providers

**Suppliers:**
When you place an order, we share necessary information with suppliers to fulfill your order.

**Legal Requirements:**
We may disclose information when required by law or to protect our rights and safety.`
        },
        {
            title: '4. Data Security',
            content: `We implement robust security measures:

• SSL/TLS encryption for data transmission
• Secure payment processing (PCI-DSS compliant)
• Regular security audits
• Access controls and authentication
• Data encryption at rest

While we strive to protect your information, no method of transmission over the Internet is 100% secure.`
        },
        {
            title: '5. Your Privacy Rights',
            content: `Depending on your location, you may have the right to:

• **Access:** Request a copy of your personal data
• **Correction:** Update inaccurate information
• **Deletion:** Request deletion of your data
• **Portability:** Receive your data in a portable format
• **Opt-out:** Unsubscribe from marketing communications

To exercise these rights, contact us at privacy@gharbazaar.com.`
        },
        {
            title: '6. Cookie Policy',
            content: `We use the following types of cookies:

**Essential Cookies:**
Required for basic site functionality, such as shopping cart and checkout.

**Analytics Cookies:**
Help us understand how visitors interact with our site.

**Marketing Cookies:**
Used to deliver relevant advertisements and track campaign performance.

You can manage cookie preferences through your browser settings.`
        },
        {
            title: '7. Children\'s Privacy',
            content: `Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children.

If you believe a child has provided us with personal information, please contact us immediately so we can delete it.`
        },
        {
            title: '8. International Data Transfers',
            content: `Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place:

• Standard contractual clauses
• Privacy Shield certification (where applicable)
• Adequate data protection agreements

By using our services, you consent to such transfers.`
        },
        {
            title: '9. Data Retention',
            content: `We retain your information for as long as:

• Your account is active
• Needed to provide services
• Required by law
• Necessary for legitimate business purposes

After account deletion, some information may be retained for legal compliance or fraud prevention.`
        },
        {
            title: '10. Updates to This Policy',
            content: `We may update this Privacy Policy periodically. We will notify you of significant changes through:

• Email notification
• Prominent notice on our website
• In-app notifications

Your continued use after changes indicates acceptance of the updated policy.`
        },
        {
            title: '11. Contact Us',
            content: `For privacy-related questions or concerns:

**Data Protection Officer**
Ghar Bazaar, Inc.
123 Commerce Street
New York, NY 10001

Email: privacy@gharbazaar.com
Phone: +1 (800) 123-4567

We aim to respond to all inquiries within 30 days.`
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
                            <span className="text-white">Privacy Policy</span>
                        </nav>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold">Privacy Policy</h1>
                        </div>
                        <p className="text-gray-300">Last updated: {lastUpdated}</p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl border border-gray-100 p-8 lg:p-12 shadow-sm">
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            At Ghar Bazaar, we take your privacy seriously. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our platform and services.
                        </p>

                        <div className="space-y-8">
                            {sections.map((section, idx) => (
                                <div key={idx} className="border-b border-gray-100 pb-8 last:border-0">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
                                    <div className="text-gray-600 whitespace-pre-line leading-relaxed prose prose-sm max-w-none">
                                        {section.content.split('**').map((text, i) =>
                                            i % 2 === 1 ? <strong key={i}>{text}</strong> : text
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Related Links */}
                    <div className="mt-8 flex flex-wrap gap-4 justify-center">
                        <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
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
