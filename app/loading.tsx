"use client";

import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-100 rounded-full" />
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin absolute inset-0" />
            </div>
            <p className="mt-4 text-gray-500 font-medium animate-pulse">
                Loading Ghar-Bazaar...
            </p>
        </div>
    );
}
