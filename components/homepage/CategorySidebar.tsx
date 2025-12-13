"use client";

import { ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

const CategorySidebar = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const categories = [
        { name: 'Automobiles', icon: '🚗', count: '2.4k' },
        { name: 'Clothes & Wear', icon: '👔', count: '5.1k' },
        { name: 'Home Interiors', icon: '🏠', count: '3.2k' },
        { name: 'Computer & Tech', icon: '💻', count: '4.8k' },
        { name: 'Tools & Equipment', icon: '🔧', count: '1.9k' },
        { name: 'Sports & Outdoor', icon: '⚽', count: '2.7k' },
        { name: 'Animals & Pets', icon: '🐕', count: '1.2k' },
        { name: 'Machinery', icon: '⚙️', count: '890' },
        { name: 'More Categories', icon: '📦', count: '10k+', isMore: true },
    ];

    return (
        <div className="w-56 lg:w-64 hidden md:block flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-semibold text-sm">Categories</span>
                    </div>
                </div>

                {/* Categories List */}
                <div className="py-1">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            className={`
                                flex items-center justify-between px-4 py-2.5
                                cursor-pointer transition-all duration-200
                                ${hoveredIndex === idx ? 'bg-blue-50' : 'hover:bg-gray-50'}
                                ${cat.isMore ? 'border-t border-gray-100 mt-1' : ''}
                            `}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg">{cat.icon}</span>
                                <span className={`
                                    text-sm transition-colors duration-200
                                    ${hoveredIndex === idx ? 'text-blue-600 font-medium' : 'text-gray-700'}
                                    ${cat.isMore ? 'text-blue-600 font-medium' : ''}
                                `}>
                                    {cat.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">{cat.count}</span>
                                <ChevronRight className={`
                                    w-4 h-4 transition-all duration-200
                                    ${hoveredIndex === idx ? 'text-blue-600 translate-x-0.5' : 'text-gray-300'}
                                `} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategorySidebar;
