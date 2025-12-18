import { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, TrendingUp, ShieldCheck, Globe, Star, ArrowRight, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'Ghar Bazaar for Business | B2B Solutions',
    description: 'Grow your business with Ghar Bazaar. Connect with global buyers and scale your operations with our professional tools.',
};

export default function BusinessPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main>
                {/* Hero section */}
                <section className="bg-slate-900 text-white py-20 lg:py-32 relative overflow-hidden">
                    <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-900 to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=800&fit=crop"
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                        alt="Modern office"
                    />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                        <div className="max-w-3xl">
                            <span className="inline-block px-4 py-1 bg-blue-500 rounded-full text-sm font-bold mb-6">B2B SOLUTIONS</span>
                            <h1 className="text-4xl lg:text-6xl font-extrabold mb-8 leading-tight">
                                Scale Your Business Globally with Ghar Bazaar
                            </h1>
                            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                                Join over 500,000 suppliers reached millions of active buyers worldwide. Access powerful trade tools, verified leads, and secure cross-border payments.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/register?type=supplier">
                                    <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25">
                                        Start Selling Now
                                    </button>
                                </Link>
                                <Link href="/contact">
                                    <button className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                                        Talk to an Expert
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Businesses Choose Ghar Bazaar</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto italic">Powering global commerce with industry-leading tools and support</p>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Global Exposure', desc: 'Showcase your products to buyers in 190+ countries and regions.', icon: Globe },
                            { title: 'Verified Trust', desc: 'Build credibility with our Supplier Verification program.', icon: ShieldCheck },
                            { title: 'Market Insights', desc: 'Access real-time data on trending products and buyer behavior.', icon: TrendingUp },
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                                    <feature.icon className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Benefits List */}
                <section className="py-24 bg-white border-y border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Comprehensive Tools for Growth</h2>
                            <div className="space-y-6">
                                {[
                                    'Intelligent RFQ (Request for Quote) system',
                                    'Secure online payment and Escrow services',
                                    'End-to-end logistics and warehousing support',
                                    'Personalized account management',
                                    'Advanced SEO and digital marketing tools',
                                    'Multi-language translation services'
                                ].map((benefit, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                                            <CheckCircle className="w-4 h-4" />
                                        </div>
                                        <p className="text-gray-700 font-medium">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
                            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop" className="rounded-2xl shadow-lg mt-8" alt="Business meeting" />
                            <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=600&fit=crop" className="rounded-2xl shadow-lg" alt="Team work" />
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-bold mb-8">Ready to grow your business?</h2>
                        <p className="text-xl text-blue-100 mb-10">Join thousands of successful suppliers on Ghar Bazaar today.</p>
                        <Link href="/register?type=supplier">
                            <button className="px-10 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center gap-3 mx-auto shadow-xl">
                                Become a Seller
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
