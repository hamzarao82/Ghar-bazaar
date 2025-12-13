import Link from 'next/link';
import { Globe, ChevronDown, Smartphone, Apple, PlayCircle } from 'lucide-react';

const Topbar = () => {
    return (
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 hidden md:block">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between text-xs">
                {/* Left Links */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/about"
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                        About Us
                    </Link>
                    <Link
                        href="/contact"
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                        Contacts
                    </Link>
                    <Link
                        href="/stores"
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                        Find a Store
                    </Link>
                    <Link
                        href="/track-order"
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                        Track Orders
                    </Link>

                    {/* Special Promo */}
                    <div className="hidden lg:flex items-center gap-2 ml-4 px-3 py-1 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full border border-orange-500/30">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        <span className="text-orange-300 font-medium">Free shipping on orders $50+</span>
                    </div>
                </div>

                {/* Right Options */}
                <div className="flex items-center gap-6">
                    {/* Get App */}
                    <div className="group relative flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors duration-200">
                        <Smartphone className="w-4 h-4" />
                        <span>Get App</span>
                        <ChevronDown className="w-3 h-3" />

                        {/* App Dropdown */}
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <p className="px-4 text-xs text-gray-500 mb-2">Download our app</p>
                            <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                                <Apple className="w-5 h-5" />
                                <div>
                                    <p className="text-[10px] text-gray-400">Download on</p>
                                    <p className="text-sm font-medium">App Store</p>
                                </div>
                            </a>
                            <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                                <PlayCircle className="w-5 h-5" />
                                <div>
                                    <p className="text-[10px] text-gray-400">GET IT ON</p>
                                    <p className="text-sm font-medium">Google Play</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="h-4 w-px bg-gray-600" />

                    {/* Language/Currency */}
                    <div className="group relative flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors duration-200">
                        <Globe className="w-4 h-4" />
                        <span>English, USD</span>
                        <ChevronDown className="w-3 h-3" />

                        {/* Language Dropdown */}
                        <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            {['English', 'Español', 'Français', 'Deutsch', '中文'].map((lang) => (
                                <button
                                    key={lang}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="h-4 w-px bg-gray-600" />

                    {/* Ship To */}
                    <div className="group relative flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors duration-200">
                        <span className="text-base">🇺🇸</span>
                        <span>Ship to</span>
                        <ChevronDown className="w-3 h-3" />

                        {/* Country Dropdown */}
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            {[
                                { flag: '🇺🇸', name: 'United States' },
                                { flag: '🇬🇧', name: 'United Kingdom' },
                                { flag: '🇨🇦', name: 'Canada' },
                                { flag: '🇦🇺', name: 'Australia' },
                                { flag: '🇩🇪', name: 'Germany' },
                                { flag: '🇫🇷', name: 'France' },
                            ].map((country) => (
                                <button
                                    key={country.name}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                >
                                    <span className="text-lg">{country.flag}</span>
                                    <span>{country.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
