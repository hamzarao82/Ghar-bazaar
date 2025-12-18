import { Metadata } from 'next';
import Link from 'next/link';
import { Truck, ShieldCheck, Globe, Clock, ChevronRight, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'Shipping Information | Ghar-Bazaar',
    description: 'Learn about our shipping methods, delivery times, and global logistics network.',
};

export default function ShippingPage() {
    const shippingMethods = [
        {
            title: 'Express Shipping',
            time: '3-5 Business Days',
            price: 'From $15.00',
            desc: 'Best for urgent orders. Includes full tracking and door-to-door delivery.',
            icon: Clock,
            features: ['Real-time tracking', 'Priority handling', 'Insurance included', 'Signature required']
        },
        {
            title: 'Standard Shipping',
            time: '7-12 Business Days',
            price: 'From $5.00',
            desc: 'Our most popular option for balanced cost and speed. Includes tracking.',
            icon: Truck,
            features: ['Standard tracking', 'Reliable service', 'Global coverage', 'Deliver to PO Box']
        },
        {
            title: 'Economic Shipping',
            time: '15-25 Business Days',
            price: 'Free on $50+',
            desc: 'Cost-effective solutions for non-urgent shipments.',
            icon: Globe,
            features: ['Limited tracking', 'Bulk handling', 'Lowest cost', 'Customs clearance']
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-blue-600">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-gray-900 font-medium">Shipping</span>
                    </nav>

                    <div className="max-w-3xl mb-16">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Global Shipping & Logistics</h1>
                        <p className="text-xl text-gray-600">
                            We ship to over 190 countries worldwide. Our logistics network ensures your products are delivered safely and on time, wherever you are.
                        </p>
                    </div>

                    {/* Shipping Methods */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-20">
                        {shippingMethods.map((method, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                    <method.icon className="w-7 h-7 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-blue-600 font-semibold">{method.time}</span>
                                    <span className="text-gray-300">|</span>
                                    <span className="text-gray-900 font-bold">{method.price}</span>
                                </div>
                                <p className="text-gray-600 mb-6 text-sm">{method.desc}</p>
                                <ul className="space-y-3">
                                    {method.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-3 text-sm text-gray-600">
                                            <Check className="w-4 h-4 text-emerald-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Info Grid */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                        <div className="bg-blue-600 rounded-2xl p-8 lg:p-12 text-white">
                            <h2 className="text-3xl font-bold mb-6">Trade Assurance Shipping</h2>
                            <p className="text-blue-100 mb-8 leading-relaxed">
                                When you choose Ghar Bazaar Trade Assurance, we protect your shipping from payment to delivery. Get a full refund if your order isn't shipped by the date agreed upon in your contract.
                            </p>
                            <Link href="/help">
                                <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
                                    Learn More
                                </button>
                            </Link>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Order Tracking</h3>
                                <p className="text-gray-600">Track your shipment every step of the way with our advanced tracking system. Get SMS and email notifications at every milestone.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Customs & Duties</h3>
                                <p className="text-gray-600">We handle the complex customs paperwork for you. Estimated duties and taxes are shown at checkout for transparency.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Warehousing Solutions</h3>
                                <p className="text-gray-600">Local warehousing options available in major regions to reduce shipping costs and delivery times.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
