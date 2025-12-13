"use client";

import { Heart, ShoppingCart, Trash2, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export default function WishlistPage() {
    const { items, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToCart, isInCart } = useCart();

    const handleAddToCart = (item: typeof items[0]) => {
        addToCart(item.product, 1);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Topbar />
                <Header />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-6 bg-rose-50 rounded-full flex items-center justify-center">
                            <Heart className="w-12 h-12 text-rose-300" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-3">Your wishlist is empty</h1>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Save items you love by clicking the heart icon on any product. They'll appear here for easy access!
                        </p>
                        <Link href="/">
                            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/25">
                                Explore Products
                            </button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-medium">My Wishlist</span>
                </nav>

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                        My Wishlist ({items.length} {items.length === 1 ? 'item' : 'items'})
                    </h1>
                    <button
                        onClick={clearWishlist}
                        className="text-sm text-gray-500 hover:text-rose-500 transition-colors"
                    >
                        Clear all
                    </button>
                </div>

                {/* Wishlist Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {items.map((item) => {
                        const discount = item.product.originalPrice
                            ? Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)
                            : 0;
                        const inCart = isInCart(item.productId);

                        return (
                            <div key={item.id} className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                                {/* Image */}
                                <div className="relative aspect-square overflow-hidden bg-gray-100">
                                    <Link href={`/product/${item.productId}`}>
                                        <img
                                            src={item.product.thumbnail}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </Link>

                                    {/* Discount Badge */}
                                    {discount > 0 && (
                                        <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-bold rounded-lg shadow">
                                            -{discount}%
                                        </div>
                                    )}

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromWishlist(item.productId)}
                                        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 shadow-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mb-2">
                                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                        <span className="text-sm font-medium text-gray-700">{item.product.rating}</span>
                                        <span className="text-xs text-gray-400">({item.product.reviewCount})</span>
                                    </div>

                                    {/* Name */}
                                    <Link href={`/product/${item.productId}`}>
                                        <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                                            {item.product.name}
                                        </h3>
                                    </Link>

                                    {/* Price */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-lg font-bold text-blue-600">${item.product.price}</span>
                                        {item.product.originalPrice && (
                                            <span className="text-sm text-gray-400 line-through">${item.product.originalPrice}</span>
                                        )}
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        disabled={inCart}
                                        className={`
                                            w-full py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all
                                            ${inCart
                                                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25'
                                            }
                                        `}
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        {inCart ? 'In Cart' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            <Footer />
        </div>
    );
}
