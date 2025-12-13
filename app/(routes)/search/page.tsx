"use client";

import { useState } from 'react';
import { Search, SlidersHorizontal, Grid3X3, List, Star, ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shared/ProductCard';
import { products, searchProducts, filterProducts } from '@/data/products';

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('relevance');
    const [filters, setFilters] = useState({
        categories: [] as string[],
        priceRange: '',
        minRating: 0,
    });

    const query = searchParams.q || '';

    // Search and filter products
    let filteredProducts = query ? searchProducts(query) : products;

    // Apply filters
    if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        filteredProducts = filteredProducts.filter(p => {
            if (max) return p.price >= min && p.price <= max;
            return p.price >= min;
        });
    }
    if (filters.minRating > 0) {
        filteredProducts = filteredProducts.filter(p => p.rating >= filters.minRating);
    }

    // Apply sorting
    switch (sortBy) {
        case 'price-low':
            filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredProducts = [...filteredProducts].sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            break;
    }

    const categories = ['Electronics', 'Audio', 'Computers', 'Fashion', 'Home & Garden'];
    const priceRanges = [
        { label: 'Under $25', value: '0-25' },
        { label: '$25 - $50', value: '25-50' },
        { label: '$50 - $100', value: '50-100' },
        { label: '$100 - $200', value: '100-200' },
        { label: 'Over $200', value: '200-' },
    ];

    const clearFilters = () => {
        setFilters({ categories: [], priceRange: '', minRating: 0 });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Search Header */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {query ? `Results for "${query}"` : 'All Products'}
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Found <span className="font-semibold text-gray-700">{filteredProducts.length}</span> products
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Sort By */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none pl-4 pr-10 py-2.5 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-medium text-gray-700 cursor-pointer hover:border-gray-200 transition-colors"
                                >
                                    <option value="relevance">Most Relevant</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Best Rating</option>
                                    <option value="newest">Newest First</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>

                            {/* View Mode */}
                            <div className="flex items-center bg-gray-100 rounded-xl p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    <Grid3X3 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Filter Toggle (Mobile) */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium"
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6">
                    {/* Sidebar Filters */}
                    <aside className={`
                        w-64 flex-shrink-0 
                        ${showFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-auto lg:relative lg:bg-transparent lg:p-0' : 'hidden lg:block'}
                    `}>
                        {showFilters && (
                            <button
                                onClick={() => setShowFilters(false)}
                                className="lg:hidden absolute top-4 right-4 p-2 text-gray-500"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        )}

                        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-6">
                            {/* Categories */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={filters.categories.includes(cat)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setFilters({ ...filters, categories: [...filters.categories, cat] });
                                                    } else {
                                                        setFilters({ ...filters, categories: filters.categories.filter(c => c !== cat) });
                                                    }
                                                }}
                                                className="w-4 h-4 rounded border-gray-300 text-blue-600"
                                            />
                                            <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                                <div className="space-y-2">
                                    {priceRanges.map((range) => (
                                        <label key={range.value} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="price"
                                                checked={filters.priceRange === range.value}
                                                onChange={() => setFilters({ ...filters, priceRange: range.value })}
                                                className="w-4 h-4 border-gray-300 text-blue-600"
                                            />
                                            <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{range.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Rating */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Rating</h3>
                                <div className="space-y-2">
                                    {[4, 3, 2, 1].map((rating) => (
                                        <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={filters.minRating === rating}
                                                onChange={(e) => setFilters({ ...filters, minRating: e.target.checked ? rating : 0 })}
                                                className="w-4 h-4 rounded border-gray-300 text-blue-600"
                                            />
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                                                    />
                                                ))}
                                                <span className="text-gray-500 text-sm ml-1">& Up</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Clear Filters */}
                            <button
                                onClick={clearFilters}
                                className="w-full py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className={`
                                grid gap-4
                                ${viewMode === 'grid'
                                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                    : 'grid-cols-1'
                                }
                            `}>
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        price={product.price}
                                        originalPrice={product.originalPrice}
                                        image={product.thumbnail}
                                        rating={product.rating}
                                        reviews={product.reviewCount}
                                        variant={viewMode === 'list' ? 'horizontal' : 'compact'}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {filteredProducts.length > 0 && (
                            <div className="flex items-center justify-center gap-2 mt-8">
                                <button className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium">Previous</button>
                                {[1, 2, 3].map((page, idx) => (
                                    <button
                                        key={idx}
                                        className={`
                                            w-10 h-10 rounded-xl font-medium transition-all
                                            ${page === 1
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }
                                        `}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">Next</button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
