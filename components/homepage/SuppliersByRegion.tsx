"use client";

import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const SuppliersByRegion = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const suppliers = [
        { country: 'United Arab Emirates', flag: '🇦🇪', domain: 'ae.gharbazaar.com', suppliers: '2.4k+' },
        { country: 'Australia', flag: '🇦🇺', domain: 'au.gharbazaar.com', suppliers: '1.8k+' },
        { country: 'United States', flag: '🇺🇸', domain: 'us.gharbazaar.com', suppliers: '5.2k+' },
        { country: 'Russia', flag: '🇷🇺', domain: 'ru.gharbazaar.com', suppliers: '1.2k+' },
        { country: 'Italy', flag: '🇮🇹', domain: 'it.gharbazaar.com', suppliers: '980+' },
        { country: 'Germany', flag: '🇩�', domain: 'de.gharbazaar.com', suppliers: '2.1k+' },
        { country: 'France', flag: '🇫🇷', domain: 'fr.gharbazaar.com', suppliers: '1.5k+' },
        { country: 'Japan', flag: '��', domain: 'jp.gharbazaar.com', suppliers: '1.9k+' },
        { country: 'China', flag: '🇨🇳', domain: 'cn.gharbazaar.com', suppliers: '12k+' },
        { country: 'United Kingdom', flag: '🇬🇧', domain: 'uk.gharbazaar.com', suppliers: '3.1k+' }
    ];

    return (
        <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <h3 className="text-2xl font-bold text-gray-900">Suppliers by Region</h3>
                    </div>
                    <p className="text-sm text-gray-500">Connect with verified suppliers worldwide</p>
                </div>
                <Link
                    href="/suppliers"
                    className="flex items-center gap-2 text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
                >
                    View All Regions
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Suppliers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
                {suppliers.map((supplier, idx) => (
                    <Link key={idx} href={`/suppliers/${supplier.country.toLowerCase().replace(/ /g, '-')}`}>
                        <div
                            className={`
                                relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
                                ${hoveredIndex === idx
                                    ? 'border-blue-200 bg-blue-50 shadow-lg shadow-blue-500/10'
                                    : 'border-transparent bg-gray-50 hover:bg-gray-100'
                                }
                            `}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="flex items-center gap-3">
                                {/* Flag */}
                                <span className="text-3xl">{supplier.flag}</span>

                                {/* Info */}
                                <div className="min-w-0">
                                    <p className={`
                                        font-semibold text-sm truncate transition-colors
                                        ${hoveredIndex === idx ? 'text-blue-600' : 'text-gray-800'}
                                    `}>
                                        {supplier.country}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">{supplier.domain}</p>
                                </div>
                            </div>

                            {/* Supplier Count */}
                            <div className={`
                                mt-3 flex items-center justify-between text-xs
                                transition-opacity duration-300
                                ${hoveredIndex === idx ? 'opacity-100' : 'opacity-70'}
                            `}>
                                <span className="text-gray-500">Suppliers:</span>
                                <span className="font-bold text-blue-600">{supplier.suppliers}</span>
                            </div>

                            {/* Arrow on hover */}
                            <div className={`
                                absolute right-3 top-1/2 -translate-y-1/2
                                transition-all duration-300
                                ${hoveredIndex === idx ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                            `}>
                                <ArrowRight className="w-4 h-4 text-blue-600" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SuppliersByRegion;
