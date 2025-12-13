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
