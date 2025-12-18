"use client";

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
    width?: string | number;
    height?: string | number;
    animation?: 'pulse' | 'wave' | 'none';
}

export default function Skeleton({
    className = '',
    variant = 'rectangular',
    width,
    height,
    animation = 'pulse',
}: SkeletonProps) {
    const baseClasses = 'bg-gray-200';

    const variantClasses = {
        text: 'rounded',
        circular: 'rounded-full',
        rectangular: '',
        rounded: 'rounded-xl',
    };

    const animationClasses = {
        pulse: 'animate-pulse',
        wave: 'skeleton-wave',
        none: '',
    };

    const style: React.CSSProperties = {
        width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
        height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    };

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
            style={style}
        />
    );
}

// Pre-built skeleton components for common use cases
export function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse">
            <Skeleton variant="rounded" className="aspect-square mb-4" />
            <Skeleton variant="text" height={20} className="mb-2" />
            <Skeleton variant="text" height={16} width="60%" className="mb-3" />
            <div className="flex items-center gap-2">
                <Skeleton variant="text" height={24} width={80} />
                <Skeleton variant="text" height={16} width={50} />
            </div>
        </div>
    );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, idx) => (
                <ProductCardSkeleton key={idx} />
            ))}
        </div>
    );
}

export function ProductDetailSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <Skeleton variant="rounded" className="aspect-square mb-4" />
                    <div className="flex gap-3">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <Skeleton key={idx} variant="rounded" width={80} height={80} />
                        ))}
                    </div>
                </div>
                <div>
                    <Skeleton variant="text" height={36} className="mb-4" />
                    <Skeleton variant="text" height={20} width="50%" className="mb-6" />
                    <Skeleton variant="rounded" height={100} className="mb-6" />
                    <Skeleton variant="text" height={20} className="mb-2" />
                    <Skeleton variant="text" height={20} className="mb-2" />
                    <Skeleton variant="text" height={20} width="80%" className="mb-6" />
                    <div className="flex gap-3">
                        <Skeleton variant="rounded" height={56} className="flex-1" />
                        <Skeleton variant="rounded" height={56} className="flex-1" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CartItemSkeleton() {
    return (
        <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 animate-pulse">
            <Skeleton variant="rounded" width={100} height={100} />
            <div className="flex-1">
                <Skeleton variant="text" height={20} className="mb-2" />
                <Skeleton variant="text" height={16} width="40%" className="mb-3" />
                <div className="flex items-center gap-4">
                    <Skeleton variant="rounded" width={120} height={40} />
                    <Skeleton variant="text" height={24} width={80} />
                </div>
            </div>
        </div>
    );
}

export function OrderCardSkeleton() {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
            <div className="flex items-center justify-between mb-4">
                <Skeleton variant="text" height={20} width={120} />
                <Skeleton variant="rounded" height={24} width={80} />
            </div>
            <div className="flex gap-3 mb-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                    <Skeleton key={idx} variant="rounded" width={60} height={60} />
                ))}
            </div>
            <div className="flex items-center justify-between">
                <Skeleton variant="text" height={16} width={100} />
                <Skeleton variant="text" height={20} width={80} />
            </div>
        </div>
    );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
    return (
        <tr className="animate-pulse">
            {Array.from({ length: columns }).map((_, idx) => (
                <td key={idx} className="px-4 py-3">
                    <Skeleton variant="text" height={20} />
                </td>
            ))}
        </tr>
    );
}

export function PageHeaderSkeleton() {
    return (
        <div className="animate-pulse mb-8">
            <Skeleton variant="text" height={40} width={300} className="mb-2" />
            <Skeleton variant="text" height={20} width={200} />
        </div>
    );
}

export function DealsSectionSkeleton() {
    return (
        <div className="bg-white border border-gray-100 rounded-xl lg:rounded-2xl overflow-hidden shadow-sm animate-pulse mb-8">
            <div className="flex flex-col lg:flex-row h-[320px]">
                <div className="lg:w-[280px] flex-shrink-0 p-8 bg-gray-100 h-full">
                    <Skeleton className="w-24 h-6 mb-4" />
                    <Skeleton className="w-full h-10 mb-4" />
                    <Skeleton className="w-3/4 h-4 mb-8" />
                    <div className="flex gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="w-14 h-14 rounded-xl" />
                        ))}
                    </div>
                </div>
                <div className="flex-1 grid grid-cols-2 lg:grid-cols-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="p-6 border-l border-gray-100">
                            <Skeleton className="aspect-square rounded-xl mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function HotOffersSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-[180px] bg-gray-50 rounded-xl lg:rounded-2xl border border-gray-100 p-5 animate-pulse">
                    <Skeleton className="w-2/3 h-6 mb-2" />
                    <Skeleton className="w-1/2 h-4 mb-4" />
                    <div className="absolute bottom-0 right-0 w-32 h-32">
                        <Skeleton className="w-full h-full rounded-tl-3xl" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function CategoryBlockSkeleton() {
    return (
        <div className="bg-white border border-gray-100 rounded-xl lg:rounded-2xl overflow-hidden shadow-sm animate-pulse mb-8">
            <div className="flex flex-col lg:flex-row h-[320px]">
                <div className="lg:w-[280px] flex-shrink-0 bg-gray-100 h-full p-6">
                    <Skeleton className="w-3/4 h-10 mb-4" />
                    <Skeleton className="w-2/3 h-4 mb-8" />
                    <Skeleton className="w-32 h-10 rounded-xl" />
                </div>
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="p-4 border-l border-b border-gray-100 flex flex-col justify-between">
                            <div>
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                            <div className="flex justify-end">
                                <Skeleton className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function QuoteRequestSkeleton() {
    return (
        <div className="rounded-xl lg:rounded-2xl h-[400px] bg-gray-100 animate-pulse mb-8" />
    );
}

export function ExtraServicesSkeleton() {
    return (
        <div className="mb-8">
            <div className="flex justify-between mb-6">
                <Skeleton className="w-1/3 h-8" />
                <Skeleton className="w-24 h-6" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 overflow-hidden h-64">
                        <Skeleton className="h-32 w-full" />
                        <div className="p-5">
                            <Skeleton className="w-12 h-12 rounded-2xl mb-4" />
                            <Skeleton className="w-full h-5 mb-2" />
                            <Skeleton className="w-2/3 h-4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function SuppliersByRegionSkeleton() {
    return (
        <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 p-8 animate-pulse">
            <div className="flex justify-between mb-6">
                <Skeleton className="w-1/3 h-8" />
                <Skeleton className="w-24 h-6" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex gap-3 mb-2">
                            <Skeleton className="w-8 h-6 rounded" />
                            <Skeleton className="flex-1 h-5" />
                        </div>
                        <Skeleton className="w-full h-3" />
                    </div>
                ))}
            </div>
        </div>
    );
}


