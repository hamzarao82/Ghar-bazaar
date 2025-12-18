import { Metadata } from 'next';
import Link from 'next/link';
import { Search, HelpCircle, MessageSquare, Phone, Mail, FileText, ChevronRight, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'Help Center | Ghar-Bazaar',
    description: 'Get support, browse FAQs, and learn how to use Ghar-Bazaar to grow your business.',
};

export default function HelpPage() {
    const categories = [
        { title: 'Getting Started', desc: 'New to Ghar Bazaar? Learn the basics of buying and selling.', icon: HelpCircle, link: '/help/basics' },
        { title: 'Payment & Finance', desc: 'Secure payment methods, invoicing, and trade finance.', icon: FileText, link: '/help/payment' },
        { title: 'Shipping & Logistics', desc: 'Tracking orders, shipping methods, and customs info.', icon: MessageSquare, link: '/shipping' },
        { title: 'Returns & Refunds', desc: 'Our policy on returns and how to request a refund.', icon: HelpCircle, link: '/help/refunds' },
        { title: 'Account Security', desc: 'Managing your profile and keeping your account safe.', icon: HelpCircle, link: '/profile' },
        { title: 'Selling on Ghar Bazaar', desc: 'Guides for suppliers to maximize their sales and reach.', icon: ArrowRight, link: '/business' },
    ];

    const faqs = [
        { q: 'How do I start buying on Ghar Bazaar?', a: 'To start buying, simply create a free account, browse products, and contact suppliers to request quotes or buy instantly.' },
        { q: 'Is my payment secure?', a: 'Yes, we use industry-standard encryption and our Trade Assurance program to ensure your payments are safe until your order is delivered.' },
        { q: 'Can I track my order international shipments?', a: 'Yes, all orders include a tracking number that you can use on our Track Order page to see real-time updates.' },
        { q: 'How do I contact a supplier?', a: 'You can use the "Chat Now" or "Send Inquiry" buttons on any product page to message a supplier directly.' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main>
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white py-16 lg:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl lg:text-5xl font-bold mb-8">How can we help you today?</h1>
                        <div className="max-w-2xl mx-auto relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search help articles..."
                                className="w-full pl-14 pr-6 py-5 rounded-2xl text-gray-900 shadow-xl focus:ring-4 focus:ring-blue-500/20 outline-none"
                            />
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-10">
                    {/* Support Cards */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: 'Contact Support', icon: MessageSquare, desc: 'Chat with our support team 24/7', color: 'bg-emerald-500' },
                            { title: 'Phone Support', icon: Phone, desc: 'Call us: +1 (800) 123-4567', color: 'bg-blue-500' },
                            { title: 'Email Us', icon: Mail, desc: 'support@gharbazaar.com', color: 'bg-amber-500' },
                        ].map((card, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex items-center gap-5">
                                <div className={`w-12 h-12 ${card.color} text-white rounded-xl flex items-center justify-center shrink-0`}>
                                    <card.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{card.title}</h3>
                                    <p className="text-sm text-gray-500">{card.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="py-20 grid lg:grid-cols-3 gap-12">
                        {/* Help Categories */}
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse Categories</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {categories.map((cat, idx) => (
                                    <Link key={idx} href={cat.link} className="group p-6 bg-white border border-gray-100 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all">
                                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <cat.icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-2">{cat.title}</h3>
                                        <p className="text-sm text-gray-500">{cat.desc}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Top FAQs */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Top FAQs</h2>
                            <div className="space-y-6">
                                {faqs.map((faq, idx) => (
                                    <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100">
                                        <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
                                        <p className="text-sm text-gray-600">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                            <Link href="/faq" className="mt-8 inline-flex items-center gap-2 text-blue-600 font-bold hover:underline">
                                View all FAQs
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
