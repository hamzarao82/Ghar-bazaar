"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, Search, HelpCircle, Package, CreditCard, Truck, RotateCcw, Shield, User, MessageSquare } from 'lucide-react';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQCategory {
    id: string;
    name: string;
    icon: React.ElementType;
    faqs: FAQItem[];
}

const faqCategories: FAQCategory[] = [
    {
        id: 'orders',
        name: 'Orders & Shipping',
        icon: Package,
        faqs: [
            { question: 'How can I track my order?', answer: 'You can track your order by going to "My Orders" in your account dashboard. Each order has a tracking number that you can use to monitor the delivery status.' },
            { question: 'What are the shipping options?', answer: 'We offer Standard Shipping (5-7 business days), Express Shipping (2-3 business days), and Priority Shipping (1-2 business days). Free shipping is available on orders over $50.' },
            { question: 'Can I change my shipping address after placing an order?', answer: 'You can change your shipping address within 2 hours of placing your order. After that, please contact our support team for assistance.' },
            { question: 'Do you ship internationally?', answer: 'Yes, we ship to over 190 countries worldwide. International shipping rates and delivery times vary by destination.' },
        ],
    },
    {
        id: 'payments',
        name: 'Payments & Billing',
        icon: CreditCard,
        faqs: [
            { question: 'What payment methods do you accept?', answer: 'We accept Visa, Mastercard, American Express, PayPal, and Cash on Delivery (in select regions). All transactions are secured with SSL encryption.' },
            { question: 'When will I be charged?', answer: 'Your payment is processed immediately when you place your order. For Cash on Delivery orders, you pay when your package arrives.' },
            { question: 'Is my payment information secure?', answer: 'Yes, we use industry-standard SSL encryption and never store your complete credit card information on our servers.' },
            { question: 'Can I get an invoice for my order?', answer: 'Yes, invoices are automatically sent to your email after purchase. You can also download invoices from your order history.' },
        ],
    },
    {
        id: 'returns',
        name: 'Returns & Refunds',
        icon: RotateCcw,
        faqs: [
            { question: 'What is your return policy?', answer: 'We offer a 30-day return policy for most items. Products must be unused and in original packaging. Some items like customized products may not be eligible for return.' },
            { question: 'How do I initiate a return?', answer: 'Go to "My Orders", select the order, and click "Request Return". You\'ll receive a prepaid shipping label within 24 hours.' },
            { question: 'How long do refunds take?', answer: 'Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will appear on your original payment method.' },
            { question: 'Can I exchange an item?', answer: 'Yes, exchanges are available for different sizes or colors. Simply initiate a return and place a new order for the desired item.' },
        ],
    },
    {
        id: 'account',
        name: 'Account & Security',
        icon: User,
        faqs: [
            { question: 'How do I create an account?', answer: 'Click "Sign Up" on our homepage and fill in your details. You can also sign up using your Google or Facebook account for faster registration.' },
            { question: 'I forgot my password. What do I do?', answer: 'Click "Forgot Password" on the login page and enter your email. We\'ll send you a link to reset your password.' },
            { question: 'How can I update my account information?', answer: 'Log in to your account and go to "Profile Settings" to update your personal information, addresses, and preferences.' },
            { question: 'Is my personal information safe?', answer: 'We take data privacy seriously. Your personal information is encrypted and never shared with third parties without your consent.' },
        ],
    },
];

export default function FAQPage() {
    const [selectedCategory, setSelectedCategory] = useState('orders');
    const [openItems, setOpenItems] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleItem = (question: string) => {
        setOpenItems(prev =>
            prev.includes(question)
                ? prev.filter(q => q !== question)
                : [...prev, question]
        );
    };

    const currentCategory = faqCategories.find(c => c.id === selectedCategory);

    // Filter FAQs by search
    const filteredFAQs = searchQuery
        ? faqCategories.flatMap(cat =>
            cat.faqs.filter(faq =>
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
            ).map(faq => ({ ...faq, category: cat.name }))
        )
        : null;

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main>
                {/* Hero */}
                <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 lg:py-20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }} />
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <nav className="flex items-center gap-2 text-sm text-blue-200 mb-6">
                            <Link href="/" className="hover:text-white">Home</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white">Help Center</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">How can we help?</h1>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                            Find answers to common questions or contact our support team.
                        </p>

                        {/* Search */}
                        <div className="max-w-xl">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for answers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 outline-none focus:ring-4 focus:ring-blue-400/30"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Search Results */}
                {filteredFAQs && (
                    <section className="py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-gray-600 mb-4">
                            {filteredFAQs.length} results for "{searchQuery}"
                        </p>
                        <div className="space-y-3">
                            {filteredFAQs.map((faq, idx) => (
                                <div key={idx} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                                    <button
                                        onClick={() => toggleItem(faq.question)}
                                        className="w-full p-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <div>
                                            <span className="text-xs text-blue-600 font-medium">{faq.category}</span>
                                            <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                                        </div>
                                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openItems.includes(faq.question) ? 'rotate-180' : ''}`} />
                                    </button>
                                    {openItems.includes(faq.question) && (
                                        <div className="px-5 pb-5 text-gray-600">{faq.answer}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="mt-4 text-blue-600 font-medium hover:underline"
                        >
                            Clear search
                        </button>
                    </section>
                )}

                {/* FAQ Categories & Content */}
                {!filteredFAQs && (
                    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Sidebar */}
                            <aside className="lg:w-64 flex-shrink-0">
                                <div className="bg-white rounded-xl border border-gray-100 p-4 sticky top-24">
                                    <h3 className="font-semibold text-gray-900 mb-3 px-2">Categories</h3>
                                    <nav className="space-y-1">
                                        {faqCategories.map((cat) => (
                                            <button
                                                key={cat.id}
                                                onClick={() => setSelectedCategory(cat.id)}
                                                className={`
                                                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all
                                                    ${selectedCategory === cat.id
                                                        ? 'bg-blue-50 text-blue-600'
                                                        : 'text-gray-600 hover:bg-gray-50'
                                                    }
                                                `}
                                            >
                                                <cat.icon className="w-5 h-5" />
                                                <span className="font-medium">{cat.name}</span>
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </aside>

                            {/* FAQ List */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-6">
                                    {currentCategory && <currentCategory.icon className="w-6 h-6 text-blue-600" />}
                                    <h2 className="text-2xl font-bold text-gray-900">{currentCategory?.name}</h2>
                                </div>
                                <div className="space-y-3">
                                    {currentCategory?.faqs.map((faq, idx) => (
                                        <div key={idx} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                                            <button
                                                onClick={() => toggleItem(faq.question)}
                                                className="w-full p-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                            >
                                                <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                                                <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openItems.includes(faq.question) ? 'rotate-180' : ''}`} />
                                            </button>
                                            {openItems.includes(faq.question) && (
                                                <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Contact CTA */}
                <section className="py-12 bg-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Still have questions?</h2>
                        <p className="text-gray-600 mb-6">Can't find what you're looking for? Our support team is here to help.</p>
                        <Link href="/contact">
                            <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                                <MessageSquare className="w-5 h-5" />
                                Contact Support
                            </button>
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
