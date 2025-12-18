"use client";

import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, Shield, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';
import EmptyState from '@/components/shared/EmptyState';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    if (cart.items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Topbar />
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <EmptyState
                        icon={ShoppingBag}
                        title="Your cart is empty"
                        description="Looks like you haven't added any items yet. Start shopping to fill your cart with amazing products!"
                        actionText="Start Shopping"
                        actionHref="/"
                    />
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-medium">Shopping Cart</span>
                </nav>

                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                    Shopping Cart ({cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'})
                </h1>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-4">
                        {cart.items.map((item) => {
                            const discount = item.product.originalPrice
                                ? Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)
                                : 0;

                            return (
                                <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-4 lg:p-6 shadow-sm">
                                    <div className="flex gap-4 lg:gap-6">
                                        {/* Product Image */}
                                        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                            <img
                                                src={item.product.thumbnail}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <Link href={`/product/${item.productId}`}>
                                                        <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 lg:line-clamp-1">
                                                            {item.product.name}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {item.product.category.name} • SKU: {item.product.sku}
                                                    </p>

                                                    {/* Price - Mobile */}
                                                    <div className="flex items-center gap-2 mt-2 lg:hidden">
                                                        <span className="text-lg font-bold text-blue-600">${item.unitPrice}</span>
                                                        {item.product.originalPrice && (
                                                            <>
                                                                <span className="text-sm text-gray-400 line-through">${item.product.originalPrice}</span>
                                                                <span className="text-xs font-bold text-rose-500">-{discount}%</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Price - Desktop */}
                                                <div className="hidden lg:block text-right">
                                                    <div className="flex items-center gap-2 justify-end">
                                                        <span className="text-xl font-bold text-blue-600">${item.unitPrice}</span>
                                                        {item.product.originalPrice && (
                                                            <span className="text-sm text-gray-400 line-through">${item.product.originalPrice}</span>
                                                        )}
                                                    </div>
                                                    {discount > 0 && (
                                                        <span className="text-xs font-bold text-rose-500">You save {discount}%</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Actions Row */}
                                            <div className="flex items-center justify-between mt-4">
                                                {/* Quantity Selector */}
                                                <div className="flex items-center border-2 border-gray-200 rounded-xl">
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-l-xl"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-r-xl"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Subtotal & Remove */}
                                                <div className="flex items-center gap-4">
                                                    <span className="font-bold text-gray-900">
                                                        ${item.totalPrice.toFixed(2)}
                                                    </span>
                                                    <button
                                                        onClick={() => removeFromCart(item.productId)}
                                                        className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Clear Cart */}
                        <div className="flex justify-end">
                            <button
                                onClick={clearCart}
                                className="text-sm text-gray-500 hover:text-rose-500 transition-colors"
                            >
                                Clear entire cart
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-[380px] flex-shrink-0">
                        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm sticky top-24">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                            {/* Promo Code */}
                            <div className="flex gap-2 mb-6">
                                <div className="flex-1 relative">
                                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Enter promo code"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                                    />
                                </div>
                                <button className="px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors">
                                    Apply
                                </button>
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({cart.itemCount} items)</span>
                                    <span className="font-medium">${cart.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className={`font-medium ${cart.shipping === 0 ? 'text-emerald-600' : ''}`}>
                                        {cart.shipping === 0 ? 'FREE' : `$${cart.shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (estimated)</span>
                                    <span className="font-medium">${cart.tax.toFixed(2)}</span>
                                </div>
                                {cart.discount > 0 && (
                                    <div className="flex justify-between text-emerald-600">
                                        <span>Discount</span>
                                        <span className="font-medium">-${cart.discount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="h-px bg-gray-200" />
                                <div className="flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>${cart.total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <Link href="/checkout">
                                <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
                                    Proceed to Checkout
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>

                            {/* Continue Shopping */}
                            <Link href="/">
                                <button className="w-full mt-3 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                                    Continue Shopping
                                </button>
                            </Link>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Truck className="w-4 h-4 text-blue-600" />
                                    <span>Free shipping $50+</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Shield className="w-4 h-4 text-blue-600" />
                                    <span>Secure checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
