"use client";

import { useState, useEffect } from 'react';
import { Flame, Clock, ArrowRight } from 'lucide-react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const DealsSection = () => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 4, hours: 13, minutes: 34, seconds: 56 });

    const deals = [
        { name: 'Smart Watches', discount: 25, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop', originalPrice: 299, salePrice: 224 },
        { name: 'Laptops', discount: 15, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop', originalPrice: 999, salePrice: 849 },
        { name: 'Cameras', discount: 40, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop', originalPrice: 799, salePrice: 479 },
        { name: 'Headphones', discount: 25, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop', originalPrice: 199, salePrice: 149 },
        { name: 'Smartphones', discount: 45, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop', originalPrice: 899, salePrice: 494 },
    ];

    // Countdown timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, minutes, seconds } = prev;
                seconds--;
                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                    if (minutes < 0) {
                        minutes = 59;
                        hours--;
                        if (hours < 0) {
                            hours = 23;
                            days--;
                            if (days < 0) {
                                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
                            }
                        }
                    }
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-white border border-gray-100 rounded-xl lg:rounded-2xl overflow-hidden shadow-sm">
            <div className="flex flex-col lg:flex-row">
                {/* Left Timer Section */}
                <div className="lg:w-[280px] flex-shrink-0 p-6 lg:p-8 bg-gradient-to-br from-rose-500 via-rose-600 to-orange-500 text-white relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                            backgroundSize: '20px 20px'
                        }} />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <Flame className="w-6 h-6" />
                            <span className="text-sm font-medium uppercase tracking-wider">Flash Sale</span>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold mb-2">Deals & Offers</h3>
                        <p className="text-white/80 text-sm mb-6">Electronics & Gadgets</p>

                        {/* Timer */}
                        <div className="flex gap-2">
                            {[
                                { label: 'Days', value: timeLeft.days },
                                { label: 'Hours', value: timeLeft.hours },
                                { label: 'Min', value: timeLeft.minutes },
                                { label: 'Sec', value: timeLeft.seconds },
                            ].map((item) => (
                                <div key={item.label} className="flex flex-col items-center">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-1">
                                        <span className="text-2xl font-bold">{String(item.value).padStart(2, '0')}</span>
                                    </div>
                                    <span className="text-[10px] uppercase font-medium text-white/70">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* View All Button */}
                        <button className="mt-6 flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors group">
                            <span>View All Deals</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Right Deals Grid */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                    {deals.map((deal, idx) => (
                        <div
                            key={idx}
                            className="group relative p-4 lg:p-6 border-l border-b border-gray-100 hover:bg-gradient-to-b hover:from-white hover:to-blue-50 transition-all duration-300 cursor-pointer"
                        >
                            {/* Image */}
                            <div className="relative aspect-square mb-3 overflow-hidden rounded-xl bg-gray-50">
                                <img
                                    src={deal.image}
                                    alt={deal.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Discount Badge */}
                                <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-bold rounded-lg shadow-lg">
                                    -{deal.discount}%
                                </div>
                            </div>

                            {/* Content */}
                            <h4 className="text-sm font-semibold text-gray-800 text-center mb-2 group-hover:text-blue-600 transition-colors">
                                {deal.name}
                            </h4>

                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-bold text-blue-600">${deal.salePrice}</span>
                                <span className="text-xs text-gray-400 line-through">${deal.originalPrice}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DealsSection;
