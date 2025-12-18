import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Search, Phone, Clock, ExternalLink, ChevronRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'Find a Store | Ghar-Bazaar',
    description: 'Locate Ghar Bazaar verified physical stores and regional distribution centers near you.',
};

export default function StoresPage() {
    const locations = [
        {
            name: 'New York flagship Distribution Center',
            address: '450 West 33rd Street, New York, NY 10001',
            phone: '+1 (212) 555-0123',
            hours: 'Mon-Sat: 8:00 AM - 9:00 PM',
            type: 'Distribution Hub'
        },
        {
            name: 'London Logistics Hub',
            address: '1 Canada Square, Canary Wharf, London E14 5AB',
            phone: '+44 20 7946 0958',
            hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
            type: 'Regional Office'
        },
        {
            name: 'Dubai Trade Zone Center',
            address: 'Sheikh Zayed Rd, Dubai, UAE',
            phone: '+971 4 330 0000',
            hours: 'Sun-Thu: 10:00 AM - 10:00 PM',
            type: 'Trade Showroom'
        },
        {
            name: 'Singapore Asian Gateway',
            address: '10 Collyer Quay, Singapore 049315',
            phone: '+65 6789 0123',
            hours: 'Mon-Sat: 9:00 AM - 8:00 PM',
            type: 'Regional Office'
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
                        <span className="text-gray-900 font-medium">Find a Store</span>
                    </nav>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-6">Find a Location</h1>
                            <p className="text-gray-600 mb-8">Search for Ghar Bazaar verified distribution centers and offices around the world.</p>

                            <div className="space-y-4 mb-10">
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Enter city or zip code..."
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                                    Search Nearby
                                </button>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 italic">
                                <h3 className="font-bold text-blue-900 mb-2">Notice:</h3>
                                <p className="text-blue-700 text-sm">Most locations are distribution centers. For showroom visits, please book an appointment via our contact page.</p>
                            </div>
                        </div>

                        {/* Store List */}
                        <div className="lg:col-span-2 space-y-6">
                            {locations.map((loc, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6">
                                    <div className="w-full md:w-48 h-32 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                                        <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <MapPin className="w-8 h-8" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <div>
                                                <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded uppercase mb-1">
                                                    {loc.type}
                                                </span>
                                                <h3 className="text-xl font-bold text-gray-900">{loc.name}</h3>
                                            </div>
                                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                                <ExternalLink className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-500">
                                            <div className="flex items-start gap-2">
                                                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                                <span>{loc.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 shrink-0" />
                                                <span>{loc.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 shrink-0" />
                                                <span>{loc.hours}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
