"use client";

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, Truck, Home, ArrowRight, Download, Share2, Copy, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId') || 'GB-00000000';
    const { user } = useAuth();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(orderId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Confetti effect on mount
    useEffect(() => {
        // Could add confetti animation here
    }, []);

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
    const deliveryDate = estimatedDelivery.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Success Animation */}
                <div className="text-center mb-8">
                    <div className="relative inline-flex">
                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-bounce">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute inset-0 w-24 h-24 bg-emerald-400 rounded-full animate-ping opacity-20" />
                    </div>
                </div>

                {/* Success Message */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                        Order Placed Successfully! 🎉
                    </h1>
                    <p className="text-lg text-gray-600 max-w-lg mx-auto">
                        Thank you for your order! We've sent a confirmation email to{' '}
                        <span className="font-medium text-gray-900">{user?.email || 'your email'}</span>
                    </p>
                </div>

                {/* Order Info Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm mb-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Order Number</p>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-gray-900">{orderId}</span>
                                <button
                                    onClick={handleCopy}
                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Copy order number"
                                >
                                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
                                <Download className="w-4 h-4" />
                                Invoice
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
                                <Share2 className="w-4 h-4" />
                                Share
                            </button>
                        </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Estimated Timeline</h3>
                        <div className="relative">
                            {/* Progress Line */}
                            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200" />
                            <div className="absolute left-6 top-8 h-12 w-0.5 bg-emerald-500" />

                            <div className="space-y-6">
                                {[
                                    { icon: CheckCircle, label: 'Order Confirmed', desc: 'Your order has been placed', active: true, completed: true },
                                    { icon: Package, label: 'Processing', desc: 'We\'re preparing your items', active: true, completed: false },
                                    { icon: Truck, label: 'Shipped', desc: 'On its way to you', active: false, completed: false },
                                    { icon: Home, label: 'Delivered', desc: deliveryDate, active: false, completed: false },
                                ].map((step, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className={`
                                            w-12 h-12 rounded-full flex items-center justify-center z-10
                                            ${step.completed ? 'bg-emerald-500 text-white' : ''}
                                            ${step.active && !step.completed ? 'bg-blue-500 text-white' : ''}
                                            ${!step.active ? 'bg-gray-100 text-gray-400' : ''}
                                        `}>
                                            <step.icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 pt-2">
                                            <p className={`font-medium ${step.active ? 'text-gray-900' : 'text-gray-400'}`}>
                                                {step.label}
                                            </p>
                                            <p className={`text-sm ${step.active ? 'text-gray-500' : 'text-gray-400'}`}>
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Truck className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Estimated Delivery</p>
                            <p className="text-blue-600 font-semibold">{deliveryDate}</p>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <Link href="/orders">
                        <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Package className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Track Order</p>
                                        <p className="text-sm text-gray-500">View order status</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    </Link>
                    <Link href="/">
                        <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <Home className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Continue Shopping</p>
                                        <p className="text-sm text-gray-500">Browse more products</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Help Text */}
                <p className="text-center text-gray-500 text-sm">
                    Need help? Contact our{' '}
                    <Link href="/contact" className="text-blue-600 hover:underline">customer support</Link>
                    {' '}team
                </p>
            </main>

            <Footer />
        </div>
    );
}

export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
        }>
            <OrderConfirmationContent />
        </Suspense>
    );
}
