"use client";

import { useState } from 'react';
import { ChevronRight, Grid3X3, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shared/ProductCard';
import { products, getProductsByCategory } from '@/data/products';
import { getCategoryBySlug, categories } from '@/data/categories';

export default function CategoryPage({ params }: { params: { slug: string } }) {
    const category = getCategoryBySlug(params.slug);
    const categoryName = category?.name || params.slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Get products for this category
    const categoryProducts = getProductsByCategory(params.slug);
    const featuredProducts = categoryProducts.filter(p => p.isFeatured).slice(0, 4);
    const allProducts = categoryProducts.length > 0 ? categoryProducts : products.slice(0, 8);

    // Subcategories
    const subcategories = category?.subcategories || [
        { name: 'Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop', productCount: 1245, slug: 'headphones' },
        { name: 'Smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop', productCount: 892, slug: 'smartphones' },
        { name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop', productCount: 567, slug: 'laptops' },
        { name: 'Cameras', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop', productCount: 423, slug: 'cameras' },
        { name: 'Smart Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop', productCount: 756, slug: 'smart-watches' },
        { name: 'Accessories', image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=200&h=200&fit=crop', productCount: 2103, slug: 'accessories' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/categories" className="hover:text-blue-600">Categories</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-medium">{categoryName}</span>
                </nav>

                {/* Category Header */}
                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-8 lg:p-12 mb-8 relative overflow-hidden">
                    {/* Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                            backgroundSize: '32px 32px'
                        }} />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <Grid3X3 className="w-6 h-6 text-white" />
                            <span className="text-white/80 text-sm font-medium">Category</span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">{categoryName}</h1>
                        <p className="text-blue-100 max-w-xl">
                            {category?.description || 'Discover the latest products from verified suppliers. Quality guaranteed with buyer protection.'}
                        </p>
                    </div>
                </div>

                {/* Subcategories */}
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Browse Subcategories</h2>
                        <Link href={`/search?category=${params.slug}`} className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:text-blue-700">
                            View All
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {subcategories.slice(0, 6).map((subcat, idx) => (
                            <Link key={idx} href={`/search?category=${(subcat.slug || subcat.name).toLowerCase()}`}>
                                <div className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-lg hover:border-blue-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3">
                                        <img
                                            src={subcat.image}
                                            alt={subcat.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <h3 className="font-medium text-gray-900 text-center group-hover:text-blue-600 transition-colors">
                                        {subcat.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 text-center mt-1">{subcat.productCount?.toLocaleString()} products</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Featured Products */}
                {featuredProducts.length > 0 && (
                    <section className="mb-10">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
                                <p className="text-sm text-gray-500 mt-1">Top picks from this category</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {featuredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    originalPrice={product.originalPrice}
                                    image={product.thumbnail}
                                    rating={product.rating}
                                    reviews={product.reviewCount}
                                    badge="Featured"
                                    badgeColor="blue"
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* All Products */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">All Products</h2>
                            <p className="text-sm text-gray-500 mt-1">Showing {allProducts.length} products</p>
                        </div>
                        <Link href={`/search?category=${params.slug}`} className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:text-blue-700">
                            View All
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {allProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                originalPrice={product.originalPrice}
                                image={product.thumbnail}
                                rating={product.rating}
                                reviews={product.reviewCount}
                                variant="compact"
                            />
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="flex justify-center mt-8">
                        <Link href={`/search?category=${params.slug}`}>
                            <button className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all">
                                Load More Products
                            </button>
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
