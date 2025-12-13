"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Search, Package, Truck, CheckCircle, Clock, MapPin, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';

export default function TrackOrderPage() {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [trackingResult, setTrackingResult] = useState<null | 'found' | 'not_found'>(null);

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Demo: show found if tracking number is not empty
        setTrackingResult(trackingNumber.length > 5 ? 'found' : 'not_found');
        setIsSearching(false);
    };

    const mockTrackingData = {
        orderNumber: trackingNumber || 'GB-2024-001234',
        status: 'In Transit',
        carrier: 'FedEx',
        estimatedDelivery: 'December 15, 2024',
        origin: 'Los Angeles, CA',
        destination: 'New York, NY',
        updates: [
            { date: 'Dec 13, 2024', time: '10:30 AM', status: 'Out for Delivery', location: 'New York, NY', active: true },
            { date: 'Dec 12, 2024', time: '8:15 PM', status: 'Arrived at Local Facility', location: 'New York, NY', active: false },
            { date: 'Dec 11, 2024', time: '2:30 PM', status: 'In Transit', location: 'Chicago, IL', active: false },
            { date: 'Dec 10, 2024', time: '9:00 AM', status: 'Departed Origin Facility', location: 'Los Angeles, CA', active: false },
            { date: 'Dec 9, 2024', time: '4:45 PM', status: 'Package Picked Up', location: 'Los Angeles, CA', active: false },
            { date: 'Dec 9, 2024', time: '11:00 AM', status: 'Order Confirmed', location: 'Online', active: false },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main>
                {/* Hero */}
                <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 lg:py-20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }} />
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <nav className="flex items-center gap-2 text-sm text-blue-200 mb-6">
                            <Link href="/" className="hover:text-white">Home</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white">Track Order</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Track Your Order</h1>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                            Enter your order number or tracking ID to see the current status of your shipment.
                        </p>

                        {/* Search Form */}
                        <form onSubmit={handleTrack} className="max-w-xl">
                            <div className="flex gap-3">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Order number or tracking ID"
                                        value={trackingNumber}
                                        onChange={(e) => setTrackingNumber(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 outline-none focus:ring-4 focus:ring-blue-400/30"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSearching}
                                    className="px-6 py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-70 flex items-center gap-2"
                                >
                                    {isSearching ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Track
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                {/* Tracking Results */}
                {trackingResult === 'found' && (
                    <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Order Summary */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Order Number</p>
                                    <p className="text-xl font-bold text-gray-900">{mockTrackingData.orderNumber}</p>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                                    <Truck className="w-5 h-5" />
                                    <span className="font-semibold">{mockTrackingData.status}</span>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Package className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Carrier</p>
                                        <p className="font-medium">{mockTrackingData.carrier}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Est. Delivery</p>
                                        <p className="font-medium text-emerald-600">{mockTrackingData.estimatedDelivery}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Origin</p>
                                        <p className="font-medium">{mockTrackingData.origin}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Destination</p>
                                        <p className="font-medium">{mockTrackingData.destination}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tracking Timeline */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Shipment Updates</h2>
                            <div className="relative">
                                <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-gray-200" />
                                <div className="space-y-6">
                                    {mockTrackingData.updates.map((update, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className={`
                                                w-10 h-10 rounded-full flex items-center justify-center z-10 flex-shrink-0
                                                ${update.active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}
                                            `}>
                                                {update.active ? <Truck className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                                            </div>
                                            <div className="flex-1 pb-6 border-b border-gray-100 last:border-0">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                                                    <span className={`font-semibold ${update.active ? 'text-blue-600' : 'text-gray-900'}`}>
                                                        {update.status}
                                                    </span>
                                                    <span className="text-sm text-gray-500">{update.date} at {update.time}</span>
                                                </div>
                                                <p className="text-gray-600 flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {update.location}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Not Found */}
                {trackingResult === 'not_found' && (
                    <section className="py-12 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Order Not Found</h3>
                            <p className="text-gray-600 mb-6">
                                We couldn't find an order with that tracking number. Please check the number and try again.
                            </p>
                            <button
                                onClick={() => {
                                    setTrackingResult(null);
                                    setTrackingNumber('');
                                }}
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Try another search
                            </button>
                        </div>
                    </section>
                )}

                {/* Help Section */}
                {!trackingResult && (
                    <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Need Help?</h2>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition-shadow">
                                <Clock className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                                <h3 className="font-semibold text-gray-900 mb-1">Where's My Order?</h3>
                                <p className="text-sm text-gray-500">Find your order number in your confirmation email</p>
                            </div>
                            <Link href="/faq">
                                <div className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition-shadow cursor-pointer">
                                    <Package className="w-8 h-8 mx-auto mb-3 text-emerald-600" />
                                    <h3 className="font-semibold text-gray-900 mb-1">Shipping FAQ</h3>
                                    <p className="text-sm text-gray-500">Common shipping questions answered</p>
                                </div>
                            </Link>
                            <Link href="/contact">
                                <div className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition-shadow cursor-pointer">
                                    <Truck className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                                    <h3 className="font-semibold text-gray-900 mb-1">Contact Support</h3>
                                    <p className="text-sm text-gray-500">Get help with your delivery</p>
                                </div>
                            </Link>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}
