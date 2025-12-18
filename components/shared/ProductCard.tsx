"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { getProductById } from '@/data/products';
import Skeleton from './Skeleton';

interface ProductCardProps {
    id: string | number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating?: number;
    reviews?: number;
    badge?: string;
    badgeColor?: 'blue' | 'green' | 'red' | 'orange';
    variant?: 'default' | 'compact' | 'horizontal';
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    price,
    originalPrice,
    image,
    rating = 0,
    reviews = 0,
    badge,
    badgeColor = 'blue',
    variant = 'default',
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const { addToCart, isInCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const productId = String(id);
    const isFavorite = isInWishlist(productId);
    const inCart = isInCart(productId);

    const discount = originalPrice
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    const badgeColors = {
        blue: 'bg-blue-500',
        green: 'bg-emerald-500',
        red: 'bg-rose-500',
        orange: 'bg-orange-500',
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const product = getProductById(productId);
        if (product) {
            addToCart(product, 1);
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 1500);
        }
    };

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const product = getProductById(productId);
        if (product) {
            toggleWishlist(product);
        }
    };

    if (variant === 'horizontal') {
        return (
            <Link href={`/product/${id}`}>
                <div className="group bg-white rounded-xl border border-gray-100 p-4 flex gap-4 hover:shadow-lg hover:border-blue-100 transition-all duration-300">
                    {/* Image */}
                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                        {!imageLoaded && <Skeleton className="absolute inset-0 z-10" />}
                        <img
                            src={image}
                            alt={name}
                            onLoad={() => setImageLoaded(true)}
                            className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        />
                        {discount > 0 && (
                            <div className="absolute top-2 left-2 px-2 py-0.5 bg-rose-500 text-white text-xs font-bold rounded z-20">
                                -{discount}%
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                            {name}
                        </h3>

                        {rating > 0 && (
                            <div className="flex items-center gap-1 mb-2">
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                <span className="text-sm font-medium text-gray-700">{rating}</span>
                                <span className="text-xs text-gray-400">({reviews})</span>
                            </div>
                        )}

                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold text-blue-600">${price}</span>
                            {originalPrice && (
                                <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button
                                onClick={handleAddToCart}
                                disabled={inCart}
                                className={`
                  flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition-all
                  ${addedToCart || inCart
                                        ? 'bg-emerald-100 text-emerald-700'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }
                `}
                            >
                                <ShoppingCart className="w-4 h-4" />
                                {addedToCart ? 'Added!' : inCart ? 'In Cart' : 'Add to Cart'}
                            </button>
                            <button
                                onClick={handleToggleFavorite}
                                className={`
                  p-2 rounded-lg transition-all
                  ${isFavorite ? 'bg-rose-100 text-rose-500' : 'bg-gray-100 text-gray-500 hover:text-rose-500'}
                `}
                            >
                                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/product/${id}`}>
            <div
                className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-100 transition-all duration-300 h-full flex flex-col"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                    {!imageLoaded && <Skeleton className="absolute inset-0 z-10" />}
                    <img
                        src={image}
                        alt={name}
                        onLoad={() => setImageLoaded(true)}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-20">
                        {discount > 0 && (
                            <span className="px-2 py-0.5 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-bold rounded-md shadow">
                                -{discount}%
                            </span>
                        )}
                        {badge && (
                            <span className={`px-2 py-0.5 ${badgeColors[badgeColor]} text-white text-xs font-bold rounded-md shadow`}>
                                {badge}
                            </span>
                        )}
                    </div>

                    {/* Favorite Button */}
                    <button
                        onClick={handleToggleFavorite}
                        className={`
              absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all z-20
              ${isFavorite
                                ? 'bg-rose-500 text-white'
                                : 'bg-white text-gray-400 hover:text-rose-500'
                            }
            `}
                    >
                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>

                    {/* Quick Actions Overlay */}
                    <div className={`
            absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300 z-20
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          `}>
                        <button
                            onClick={handleAddToCart}
                            disabled={inCart}
                            className={`
                flex-1 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 shadow-lg transition-all
                ${addedToCart || inCart
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }
              `}
                        >
                            <ShoppingCart className="w-4 h-4" />
                            {addedToCart ? 'Added!' : inCart ? 'In Cart' : 'Add'}
                        </button>
                        <button className="p-2.5 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
                            <Eye className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className={`p-3 flex flex-col flex-1 ${variant === 'compact' ? '' : 'p-4'}`}>
                    {/* Rating */}
                    {rating > 0 && (
                        <div className="flex items-center gap-1 mb-1.5">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="text-xs font-medium text-gray-700">{rating}</span>
                            <span className="text-xs text-gray-400">({reviews})</span>
                        </div>
                    )}

                    {/* Name */}
                    <h3 className={`font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1 ${variant === 'compact' ? 'text-sm' : ''}`}>
                        {name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`font-bold text-blue-600 ${variant === 'compact' ? 'text-base' : 'text-lg'}`}>
                            ${price}
                        </span>
                        {originalPrice && (
                            <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;

