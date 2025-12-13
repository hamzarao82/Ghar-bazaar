"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, WishlistItem, WishlistState } from '@/types';

// ==========================================
// Types
// ==========================================

interface WishlistContextType {
    items: WishlistItem[];
    isLoading: boolean;
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    toggleWishlist: (product: Product) => void;
    clearWishlist: () => void;
    isInWishlist: (productId: string) => boolean;
    itemCount: number;
}

type WishlistAction =
    | { type: 'ADD_TO_WISHLIST'; payload: Product }
    | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
    | { type: 'CLEAR_WISHLIST' }
    | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] }
    | { type: 'SET_LOADING'; payload: boolean };

// ==========================================
// Initial State
// ==========================================

const initialState: WishlistState = {
    items: [],
    isLoading: true,
};

// ==========================================
// Reducer
// ==========================================

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST': {
            // Check if already in wishlist
            if (state.items.some(item => item.productId === action.payload.id)) {
                return state;
            }

            const newItem: WishlistItem = {
                id: `wish_${Date.now()}`,
                productId: action.payload.id,
                product: action.payload,
                addedAt: new Date().toISOString(),
            };

            return {
                ...state,
                items: [...state.items, newItem],
            };
        }

        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                items: state.items.filter(item => item.productId !== action.payload),
            };

        case 'CLEAR_WISHLIST':
            return {
                ...state,
                items: [],
            };

        case 'LOAD_WISHLIST':
            return {
                items: action.payload,
                isLoading: false,
            };

        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };

        default:
            return state;
    }
};

// ==========================================
// Context
// ==========================================

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// ==========================================
// Provider
// ==========================================

interface WishlistProviderProps {
    children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(wishlistReducer, initialState);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('ghar-bazaar-wishlist');
        if (savedWishlist) {
            try {
                const parsedWishlist = JSON.parse(savedWishlist);
                dispatch({ type: 'LOAD_WISHLIST', payload: parsedWishlist });
            } catch (error) {
                console.error('Error loading wishlist from localStorage:', error);
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        } else {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    // Save wishlist to localStorage on changes
    useEffect(() => {
        if (!state.isLoading) {
            localStorage.setItem('ghar-bazaar-wishlist', JSON.stringify(state.items));
        }
    }, [state.items, state.isLoading]);

    // Actions
    const addToWishlist = (product: Product) => {
        dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    };

    const removeFromWishlist = (productId: string) => {
        dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
    };

    const toggleWishlist = (product: Product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const clearWishlist = () => {
        dispatch({ type: 'CLEAR_WISHLIST' });
    };

    const isInWishlist = (productId: string): boolean => {
        return state.items.some(item => item.productId === productId);
    };

    const value: WishlistContextType = {
        items: state.items,
        isLoading: state.isLoading,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        isInWishlist,
        itemCount: state.items.length,
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

// ==========================================
// Hook
// ==========================================

export const useWishlist = (): WishlistContextType => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export default WishlistContext;
