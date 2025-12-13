"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Package, ChevronRight, Eye, Truck, CheckCircle, XCircle, Clock, Search, Filter, Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { Order, OrderStatus } from '@/types';

// Mock orders data
const mockOrders: Order[] = [
    {
        id: 'ord_001',
        orderNumber: 'GB-2024-001234',
        userId: 'user_1',
        items: [
            { id: '1', productId: 'prod_001', productName: 'Premium Wireless Headphones', productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop', quantity: 2, unitPrice: 149.99, totalPrice: 299.98 },
            { id: '2', productId: 'prod_003', productName: 'Smart Watch Series 5', productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop', quantity: 1, unitPrice: 299.99, totalPrice: 299.99 },
        ],
        shippingAddress: { id: 'addr_1', label: 'Home', fullName: 'John Doe', phone: '+1 555-0123', street: '123 Main St', city: 'New York', state: 'NY', postalCode: '10001', country: 'United States', isDefault: true },
        paymentMethod: { type: 'card', last4: '4242', brand: 'Visa' },
        paymentStatus: 'paid',
        orderStatus: 'shipped',
        subtotal: 599.97,
        shipping: 0,
        tax: 48.00,
        discount: 0,
        total: 647.97,
        trackingNumber: 'TRK123456789',
        estimatedDelivery: '2024-03-25',
        createdAt: '2024-03-15T10:30:00Z',
        updatedAt: '2024-03-18T14:00:00Z',
    },
    {
        id: 'ord_002',
        orderNumber: 'GB-2024-001189',
        userId: 'user_1',
        items: [
            { id: '3', productId: 'prod_004', productName: 'Mechanical Keyboard RGB', productImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&h=100&fit=crop', quantity: 1, unitPrice: 129.99, totalPrice: 129.99 },
        ],
        shippingAddress: { id: 'addr_1', label: 'Home', fullName: 'John Doe', phone: '+1 555-0123', street: '123 Main St', city: 'New York', state: 'NY', postalCode: '10001', country: 'United States', isDefault: true },
        paymentMethod: { type: 'card', last4: '4242', brand: 'Visa' },
        paymentStatus: 'paid',
        orderStatus: 'delivered',
        subtotal: 129.99,
        shipping: 9.99,
        tax: 10.40,
        discount: 0,
        total: 150.38,
        createdAt: '2024-03-01T09:15:00Z',
        updatedAt: '2024-03-08T16:30:00Z',
    },
    {
        id: 'ord_003',
        orderNumber: 'GB-2024-001156',
        userId: 'user_1',
        items: [
            { id: '4', productId: 'prod_005', productName: 'USB-C Hub 7-in-1', productImage: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=100&h=100&fit=crop', quantity: 3, unitPrice: 45.99, totalPrice: 137.97 },
        ],
        shippingAddress: { id: 'addr_2', label: 'Office', fullName: 'John Doe', phone: '+1 555-0124', street: '456 Business Ave', city: 'New York', state: 'NY', postalCode: '10002', country: 'United States', isDefault: false },
        paymentMethod: { type: 'paypal' },
        paymentStatus: 'paid',
        orderStatus: 'processing',
        subtotal: 137.97,
        shipping: 0,
        tax: 11.04,
        discount: 10,
        total: 139.01,
        estimatedDelivery: '2024-03-28',
        createdAt: '2024-03-20T14:45:00Z',
        updatedAt: '2024-03-20T14:45:00Z',
    },
];

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ElementType }> = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-700', icon: CheckCircle },
    processing: { label: 'Processing', color: 'bg-purple-100 text-purple-700', icon: Package },
    shipped: { label: 'Shipped', color: 'bg-indigo-100 text-indigo-700', icon: Truck },
    delivered: { label: 'Delivered', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
    cancelled: { label: 'Cancelled', color: 'bg-rose-100 text-rose-700', icon: XCircle },
    refunded: { label: 'Refunded', color: 'bg-gray-100 text-gray-700', icon: XCircle },
};

export default function OrdersPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();
    const [filter, setFilter] = useState<'all' | OrderStatus>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Redirect if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    // Filter orders
    let filteredOrders = mockOrders;
    if (filter !== 'all') {
        filteredOrders = mockOrders.filter(o => o.orderStatus === filter);
    }
    if (searchQuery) {
        filteredOrders = filteredOrders.filter(o =>
            o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.items.some(item => item.productName.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/profile" className="hover:text-blue-600">My Account</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-medium">Orders</span>
                </nav>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">My Orders</h1>

                    {/* Search */}
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-100 rounded-xl outline-none focus:border-blue-500 transition-all text-sm"
                        />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {[
                        { value: 'all', label: 'All Orders' },
                        { value: 'processing', label: 'Processing' },
                        { value: 'shipped', label: 'Shipped' },
                        { value: 'delivered', label: 'Delivered' },
                        { value: 'cancelled', label: 'Cancelled' },
                    ].map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setFilter(tab.value as any)}
                            className={`
                                px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all
                                ${filter === tab.value
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                }
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                        <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
                        <p className="text-gray-500 mb-6">
                            {filter === 'all' ? "You haven't placed any orders yet." : `No ${filter} orders found.`}
                        </p>
                        <Link href="/">
                            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
                                Start Shopping
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredOrders.map((order) => {
                            const status = statusConfig[order.orderStatus];
                            const StatusIcon = status.icon;

                            return (
                                <div key={order.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    {/* Order Header */}
                                    <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="font-bold text-gray-900">{order.orderNumber}</span>
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${status.color}`}>
                                                        <StatusIcon className="w-3 h-3" />
                                                        {status.label}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Placed on {formatDate(order.createdAt)}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</span>
                                                <Link href={`/orders/${order.id}`}>
                                                    <button className="flex items-center gap-1 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                                                        <Eye className="w-4 h-4" />
                                                        View Details
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="p-4 sm:p-6">
                                        <div className="space-y-4">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                        <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium text-gray-900 truncate">{item.productName}</h4>
                                                        <p className="text-sm text-gray-500">Qty: {item.quantity} × ${item.unitPrice}</p>
                                                    </div>
                                                    <span className="font-medium text-gray-900">${item.totalPrice.toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tracking Info */}
                                        {order.trackingNumber && order.orderStatus === 'shipped' && (
                                            <div className="mt-4 p-3 bg-blue-50 rounded-xl flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Truck className="w-5 h-5 text-blue-600" />
                                                    <span className="text-sm text-blue-700">
                                                        Tracking: <span className="font-medium">{order.trackingNumber}</span>
                                                    </span>
                                                </div>
                                                {order.estimatedDelivery && (
                                                    <span className="text-sm text-blue-600">
                                                        Est. delivery: {formatDate(order.estimatedDelivery)}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
