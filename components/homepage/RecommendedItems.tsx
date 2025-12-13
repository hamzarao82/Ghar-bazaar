"use client";

import { Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef } from 'react';

const RecommendedItems = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [favorites, setFavorites] = useState<number[]>([]);

    const items = [
        {
            id: 1,
            name: 'Premium T-Shirt',
            price: 29.99,
            originalPrice: 49.99,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
            rating: 4.5,
            reviews: 128
        },
        {
            id: 2,
            name: 'Travel Backpack',
            price: 59.99,
            originalPrice: 89.99,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
            rating: 4.8,
            reviews: 256
        },
        {
            id: 3,
            name: 'Smart Watch Elite',
            price: 199.99,
            originalPrice: 299.99,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
            rating: 4.7,
            reviews: 512
        },
        {
            id: 4,
            name: 'Wireless Earbuds',
            price: 79.99,
            originalPrice: 129.99,
            image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
            rating: 4.6,
            reviews: 384
        },
        {
            id: 5,
            name: 'Leather Wallet',
            price: 45.99,
            originalPrice: 69.99,
            image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=300&fit=crop',
            rating: 4.4,
            reviews: 96
        },
        {
            id: 6,
            name: 'Sunglasses Pro',
            price: 89.99,
            originalPrice: 149.99,
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
            rating: 4.3,
            reviews: 78
        },
        {
            id: 7,
            name: 'Running Shoes',
            price: 129.99,
            originalPrice: 179.99,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
            rating: 4.9,
            reviews: 642
        },
        {
            id: 8,
            name: 'Camera Lens Kit',
            price: 349.99,
            originalPrice: 499.99,
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop',
            rating: 4.8,
            reviews: 156
        },
        {
            id: 9,
            name: 'Mechanical Keyboard',
            price: 149.99,
            originalPrice: 199.99,
            image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop',
            rating: 4.7,
            reviews: 312
        },
        {
            id: 10,
            name: 'Desk Lamp Modern',
            price: 55.99,
            originalPrice: 79.99,
            image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop',
            rating: 4.5,
            reviews: 89
        }
    ];

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const toggleFavorite = (id: number) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
        );
    };

    return (
        <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Recommended Items</h3>
                    <p className="text-sm text-gray-500 mt-1">Based on your browsing history</p>
                </div>

                {/* Navigation Arrows */}
                <div className="hidden sm:flex items-center gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Scrollable Grid */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((item) => {
                    const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
                    const isFav = favorites.includes(item.id);

                    return (
                        <div
                            key={item.id}
                            className="flex-shrink-0 w-[200px] sm:w-[220px] snap-start"
                        >
                            <Link href={`/product/${item.id}`}>
                                <div className="group bg-white rounded-xl lg:rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-100 transition-all duration-300 hover:-translate-y-1">
                                    {/* Image */}
                                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />

                                        {/* Discount Badge */}
                                        <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-bold rounded-lg shadow">
                                            -{discount}%
                                        </div>

                                        {/* Favorite Button */}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                toggleFavorite(item.id);
                                            }}
                                            className={`
                                                absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center
                                                transition-all duration-200 shadow-lg
                                                ${isFav ? 'bg-rose-500 text-white' : 'bg-white/90 text-gray-500 hover:bg-rose-500 hover:text-white'}
                                            `}
                                        >
                                            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        {/* Rating */}
                                        <div className="flex items-center gap-1 mb-2">
                                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                            <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                                            <span className="text-xs text-gray-400">({item.reviews})</span>
                                        </div>

                                        {/* Name */}
                                        <h4 className="font-medium text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                            {item.name}
                                        </h4>

                                        {/* Price */}
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-lg font-bold text-blue-600">${item.price}</span>
                                            <span className="text-sm text-gray-400 line-through">${item.originalPrice}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecommendedItems;
