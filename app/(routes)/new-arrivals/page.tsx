"use client";

import { Sparkles, ArrowRight, ChevronRight, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shared/ProductCard';
import { products } from '@/data/products';

export default function NewArrivalsPage() {
    // Show newest products
    const newProducts = [...products]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 12);

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main>
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-indigo-700 to-blue-800 text-white py-16 lg:py-24 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-x-0 bottom-0 h-full" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                            backgroundSize: '32px 32px'
                        }} />
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold mb-6">
                            <Sparkles className="w-5 h-5 text-indigo-200 fill-current" />
                            <span>FRESH IN STOCK</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">Discover the Future of Trade</h1>
                        <p className="text-xl text-indigo-100 max-w-2xl mb-10 leading-relaxed font-medium">
                            Explore the latest products from top-tier global suppliers. Be the first to bring trending items to your market.
                        </p>
                        <div className="flex gap-12">
                            <div>
                                <div className="text-3xl font-bold">500+</div>
                                <div className="text-sm text-indigo-200 uppercase tracking-widest font-bold">New Daily</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">12k+</div>
                                <div className="text-sm text-indigo-200 uppercase tracking-widest font-bold">Total New</div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-blue-600">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-gray-900 font-medium">New Arrivals</span>
                    </nav>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {newProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                originalPrice={product.originalPrice}
                                image={product.thumbnail}
                                rating={product.rating}
                                reviews={product.reviewCount}
                                badge="New"
                                badgeColor="blue"
                            />
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link href="/search?sortBy=newest">
                            <button className="px-10 py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-xl hover:bg-gray-50 hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm">
                                View All New Arrivals
                            </button>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
