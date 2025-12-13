"use client";

import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home, ArrowLeft, Search } from 'lucide-react';

interface ErrorBoundaryProps {
    error?: Error;
    message?: string;
    onRetry?: () => void;
}

export default function ErrorBoundary({ error, message, onRetry }: ErrorBoundaryProps) {
    return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 mx-auto mb-6 bg-rose-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-rose-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
                <p className="text-gray-600 mb-6">
                    {message || error?.message || 'An unexpected error occurred. Please try again.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Try Again
                        </button>
                    )}
                    <Link href="/">
                        <button className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                            <Home className="w-5 h-5" />
                            Go Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export function NotFound({
    title = "Page not found",
    message = "The page you're looking for doesn't exist or has been moved."
}: { title?: string; message?: string }) {
    return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
            <div className="text-center max-w-md">
                <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/">
                        <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                            <Home className="w-5 h-5" />
                            Go Home
                        </button>
                    </Link>
                    <Link href="/search">
                        <button className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                            <Search className="w-5 h-5" />
                            Search Products
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export function EmptyState({
    icon: Icon = Search,
    title = "No results found",
    message = "We couldn't find what you're looking for.",
    action,
    actionLabel = "Go Back",
    actionHref,
}: {
    icon?: React.ElementType;
    title?: string;
    message?: string;
    action?: () => void;
    actionLabel?: string;
    actionHref?: string;
}) {
    return (
        <div className="min-h-[300px] flex items-center justify-center p-8">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                {(action || actionHref) && (
                    actionHref ? (
                        <Link href={actionHref}>
                            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                                {actionLabel}
                            </button>
                        </Link>
                    ) : (
                        <button
                            onClick={action}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                        >
                            {actionLabel}
                        </button>
                    )
                )}
            </div>
        </div>
    );
}

export function LoadingOverlay({ message = "Loading..." }: { message?: string }) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-700 font-medium">{message}</p>
            </div>
        </div>
    );
}

export function InlineError({ message }: { message: string }) {
    return (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            {message}
        </div>
    );
}

export function SuccessMessage({ message }: { message: string }) {
    return (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {message}
        </div>
    );
}
