"use client";

import { Flame, Clock, Zap, ArrowRight, ChevronRight, Percent } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shared/ProductCard';
import { products } from '@/data/products';

export default function HotOffersPage() {
    // Filter products on sale or with original price
    const salesProducts = products.filter(p => p.originalPrice || p.isOnSale).slice(0, 12);

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main>
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-orange-500 to-rose-600 text-white py-12 lg:py-20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-x-0 top-0 h-full" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                            backgroundSize: '24px 24px'
                        }} />
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold mb-6">
                            <Flame className="w-5 h-5 text-orange-200 fill-current" />
                            <span>LIMITED TIME DEALS</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-black mb-8 tracking-tight">Summer Mega Sale is Here!</h1>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                            Up to <span className="text-3xl font-bold bg-white text-orange-600 px-3 py-1 rounded-xl mx-2 shadow-xl">70% OFF</span> on thousands of premium products from verified global suppliers.
                        </p>
                        <div className="flex justify-center gap-4">
                            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 min-w-[100px] border border-white/20">
                                <div className="text-3xl font-bold">12</div>
                                <div className="text-xs font-medium opacity-80 uppercase tracking-widest">Hours</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 min-w-[100px] border border-white/20">
                                <div className="text-3xl font-bold">45</div>
                                <div className="text-xs font-medium opacity-80 uppercase tracking-widest">Mins</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 min-w-[100px] border border-white/20">
                                <div className="text-3xl font-bold">08</div>
                                <div className="text-xs font-medium opacity-80 uppercase tracking-widest">Secs</div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-blue-600">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-gray-900 font-medium">Hot Offers</span>
                    </nav>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {salesProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                originalPrice={product.originalPrice}
                                image={product.thumbnail}
                                rating={product.rating}
                                reviews={product.reviewCount}
                                badge={`${Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% OFF`}
                                badgeColor="red"
                            />
                        ))}
                    </div>

                    <div className="mt-16 bg-white rounded-3xl p-8 lg:p-12 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Don't miss a single deal!</h2>
                            <p className="text-gray-600 text-lg">Subscribe to our daily deals alert and get fresh offers directly in your inbox.</p>
                        </div>
                        <div className="flex w-full md:w-auto gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 md:w-80 px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 transition-colors"
                            />
                            <button className="px-8 py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/25">
                                Notify Me
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
