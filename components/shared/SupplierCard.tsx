import { MapPin, Star, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface SupplierCardProps {
    id: string | number;
    name: string;
    country: string;
    flag: string;
    rating?: number;
    reviews?: number;
    isVerified?: boolean;
    yearsInBusiness?: number;
    categories?: string[];
    image?: string;
    href?: string;
    variant?: 'default' | 'compact' | 'horizontal';
}

const SupplierCard = ({
    id,
    name,
    country,
    flag,
    rating = 0,
    reviews = 0,
    isVerified = false,
    yearsInBusiness,
    categories = [],
    image,
    href,
    variant = 'default'
}: SupplierCardProps) => {
    const supplierUrl = href || `/supplier/${id}`;

    // Compact variant for lists
    if (variant === 'compact') {
        return (
            <Link href={supplierUrl}>
                <div className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 cursor-pointer">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 group-hover:scale-105 transition-transform">
                        {image ? (
                            <img src={image} alt={name} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                            name.charAt(0)
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                                {name}
                            </h4>
                            {isVerified && (
                                <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="text-lg">{flag}</span>
                            <span className="truncate">{country}</span>
                        </div>
                    </div>

                    {/* Rating */}
                    {rating > 0 && (
                        <div className="flex items-center gap-1 text-sm">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="font-medium text-gray-700">{rating.toFixed(1)}</span>
                        </div>
                    )}
                </div>
            </Link>
        );
    }

    // Horizontal variant for featured suppliers
    if (variant === 'horizontal') {
        return (
            <Link href={supplierUrl}>
                <div className="group flex bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
                    {/* Image */}
                    <div className="w-48 h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        {image ? (
                            <img src={image} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-6xl font-bold text-white/80">{name.charAt(0)}</span>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                        {name}
                                    </h3>
                                    {isVerified && (
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded-full flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3" />
                                            Verified
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span className="text-lg">{flag}</span>
                                    <MapPin className="w-4 h-4" />
                                    <span>{country}</span>
                                    {yearsInBusiness && (
                                        <>
                                            <span className="text-gray-300">•</span>
                                            <span>{yearsInBusiness} years</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {rating > 0 && (
                                <div className="flex items-center gap-1 px-3 py-1 bg-amber-50 rounded-full">
                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    <span className="font-semibold text-amber-700">{rating.toFixed(1)}</span>
                                    <span className="text-xs text-amber-600">({reviews})</span>
                                </div>
                            )}
                        </div>

                        {/* Categories */}
                        {categories.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {categories.slice(0, 3).map((cat, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                                    >
                                        {cat}
                                    </span>
                                ))}
                                {categories.length > 3 && (
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                        +{categories.length - 3} more
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        );
    }

    // Default variant - card style
    return (
        <Link href={supplierUrl}>
            <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2">
                {/* Header with gradient background */}
                <div className="relative h-28 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600">
                    {/* Pattern overlay */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                            backgroundSize: '20px 20px'
                        }} />
                    </div>

                    {/* Verified badge */}
                    {isVerified && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-1 text-white text-xs font-medium">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                        </div>
                    )}

                    {/* Flag */}
                    <div className="absolute bottom-3 right-3 text-3xl">
                        {flag}
                    </div>
                </div>

                {/* Avatar overlapping header */}
                <div className="relative px-5 -mt-10">
                    <div className="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        {image ? (
                            <img src={image} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-3xl font-bold text-blue-600">{name.charAt(0)}</span>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 pt-3">
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                        {name}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{country}</span>
                        {yearsInBusiness && (
                            <>
                                <span className="text-gray-300">•</span>
                                <span>{yearsInBusiness} yrs</span>
                            </>
                        )}
                    </div>

                    {/* Rating */}
                    {rating > 0 && (
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
                            <span className="text-sm text-gray-400">({reviews})</span>
                        </div>
                    )}

                    {/* Categories */}
                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {categories.slice(0, 2).map((cat, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* CTA */}
                    <div className="flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span>View Profile</span>
                        <ExternalLink className="w-4 h-4 ml-1" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SupplierCard;
