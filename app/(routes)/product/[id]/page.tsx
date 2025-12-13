"use client";

import { useState, useEffect } from 'react';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Share2, ChevronRight, Minus, Plus, Check, MapPin } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useReviews } from '@/context/ReviewsContext';
import { getProductById, products } from '@/data/products';
import ProductCard from '@/components/shared/ProductCard';
import ProductReviews from '@/components/features/ProductReviews';
import ProductRecommendations from '@/components/features/ProductRecommendations';

export default function ProductPage({ params }: { params: { id: string } }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    const { addToCart, isInCart, getItemQuantity } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addRecentlyViewed, getProductRating } = useReviews();

    // Get product from data
    const product = getProductById(params.id) || products[0];
    const isFavorite = isInWishlist(product.id);
    const cartQuantity = getItemQuantity(product.id);
    const reviewData = getProductRating(product.id);

    // Track recently viewed
    useEffect(() => {
        addRecentlyViewed(product);
    }, [product.id]);

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleToggleWishlist = () => {
        toggleWishlist(product);
    };

    // Get related products (same category)
    const relatedProducts = products
        .filter(p => p.category.slug === product.category.slug && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href={`/categories/${product.category.slug}`} className="hover:text-blue-600">
                        {product.category.name}
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
                </nav>

                {/* Product Section */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                        {/* Left: Images */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />

                                {/* Discount Badge */}
                                {discount > 0 && (
                                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-sm font-bold rounded-lg shadow-lg">
                                        -{discount}% OFF
                                    </div>
                                )}

                                {/* Share & Favorite */}
                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gray-600 hover:text-blue-600 shadow-lg transition-all">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handleToggleWishlist}
                                        className={`w-10 h-10 rounded-full backdrop-blur flex items-center justify-center shadow-lg transition-all ${isFavorite ? 'bg-rose-500 text-white' : 'bg-white/90 text-gray-600 hover:text-rose-500'
                                            }`}
                                    >
                                        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                                    </button>
                                </div>
                            </div>

                            {/* Thumbnail Images */}
                            <div className="flex gap-3">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`
                                            w-20 h-20 rounded-xl overflow-hidden border-2 transition-all
                                            ${selectedImage === idx ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-200 hover:border-gray-300'}
                                        `}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: Product Info */}
                        <div>
                            {/* Title & Rating */}
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(reviewData.average || product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                                        />
                                    ))}
                                    <span className="ml-2 font-semibold text-gray-700">{reviewData.average || product.rating}</span>
                                </div>
                                <span className="text-gray-400">|</span>
                                <span className="text-gray-600">{(reviewData.count || product.reviewCount).toLocaleString()} reviews</span>
                                <span className="text-gray-400">|</span>
                                <span className="text-gray-600">{product.soldCount.toLocaleString()} sold</span>
                            </div>

                            {/* Price */}
                            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5 mb-6">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-4xl font-bold text-orange-600">${product.price}</span>
                                    {product.originalPrice && (
                                        <>
                                            <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                                            <span className="px-2 py-1 bg-orange-100 text-orange-600 text-sm font-bold rounded">
                                                Save ${(product.originalPrice - product.price).toFixed(2)}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500">Price per unit. Minimum order: {product.minOrder} pieces</p>
                            </div>

                            {/* Features */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-gray-700">
                                            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-emerald-600" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-4 mb-6">
                                <span className="font-medium text-gray-700">Quantity:</span>
                                <div className="flex items-center border-2 border-gray-200 rounded-xl">
                                    <button
                                        onClick={() => setQuantity(Math.max(product.minOrder, quantity - 1))}
                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-16 text-center font-semibold">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <span className="text-sm text-gray-500">{product.stock} pieces available</span>
                            </div>

                            {/* Cart Status */}
                            {cartQuantity > 0 && (
                                <div className="mb-4 p-3 bg-blue-50 rounded-xl text-blue-700 text-sm">
                                    <Check className="w-4 h-4 inline mr-2" />
                                    {cartQuantity} already in your cart
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 mb-8">
                                <button
                                    onClick={handleAddToCart}
                                    className={`
                                        flex-1 py-4 font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2
                                        ${addedToCart
                                            ? 'bg-emerald-500 text-white shadow-emerald-500/25'
                                            : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-blue-500/25'
                                        }
                                    `}
                                >
                                    {addedToCart ? (
                                        <>
                                            <Check className="w-5 h-5" />
                                            Added to Cart!
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="w-5 h-5" />
                                            Add to Cart
                                        </>
                                    )}
                                </button>
                                <Link href="/checkout" className="flex-1">
                                    <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25">
                                        Buy Now
                                    </button>
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { icon: Truck, label: 'Free Shipping', desc: 'On orders $50+' },
                                    { icon: Shield, label: 'Secure Payment', desc: 'Protected checkout' },
                                    { icon: RotateCcw, label: 'Easy Returns', desc: '30-day policy' },
                                ].map((badge, idx) => (
                                    <div key={idx} className="text-center p-3 bg-gray-50 rounded-xl">
                                        <badge.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                                        <p className="font-medium text-gray-800 text-sm">{badge.label}</p>
                                        <p className="text-xs text-gray-500">{badge.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Supplier Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 mt-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                                {product.supplier.name.charAt(0)}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-gray-900">{product.supplier.name}</h3>
                                    {product.supplier.verified && (
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded-full flex items-center gap-1">
                                            <Check className="w-3 h-3" />
                                            Verified
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {product.supplier.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                        {product.supplier.rating}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none px-6 py-2.5 border-2 border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors">
                                Chat Now
                            </button>
                            <button className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
                                View Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Reviews */}
                <div className="mt-8">
                    <ProductReviews productId={product.id} productName={product.name} />
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Related Products</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard
                                    key={relatedProduct.id}
                                    id={relatedProduct.id}
                                    name={relatedProduct.name}
                                    price={relatedProduct.price}
                                    originalPrice={relatedProduct.originalPrice}
                                    image={relatedProduct.thumbnail}
                                    rating={relatedProduct.rating}
                                    reviews={relatedProduct.reviewCount}
                                    variant="compact"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Product Recommendations */}
            <ProductRecommendations
                currentProductId={product.id}
                category={product.category.slug}
                title="You May Also Like"
                subtitle="Based on this product"
            />

            <Footer />
        </div>
    );
}

