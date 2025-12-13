"use client";

import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { products, getProductsByCategory } from '@/data/products';
import { useReviews } from '@/context/ReviewsContext';
import ProductCard from '@/components/shared/ProductCard';

interface ProductRecommendationsProps {
    currentProductId?: string;
    category?: string;
    title?: string;
    subtitle?: string;
}

export default function ProductRecommendations({
    currentProductId,
    category,
    title = "Recommended for You",
    subtitle = "Based on your browsing history"
}: ProductRecommendationsProps) {
    const { recentlyViewed } = useReviews();

    // Get recommendations based on:
    // 1. Same category as current product
    // 2. Categories from recently viewed
    // 3. Fallback to featured products

    let recommendations: typeof products = [];

    if (category) {
        recommendations = getProductsByCategory(category)
            .filter(p => p.id !== currentProductId);
    }

    if (recommendations.length < 6 && recentlyViewed.length > 0) {
        const viewedCategories = [...new Set(recentlyViewed.map(p => p.category))];
        const fromViewed = products.filter(p =>
            viewedCategories.includes(p.category) &&
            p.id !== currentProductId &&
            !recommendations.some(r => r.id === p.id)
        );
        recommendations = [...recommendations, ...fromViewed];
    }

    if (recommendations.length < 6) {
        const featured = products.filter(p =>
            p.isFeatured &&
            p.id !== currentProductId &&
            !recommendations.some(r => r.id === p.id)
        );
        recommendations = [...recommendations, ...featured];
    }

    // Fill with random products if still not enough
    if (recommendations.length < 6) {
        const remaining = products.filter(p =>
            p.id !== currentProductId &&
            !recommendations.some(r => r.id === p.id)
        );
        recommendations = [...recommendations, ...remaining];
    }

    recommendations = recommendations.slice(0, 6);

    if (recommendations.length === 0) {
        return null;
    }

    return (
        <section className="py-10 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                            <p className="text-sm text-gray-500">{subtitle}</p>
                        </div>
                    </div>
                    <Link href="/search" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        View All
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {recommendations.map((product) => (
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
