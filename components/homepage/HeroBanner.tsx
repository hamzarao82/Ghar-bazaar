"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: 'Electronic Items',
            subtitle: 'Latest trending',
            description: 'Smart gadgets & accessories',
            buttonText: 'Shop Now',
            bg: 'from-blue-900 via-blue-800 to-indigo-900',
            image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1000&auto=format&fit=crop',
        },
        {
            title: 'Fashion Collection',
            subtitle: 'New Arrivals',
            description: 'Trendy clothes & accessories',
            buttonText: 'Explore',
            bg: 'from-purple-900 via-purple-800 to-pink-900',
            image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000&auto=format&fit=crop',
        },
        {
            title: 'Home & Living',
            subtitle: 'Best Deals',
            description: 'Modern furniture & decor',
            buttonText: 'View All',
            bg: 'from-amber-900 via-orange-800 to-red-900',
            image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1000&auto=format&fit=crop',
        },
    ];

    // Auto-slide effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const goToSlide = (index: number) => setCurrentSlide(index);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

    return (
        <div className="relative rounded-xl lg:rounded-2xl overflow-hidden h-[280px] md:h-[320px] lg:h-[360px] group">
            {/* Slides */}
            {slides.map((slide, idx) => (
                <div
                    key={idx}
                    className={`
                        absolute inset-0 transition-all duration-700 ease-in-out
                        ${idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
                    `}
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${slide.image}')` }}
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} opacity-80`} />

                    {/* Animated Particles */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
                                style={{
                                    left: `${20 + i * 15}%`,
                                    top: `${30 + (i % 3) * 20}%`,
                                    animationDelay: `${i * 0.5}s`,
                                    animationDuration: `${3 + i}s`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-center px-6 md:px-10 lg:px-12 z-10">
                        <div className={`max-w-md transition-all duration-700 delay-100 ${idx === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            <p className="text-white/80 text-sm md:text-base font-medium mb-2 tracking-wide">
                                {slide.subtitle}
                            </p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                                {slide.title}
                            </h2>
                            <p className="text-white/70 text-sm md:text-base mb-6">
                                {slide.description}
                            </p>
                            <button className="
                                px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl
                                hover:bg-blue-50 hover:shadow-xl hover:shadow-white/20
                                transform hover:-translate-y-0.5
                                transition-all duration-300
                            ">
                                {slide.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="
                    absolute left-4 top-1/2 -translate-y-1/2
                    w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm
                    text-white flex items-center justify-center
                    opacity-0 group-hover:opacity-100
                    hover:bg-white/20 transition-all duration-300
                    z-20
                "
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button
                onClick={nextSlide}
                className="
                    absolute right-4 top-1/2 -translate-y-1/2
                    w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm
                    text-white flex items-center justify-center
                    opacity-0 group-hover:opacity-100
                    hover:bg-white/20 transition-all duration-300
                    z-20
                "
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`
                            h-2 rounded-full transition-all duration-300
                            ${idx === currentSlide
                                ? 'w-8 bg-white'
                                : 'w-2 bg-white/50 hover:bg-white/70'
                            }
                        `}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroBanner;
