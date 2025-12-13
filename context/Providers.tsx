"use client";

import { ReactNode } from 'react';
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';
import { WishlistProvider } from './WishlistContext';
import { ReviewsProvider } from './ReviewsContext';

interface ProvidersProps {
    children: ReactNode;
}

/**
 * Combined providers wrapper that wraps the entire application
 * with all necessary context providers.
 */
export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <AuthProvider>
            <CartProvider>
                <WishlistProvider>
                    <ReviewsProvider>
                        {children}
                    </ReviewsProvider>
                </WishlistProvider>
            </CartProvider>
        </AuthProvider>
    );
};

export default Providers;
