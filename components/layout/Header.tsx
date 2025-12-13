"use client";

import Link from 'next/link';
import { User, ShoppingCart, Menu, Heart, MessageSquare, Search, X, ChevronDown } from 'lucide-react';
import Navbar from './Navbar';
import MobileMenu from './MobileMenu';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const { cart } = useCart();
    const { itemCount: wishlistCount } = useWishlist();
    const { isAuthenticated, user } = useAuth();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className={`
                bg-white sticky top-0 z-40
                transition-all duration-300
                ${isScrolled ? 'shadow-lg' : 'shadow-sm'}
            `}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Main Header Row */}
                    <div className="flex items-center justify-between h-16 md:h-20 gap-4 lg:gap-8">

                        {/* Left Section: Mobile Menu Trigger + Brand */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <button
                                className="md:hidden p-2 -ml-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                                onClick={() => setIsMobileMenuOpen(true)}
                                aria-label="Open menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow duration-300">
                                    <span className="text-white font-bold text-lg">G</span>
                                </div>
                                <span className="hidden sm:block text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                    Ghar Bazaar
                                </span>
                            </Link>
                        </div>

                        {/* Center Section: Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-2xl">
                            <div className={`
                                flex w-full items-center
                                bg-gray-50 rounded-xl
                                border-2 transition-all duration-300
                                ${isSearchFocused
                                    ? 'border-blue-500 bg-white shadow-lg shadow-blue-500/10'
                                    : 'border-gray-200 hover:border-gray-300'
                                }
                            `}>
                                {/* Category Dropdown */}
                                <div className="relative group">
                                    <button className="px-4 py-3 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 whitespace-nowrap transition-colors border-r border-gray-200">
                                        <span>All Categories</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </button>

                                    {/* Dropdown Menu - Show on hover */}
                                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        {['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Automotive'].map((cat) => (
                                            <Link
                                                key={cat}
                                                href={`/categories/${cat.toLowerCase().replace(/ & /g, '-')}`}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            >
                                                {cat}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Search Input */}
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Search for products, suppliers, or categories..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => setIsSearchFocused(true)}
                                        onBlur={() => setIsSearchFocused(false)}
                                        className="w-full px-4 py-3 outline-none text-sm text-gray-700 bg-transparent placeholder:text-gray-400"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                {/* Search Button */}
                                <Link href={`/search?q=${encodeURIComponent(searchQuery)}`}>
                                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 rounded-r-xl">
                                        <Search className="w-5 h-5" />
                                        <span className="hidden lg:inline">Search</span>
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Section: Actions */}
                        <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
                            {/* Profile */}
                            <Link
                                href={isAuthenticated ? "/profile" : "/login"}
                                className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 cursor-pointer group"
                            >
                                <div className="relative">
                                    <User className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
                                    {isAuthenticated && (
                                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full" />
                                    )}
                                </div>
                                <span className="hidden lg:block text-xs mt-1 font-medium">
                                    {isAuthenticated ? user?.firstName : 'Profile'}
                                </span>
                            </Link>

                            {/* Messages - Hidden on mobile */}
                            <div className="hidden md:flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 cursor-pointer group">
                                <div className="relative">
                                    <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                        3
                                    </span>
                                </div>
                                <span className="hidden lg:block text-xs mt-1 font-medium">Messages</span>
                            </div>

                            {/* Wishlist - Hidden on mobile */}
                            <Link href="/wishlist" className="hidden md:flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 cursor-pointer group">
                                <div className="relative">
                                    <Heart className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
                                    {wishlistCount > 0 && (
                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                            {wishlistCount > 99 ? '99+' : wishlistCount}
                                        </span>
                                    )}
                                </div>
                                <span className="hidden lg:block text-xs mt-1 font-medium">Wishlist</span>
                            </Link>

                            {/* Cart */}
                            <Link href="/cart" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 cursor-pointer group">
                                <div className="relative">
                                    <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
                                        {cart.itemCount > 99 ? '99+' : cart.itemCount}
                                    </span>
                                </div>
                                <span className="hidden lg:block text-xs mt-1 font-medium">Cart</span>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Search Bar */}
                    <div className="md:hidden pb-3">
                        <div className="flex items-center bg-gray-100 rounded-xl border-2 border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all duration-200">
                            <Search className="w-5 h-5 text-gray-400 ml-3" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="flex-1 px-3 py-2.5 outline-none text-sm bg-transparent"
                            />
                        </div>
                    </div>

                    {/* Desktop Navbar */}
                    <div className="hidden md:block border-t border-gray-100">
                        <Navbar />
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
};

export default Header;
