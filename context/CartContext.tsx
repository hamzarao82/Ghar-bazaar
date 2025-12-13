"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, Cart, CartItem } from '@/types';

// ==========================================
// Types
// ==========================================

interface CartContextType {
    cart: Cart;
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    isInCart: (productId: string) => boolean;
    getItemQuantity: (productId: string) => number;
}

type CartAction =
    | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
    | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
    | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'LOAD_CART'; payload: Cart };

// ==========================================
// Initial State
// ==========================================

const initialCart: Cart = {
    items: [],
    itemCount: 0,
    subtotal: 0,
    shipping: 0,
    tax: 0,
    discount: 0,
    total: 0,
};

// ==========================================
// Helper Functions
// ==========================================

const calculateCartTotals = (items: CartItem[]): Omit<Cart, 'items'> => {
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
    const shipping = subtotal >= 50 ? 0 : 9.99; // Free shipping over $50
    const tax = subtotal * 0.08; // 8% tax
    const discount = 0; // Can be calculated based on promo codes
    const total = subtotal + shipping + tax - discount;

    return {
        itemCount,
        subtotal: Math.round(subtotal * 100) / 100,
        shipping: Math.round(shipping * 100) / 100,
        tax: Math.round(tax * 100) / 100,
        discount: Math.round(discount * 100) / 100,
        total: Math.round(total * 100) / 100,
    };
};

// ==========================================
// Reducer
// ==========================================

const cartReducer = (state: Cart, action: CartAction): Cart => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const { product, quantity } = action.payload;
            const existingItemIndex = state.items.findIndex(
                item => item.productId === product.id
            );

            let newItems: CartItem[];

            if (existingItemIndex >= 0) {
                // Update existing item
                newItems = state.items.map((item, index) => {
                    if (index === existingItemIndex) {
                        const newQuantity = item.quantity + quantity;
                        return {
                            ...item,
                            quantity: newQuantity,
                            totalPrice: Math.round(item.unitPrice * newQuantity * 100) / 100,
                        };
                    }
                    return item;
                });
            } else {
                // Add new item
                const newItem: CartItem = {
                    id: `cart_${Date.now()}`,
                    productId: product.id,
                    product,
                    quantity,
                    unitPrice: product.price,
                    totalPrice: Math.round(product.price * quantity * 100) / 100,
                    addedAt: new Date().toISOString(),
                };
                newItems = [...state.items, newItem];
            }

            return {
                items: newItems,
                ...calculateCartTotals(newItems),
            };
        }

        case 'REMOVE_FROM_CART': {
            const newItems = state.items.filter(
                item => item.productId !== action.payload.productId
            );
            return {
                items: newItems,
                ...calculateCartTotals(newItems),
            };
        }

        case 'UPDATE_QUANTITY': {
            const { productId, quantity } = action.payload;

            if (quantity <= 0) {
                const newItems = state.items.filter(item => item.productId !== productId);
                return {
                    items: newItems,
                    ...calculateCartTotals(newItems),
                };
            }

            const newItems = state.items.map(item => {
                if (item.productId === productId) {
                    return {
                        ...item,
                        quantity,
                        totalPrice: Math.round(item.unitPrice * quantity * 100) / 100,
                    };
                }
                return item;
            });

            return {
                items: newItems,
                ...calculateCartTotals(newItems),
            };
        }

        case 'CLEAR_CART':
            return initialCart;

        case 'LOAD_CART':
            return action.payload;

        default:
            return state;
    }
};

// ==========================================
// Context
// ==========================================

const CartContext = createContext<CartContextType | undefined>(undefined);

// ==========================================
// Provider
// ==========================================

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialCart);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('ghar-bazaar-cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                dispatch({ type: 'LOAD_CART', payload: parsedCart });
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        }
    }, []);

    // Save cart to localStorage on changes
    useEffect(() => {
        localStorage.setItem('ghar-bazaar-cart', JSON.stringify(cart));
    }, [cart]);

    // Actions
    const addToCart = (product: Product, quantity: number = 1) => {
        dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    };

    const removeFromCart = (productId: string) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const isInCart = (productId: string): boolean => {
        return cart.items.some(item => item.productId === productId);
    };

    const getItemQuantity = (productId: string): number => {
        const item = cart.items.find(item => item.productId === productId);
        return item?.quantity || 0;
    };

    const value: CartContextType = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// ==========================================
// Hook
// ==========================================

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext;
