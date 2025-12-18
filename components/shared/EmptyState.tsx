"use client";

import React from 'react';
import Link from 'next/link';
import { LucideIcon, ShoppingBag, Search, Heart, PackageSearch } from 'lucide-react';

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description: string;
    actionText?: string;
    actionHref?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    icon: Icon = ShoppingBag,
    title,
    description,
    actionText,
    actionHref
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Icon className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 max-w-sm mb-8">{description}</p>
            {actionText && actionHref && (
                <Link
                    href={actionHref}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                >
                    {actionText}
                </Link>
            )}
        </div>
    );
};

export default EmptyState;
