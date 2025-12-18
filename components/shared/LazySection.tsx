"use client";

import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface LazySectionProps {
    children: ReactNode;
    fallback?: ReactNode;
    rootMargin?: string;
    threshold?: number;
}

export default function LazySection({
    children,
    fallback = null,
    rootMargin = '100px',
    threshold = 0.01,
}: LazySectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || isVisible) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin, threshold }
        );

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [isVisible, rootMargin, threshold]);

    return (
        <div ref={containerRef} className="min-h-[100px]">
            {isVisible ? children : fallback}
        </div>
    );
}
