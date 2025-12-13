"use client";

// Accessibility utility hooks and helpers

import { useEffect, useRef, useCallback } from 'react';

/**
 * Trap focus within a container (useful for modals, dropdowns)
 */
export function useFocusTrap(isActive: boolean = true) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isActive || !containerRef.current) return;

        const container = containerRef.current;
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        // Focus first element on mount
        firstElement?.focus();

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isActive]);

    return containerRef;
}

/**
 * Handle escape key press
 */
export function useEscapeKey(callback: () => void, isActive: boolean = true) {
    useEffect(() => {
        if (!isActive) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                callback();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [callback, isActive]);
}

/**
 * Announce to screen readers
 */
export function useAnnounce() {
    const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', priority);
        announcer.setAttribute('aria-atomic', 'true');
        announcer.setAttribute('class', 'sr-only');
        announcer.textContent = message;

        document.body.appendChild(announcer);
        setTimeout(() => announcer.remove(), 1000);
    }, []);

    return announce;
}

/**
 * Skip to main content link
 */
export function SkipToMain() {
    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:font-semibold"
        >
            Skip to main content
        </a>
    );
}

/**
 * Visually hidden text for screen readers
 */
export function VisuallyHidden({ children }: { children: React.ReactNode }) {
    return (
        <span className="sr-only">
            {children}
        </span>
    );
}

/**
 * Focus visible ring styles
 */
export const focusRingClass = 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';

/**
 * ARIA labels for common icons
 */
export const ariaLabels = {
    close: 'Close',
    menu: 'Open menu',
    search: 'Search',
    cart: 'Shopping cart',
    wishlist: 'Wishlist',
    profile: 'User profile',
    home: 'Go to homepage',
    back: 'Go back',
    next: 'Next',
    previous: 'Previous',
    expand: 'Expand',
    collapse: 'Collapse',
    loading: 'Loading',
    externalLink: 'Opens in new tab',
};

/**
 * Generate unique ID for form elements
 */
let idCounter = 0;
export function generateId(prefix: string = 'gb') {
    return `${prefix}-${++idCounter}`;
}

/**
 * Reduce motion preference check
 */
export function usePrefersReducedMotion() {
    const mediaQuery = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;

    return mediaQuery?.matches ?? false;
}

/**
 * High contrast mode check
 */
export function usePrefersHighContrast() {
    const mediaQuery = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-contrast: more)')
        : null;

    return mediaQuery?.matches ?? false;
}
