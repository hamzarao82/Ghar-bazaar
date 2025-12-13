"use client";

import Link from 'next/link';
import { Clock, X, ArrowRight } from 'lucide-react';
import { useReviews } from '@/context/ReviewsContext';
import ProductCard from '@/components/shared/ProductCard';

export default function RecentlyViewed() {
    const { recentlyViewed, clearRecentlyViewed } = useReviews();

    if (recentlyViewed.length === 0) {
        return null;
    }

    return (
        <section className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Recently Viewed</h2>
                            <p className="text-sm text-gray-500">Products you've looked at</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={clearRecentlyViewed}
                            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                        >
                            <X className="w-4 h-4" />
                            Clear
                        </button>
                        <Link href="/search" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                            View All
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {recentlyViewed.slice(0, 6).map((product) => (
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
            </div>
        </section>
    );
}
