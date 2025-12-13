"use client";

import Link from 'next/link';
import { ChevronDown, Menu, Sparkles, Flame, Gift, Briefcase, HelpCircle, Truck } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const navItems = [
        {
            label: 'All Categories',
            href: '/categories',
            icon: Menu,
            hasDropdown: true,
            dropdownItems: [
                { label: 'Electronics', href: '/categories/electronics' },
                { label: 'Fashion', href: '/categories/fashion' },
                { label: 'Home & Garden', href: '/categories/home-garden' },
                { label: 'Sports & Outdoor', href: '/categories/sports' },
                { label: 'Automotive', href: '/categories/automotive' },
                { label: 'Beauty & Health', href: '/categories/beauty-health' },
            ]
        },
        { label: 'Hot Offers', href: '/hot-offers', icon: Flame, highlight: true },
        { label: 'New Arrivals', href: '/new-arrivals', icon: Sparkles },
        { label: 'Gift Ideas', href: '/gifts', icon: Gift },
        { label: 'For Business', href: '/business', icon: Briefcase },
        { label: 'Shipping', href: '/shipping', icon: Truck },
        {
            label: 'Help',
            href: '/help',
            icon: HelpCircle,
            hasDropdown: true,
            dropdownItems: [
                { label: 'Help Center', href: '/help' },
                { label: 'FAQs', href: '/help/faq' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Track Order', href: '/track-order' },
            ]
        },
    ];

    return (
        <nav className="py-3">
            <div className="flex items-center gap-1">
                {navItems.map((item) => (
                    <div
                        key={item.label}
                        className="relative"
                        onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <Link
                            href={item.href}
                            className={`
                                flex items-center gap-2 px-3 py-2 rounded-lg
                                text-sm font-medium transition-all duration-200
                                ${item.highlight
                                    ? 'text-orange-600 hover:bg-orange-50'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                }
                            `}
                        >
                            {item.icon && (
                                <item.icon className={`w-4 h-4 ${item.highlight ? 'text-orange-500' : ''}`} />
                            )}
                            <span>{item.label}</span>
                            {item.hasDropdown && (
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                            )}
                            {item.highlight && (
                                <span className="ml-1 px-1.5 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold rounded uppercase">
                                    Hot
                                </span>
                            )}
                        </Link>

                        {/* Dropdown Menu */}
                        {item.hasDropdown && item.dropdownItems && (
                            <div className={`
                                absolute top-full left-0 mt-1 w-52
                                bg-white rounded-xl shadow-xl border border-gray-100
                                py-2 z-50
                                transition-all duration-200
                                ${activeDropdown === item.label
                                    ? 'opacity-100 visible translate-y-0'
                                    : 'opacity-0 invisible -translate-y-2'
                                }
                            `}>
                                {item.dropdownItems.map((dropdownItem) => (
                                    <Link
                                        key={dropdownItem.label}
                                        href={dropdownItem.href}
                                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    >
                                        {dropdownItem.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
