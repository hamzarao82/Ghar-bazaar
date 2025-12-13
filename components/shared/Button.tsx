"use client";

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    fullWidth?: boolean;
    children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    children,
    className = '',
    disabled,
    ...props
}, ref) => {
    // Base styles
    const baseStyles = `
        inline-flex items-center justify-center gap-2
        font-medium rounded-lg
        transition-all duration-200 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
        active:scale-[0.98]
    `;

    // Variant styles
    const variants = {
        primary: `
            bg-gradient-to-r from-blue-600 to-blue-700
            text-white
            hover:from-blue-700 hover:to-blue-800
            hover:shadow-lg hover:shadow-blue-500/25
            focus-visible:ring-blue-500
        `,
        secondary: `
            bg-white border-2 border-gray-200
            text-gray-700
            hover:bg-gray-50 hover:border-gray-300
            focus-visible:ring-gray-400
        `,
        ghost: `
            bg-transparent
            text-gray-600
            hover:bg-gray-100 hover:text-gray-900
            focus-visible:ring-gray-400
        `,
        outline: `
            bg-transparent border-2 border-blue-500
            text-blue-600
            hover:bg-blue-50
            focus-visible:ring-blue-500
        `,
        danger: `
            bg-gradient-to-r from-rose-500 to-rose-600
            text-white
            hover:from-rose-600 hover:to-rose-700
            hover:shadow-lg hover:shadow-rose-500/25
            focus-visible:ring-rose-500
        `,
        success: `
            bg-gradient-to-r from-emerald-500 to-emerald-600
            text-white
            hover:from-emerald-600 hover:to-emerald-700
            hover:shadow-lg hover:shadow-emerald-500/25
            focus-visible:ring-emerald-500
        `
    };

    // Size styles
    const sizes = {
        sm: 'text-xs px-3 py-1.5 min-h-[32px]',
        md: 'text-sm px-4 py-2 min-h-[40px]',
        lg: 'text-base px-6 py-2.5 min-h-[48px]',
        xl: 'text-lg px-8 py-3 min-h-[56px]'
    };

    return (
        <button
            ref={ref}
            className={`
                ${baseStyles}
                ${variants[variant]}
                ${sizes[size]}
                ${fullWidth ? 'w-full' : ''}
                ${className}
            `.replace(/\s+/g, ' ').trim()}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : leftIcon}

            <span>{children}</span>

            {!isLoading && rightIcon}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
