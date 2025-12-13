"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '@/types';

// Review types
export interface Review {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    title: string;
    content: string;
    helpful: number;
    images?: string[];
    verified: boolean;
    createdAt: string;
}

export interface ReviewsState {
    reviews: Review[];
    recentlyViewed: Product[];
}

type ReviewsAction =
    | { type: 'ADD_REVIEW'; payload: Review }
    | { type: 'REMOVE_REVIEW'; payload: string }
    | { type: 'MARK_HELPFUL'; payload: string }
    | { type: 'ADD_RECENTLY_VIEWED'; payload: Product }
    | { type: 'CLEAR_RECENTLY_VIEWED' }
    | { type: 'LOAD_STATE'; payload: ReviewsState };

const initialState: ReviewsState = {
    reviews: [],
    recentlyViewed: [],
};

// Mock reviews for demo
const mockReviews: Review[] = [
    {
        id: 'rev_001',
        productId: 'prod_001',
        userId: 'user_1',
        userName: 'John D.',
        rating: 5,
        title: 'Excellent sound quality!',
        content: 'These headphones are amazing. The noise cancellation is top-notch and the battery life is incredible. Highly recommend for anyone who travels frequently.',
        helpful: 24,
        verified: true,
        createdAt: '2024-03-10T10:30:00Z',
    },
    {
        id: 'rev_002',
        productId: 'prod_001',
        userId: 'user_2',
        userName: 'Sarah M.',
        rating: 4,
        title: 'Great headphones, minor issues',
        content: 'Sound quality is great and they\'re comfortable for long sessions. Took off one star because the ear cushions could be softer.',
        helpful: 12,
        verified: true,
        createdAt: '2024-03-08T14:20:00Z',
    },
    {
        id: 'rev_003',
        productId: 'prod_002',
        userId: 'user_3',
        userName: 'Mike R.',
        rating: 5,
        title: 'Best keyboard I\'ve owned',
        content: 'The tactile feedback is perfect, RGB lighting is customizable, and it\'s built like a tank. Worth every penny.',
        helpful: 18,
        verified: true,
        createdAt: '2024-03-05T09:15:00Z',
    },
    {
        id: 'rev_004',
        productId: 'prod_003',
        userId: 'user_4',
        userName: 'Emily K.',
        rating: 5,
        title: 'Love this smartwatch!',
        content: 'Tracks everything I need - steps, heart rate, sleep. The battery lasts about 5 days with normal use. The display is bright and easy to read.',
        helpful: 31,
        verified: true,
        createdAt: '2024-03-01T16:45:00Z',
    },
];

function reviewsReducer(state: ReviewsState, action: ReviewsAction): ReviewsState {
    switch (action.type) {
        case 'ADD_REVIEW':
            return {
                ...state,
                reviews: [action.payload, ...state.reviews],
            };
        case 'REMOVE_REVIEW':
            return {
                ...state,
                reviews: state.reviews.filter(r => r.id !== action.payload),
            };
        case 'MARK_HELPFUL':
            return {
                ...state,
                reviews: state.reviews.map(r =>
                    r.id === action.payload ? { ...r, helpful: r.helpful + 1 } : r
                ),
            };
        case 'ADD_RECENTLY_VIEWED':
            const exists = state.recentlyViewed.some(p => p.id === action.payload.id);
            if (exists) {
                return {
                    ...state,
                    recentlyViewed: [
                        action.payload,
                        ...state.recentlyViewed.filter(p => p.id !== action.payload.id),
                    ].slice(0, 10),
                };
            }
            return {
                ...state,
                recentlyViewed: [action.payload, ...state.recentlyViewed].slice(0, 10),
            };
        case 'CLEAR_RECENTLY_VIEWED':
            return {
                ...state,
                recentlyViewed: [],
            };
        case 'LOAD_STATE':
            return action.payload;
        default:
            return state;
    }
}

interface ReviewsContextType {
    reviews: Review[];
    recentlyViewed: Product[];
    addReview: (review: Omit<Review, 'id' | 'createdAt' | 'helpful'>) => void;
    removeReview: (reviewId: string) => void;
    markHelpful: (reviewId: string) => void;
    getProductReviews: (productId: string) => Review[];
    getProductRating: (productId: string) => { average: number; count: number };
    addRecentlyViewed: (product: Product) => void;
    clearRecentlyViewed: () => void;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reviewsReducer, {
        ...initialState,
        reviews: mockReviews,
    });

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('gharbazaar_reviews');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                dispatch({ type: 'LOAD_STATE', payload: { ...parsed, reviews: [...mockReviews, ...parsed.reviews] } });
            } catch (e) {
                console.error('Error loading reviews state:', e);
            }
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        const userReviews = state.reviews.filter(r => !mockReviews.some(m => m.id === r.id));
        localStorage.setItem('gharbazaar_reviews', JSON.stringify({
            reviews: userReviews,
            recentlyViewed: state.recentlyViewed,
        }));
    }, [state]);

    const addReview = (review: Omit<Review, 'id' | 'createdAt' | 'helpful'>) => {
        const newReview: Review = {
            ...review,
            id: `rev_${Date.now()}`,
            createdAt: new Date().toISOString(),
            helpful: 0,
        };
        dispatch({ type: 'ADD_REVIEW', payload: newReview });
    };

    const removeReview = (reviewId: string) => {
        dispatch({ type: 'REMOVE_REVIEW', payload: reviewId });
    };

    const markHelpful = (reviewId: string) => {
        dispatch({ type: 'MARK_HELPFUL', payload: reviewId });
    };

    const getProductReviews = (productId: string) => {
        return state.reviews.filter(r => r.productId === productId);
    };

    const getProductRating = (productId: string) => {
        const productReviews = getProductReviews(productId);
        if (productReviews.length === 0) {
            return { average: 0, count: 0 };
        }
        const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
        return {
            average: Math.round((sum / productReviews.length) * 10) / 10,
            count: productReviews.length,
        };
    };

    const addRecentlyViewed = (product: Product) => {
        dispatch({ type: 'ADD_RECENTLY_VIEWED', payload: product });
    };

    const clearRecentlyViewed = () => {
        dispatch({ type: 'CLEAR_RECENTLY_VIEWED' });
    };

    return (
        <ReviewsContext.Provider value={{
            reviews: state.reviews,
            recentlyViewed: state.recentlyViewed,
            addReview,
            removeReview,
            markHelpful,
            getProductReviews,
            getProductRating,
            addRecentlyViewed,
            clearRecentlyViewed,
        }}>
            {children}
        </ReviewsContext.Provider>
    );
};

export const useReviews = () => {
    const context = useContext(ReviewsContext);
    if (!context) {
        throw new Error('useReviews must be used within a ReviewsProvider');
    }
    return context;
};
