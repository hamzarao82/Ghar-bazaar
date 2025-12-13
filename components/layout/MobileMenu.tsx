"use client";

import { X, User, ShoppingCart, Heart, Home, Grid, Settings, HelpCircle, LogIn, UserPlus, ChevronRight, Phone, Mail, Globe } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const menuItems = [
        { icon: Home, label: 'Home', href: '/' },
        { icon: Grid, label: 'All Categories', href: '/categories' },
        { icon: Heart, label: 'Wishlist', href: '/wishlist', badge: '5' },
        { icon: ShoppingCart, label: 'My Cart', href: '/cart', badge: '12' },
        { icon: User, label: 'My Orders', href: '/orders' },
    ];

    const categories = [
        'Electronics', 'Fashion', 'Home & Garden', 'Sports & Outdoor',
        'Automotive', 'Beauty & Health', 'Toys & Games', 'Office Supplies'
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                className={`
                    fixed inset-0 bg-black/60 backdrop-blur-sm z-50 
                    transition-opacity duration-300 md:hidden
                    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
                onClick={onClose}
            />

            {/* Slide-out Menu */}
            <div className={`
                fixed inset-y-0 left-0 w-[300px] sm:w-[320px] bg-white z-50 
                transform transition-transform duration-300 ease-out md:hidden 
                flex flex-col shadow-2xl
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 relative overflow-hidden">
                    {/* Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                            backgroundSize: '20px 20px'
                        }} />
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-4 relative">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                            <User className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <p className="text-white/80 text-sm">Welcome to</p>
                            <p className="text-white font-bold text-lg">Ghar Bazaar</p>
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex gap-2 mt-4 relative">
                        <Link
                            href="/login"
                            onClick={onClose}
                            className="flex-1 py-2 px-4 bg-white text-blue-600 text-sm font-semibold rounded-xl text-center hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                        >
                            <LogIn className="w-4 h-4" />
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            onClick={onClose}
                            className="flex-1 py-2 px-4 bg-white/20 text-white text-sm font-semibold rounded-xl text-center hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
                        >
                            <UserPlus className="w-4 h-4" />
                            Register
                        </Link>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto">
                    {/* Main Navigation */}
                    <div className="py-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center justify-between px-5 py-3.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                onClick={onClose}
                            >
                                <div className="flex items-center gap-4">
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </div>
                                {item.badge && (
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-bold rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-100 mx-5" />

                    {/* Categories Section */}
                    <div className="py-4">
                        <p className="px-5 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Popular Categories
                        </p>
                        {categories.map((cat) => (
                            <Link
                                key={cat}
                                href={`/categories/${cat.toLowerCase().replace(/ & /g, '-')}`}
                                className="flex items-center justify-between px-5 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                onClick={onClose}
                            >
                                <span className="text-sm">{cat}</span>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </Link>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-100 mx-5" />

                    {/* More Options */}
                    <div className="py-4">
                        <p className="px-5 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            More
                        </p>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-5 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                            onClick={onClose}
                        >
                            <Globe className="w-5 h-5" />
                            <span className="text-sm">English / USD</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-5 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                            onClick={onClose}
                        >
                            <HelpCircle className="w-5 h-5" />
                            <span className="text-sm">Help Center</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-5 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                            onClick={onClose}
                        >
                            <Settings className="w-5 h-5" />
                            <span className="text-sm">Settings</span>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                    <div className="flex items-center justify-center gap-6 text-gray-500 text-sm">
                        <a href="tel:+1234567890" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            <Phone className="w-4 h-4" />
                            <span>Call</span>
                        </a>
                        <a href="mailto:support@gharbazaar.com" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            <Mail className="w-4 h-4" />
                            <span>Email</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;
