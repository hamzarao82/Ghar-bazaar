"use client";

import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Topbar />
            <Header />

            <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full text-center">
                    <div className="relative mb-8">
                        <h1 className="text-9xl font-black text-gray-200 select-none">404</h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 bg-blue-600 rounded-2xl rotate-12 flex items-center justify-center shadow-xl shadow-blue-500/30">
                                <Search className="w-12 h-12 text-white -rotate-12" />
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
                    <p className="text-gray-500 mb-10">
                        Oops! The page you're looking for doesn't exist or has been moved.
                        Let's get you back on track.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <Link
                            href="/"
                            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                        >
                            <Home className="w-5 h-5" />
                            Go Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto px-8 py-3 bg-white border-2 border-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Go Back
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
