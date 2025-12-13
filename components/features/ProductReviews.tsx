"use client";

import { useState } from 'react';
import { Star, ThumbsUp, User, CheckCircle, Camera, X } from 'lucide-react';
import { useReviews, Review } from '@/context/ReviewsContext';
import { useAuth } from '@/context/AuthContext';

interface ProductReviewsProps {
    productId: string;
    productName: string;
}

export default function ProductReviews({ productId, productName }: ProductReviewsProps) {
    const { getProductReviews, getProductRating, addReview, markHelpful } = useReviews();
    const { user, isAuthenticated } = useAuth();
    const [showWriteReview, setShowWriteReview] = useState(false);
    const [filterRating, setFilterRating] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<'newest' | 'helpful'>('newest');
    const [helpedReviews, setHelpedReviews] = useState<string[]>([]);
    const [newReview, setNewReview] = useState({
        rating: 5,
        title: '',
        content: '',
    });

    const reviews = getProductReviews(productId);
    const rating = getProductRating(productId);

    // Filter and sort reviews
    let displayedReviews = filterRating
        ? reviews.filter(r => r.rating === filterRating)
        : reviews;

    displayedReviews = [...displayedReviews].sort((a, b) => {
        if (sortBy === 'newest') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return b.helpful - a.helpful;
    });

    // Rating distribution
    const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
        star,
        count: reviews.filter(r => r.rating === star).length,
        percentage: reviews.length > 0
            ? Math.round((reviews.filter(r => r.rating === star).length / reviews.length) * 100)
            : 0,
    }));

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        addReview({
            productId,
            userId: user.id,
            userName: user.fullName,
            rating: newReview.rating,
            title: newReview.title,
            content: newReview.content,
            verified: true,
        });

        setNewReview({ rating: 5, title: '', content: '' });
        setShowWriteReview(false);
    };

    const handleMarkHelpful = (reviewId: string) => {
        if (helpedReviews.includes(reviewId)) return;
        markHelpful(reviewId);
        setHelpedReviews([...helpedReviews, reviewId]);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                    <p className="text-gray-500 mt-1">{reviews.length} reviews for {productName}</p>
                </div>
                {isAuthenticated && (
                    <button
                        onClick={() => setShowWriteReview(!showWriteReview)}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Write a Review
                    </button>
                )}
            </div>

            {/* Write Review Form */}
            {showWriteReview && (
                <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Write Your Review</h3>
                        <button onClick={() => setShowWriteReview(false)} className="text-gray-400 hover:text-gray-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setNewReview({ ...newReview, rating: star })}
                                        className="p-1"
                                    >
                                        <Star
                                            className={`w-8 h-8 transition-colors ${star <= newReview.rating
                                                    ? 'text-amber-400 fill-amber-400'
                                                    : 'text-gray-300'
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Review Title</label>
                            <input
                                type="text"
                                value={newReview.title}
                                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                                placeholder="Summarize your experience"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                            <textarea
                                value={newReview.content}
                                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                                placeholder="Share your experience with this product..."
                                rows={4}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        {/* Average Rating */}
                        <div className="text-center mb-6">
                            <div className="text-5xl font-bold text-gray-900 mb-2">
                                {rating.average > 0 ? rating.average.toFixed(1) : '-'}
                            </div>
                            <div className="flex justify-center gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-5 h-5 ${star <= Math.round(rating.average)
                                                ? 'text-amber-400 fill-amber-400'
                                                : 'text-gray-200'
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-500">Based on {rating.count} reviews</p>
                        </div>

                        {/* Rating Distribution */}
                        <div className="space-y-2">
                            {ratingDistribution.map((item) => (
                                <button
                                    key={item.star}
                                    onClick={() => setFilterRating(filterRating === item.star ? null : item.star)}
                                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${filterRating === item.star ? 'bg-blue-50' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="text-sm font-medium w-8">{item.star}★</span>
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-amber-400 rounded-full"
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-500 w-10">{item.count}</span>
                                </button>
                            ))}
                        </div>

                        {filterRating && (
                            <button
                                onClick={() => setFilterRating(null)}
                                className="w-full mt-4 text-blue-600 text-sm font-medium hover:underline"
                            >
                                Clear filter
                            </button>
                        )}
                    </div>
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-2">
                    {/* Sort */}
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-gray-600">
                            {filterRating ? `Showing ${filterRating}-star reviews` : 'All reviews'}
                        </p>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        >
                            <option value="newest">Newest First</option>
                            <option value="helpful">Most Helpful</option>
                        </select>
                    </div>

                    {displayedReviews.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p>No reviews yet. Be the first to review this product!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {displayedReviews.map((review) => (
                                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-gray-900">{review.userName}</span>
                                                {review.verified && (
                                                    <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                                        <CheckCircle className="w-3 h-3" />
                                                        Verified
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`w-4 h-4 ${star <= review.rating
                                                                    ? 'text-amber-400 fill-amber-400'
                                                                    : 'text-gray-200'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
                                            </div>
                                            <h4 className="font-semibold text-gray-900 mb-1">{review.title}</h4>
                                            <p className="text-gray-600 leading-relaxed">{review.content}</p>

                                            {/* Helpful */}
                                            <button
                                                onClick={() => handleMarkHelpful(review.id)}
                                                disabled={helpedReviews.includes(review.id)}
                                                className={`
                                                    mt-4 flex items-center gap-2 text-sm transition-colors
                                                    ${helpedReviews.includes(review.id)
                                                        ? 'text-blue-600'
                                                        : 'text-gray-500 hover:text-gray-700'
                                                    }
                                                `}
                                            >
                                                <ThumbsUp className={`w-4 h-4 ${helpedReviews.includes(review.id) ? 'fill-current' : ''}`} />
                                                Helpful ({review.helpful})
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
