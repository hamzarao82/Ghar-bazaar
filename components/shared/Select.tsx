"use client";

import { forwardRef, SelectHTMLAttributes, ReactNode } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    label?: string;
    helperText?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
    leftIcon?: ReactNode;
    selectSize?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'filled';
    fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    helperText,
    error,
    options,
    placeholder = 'Select an option',
    leftIcon,
    selectSize = 'md',
    variant = 'default',
    fullWidth = true,
    className = '',
    disabled,
    ...props
}, ref) => {
    // Size styles
    const sizes = {
        sm: 'text-xs py-2 px-3',
        md: 'text-sm py-2.5 px-4',
        lg: 'text-base py-3 px-5'
    };

    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
    };

    // Variant styles
    const variants = {
        default: `
            bg-white border-2 border-gray-200 rounded-xl
            focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
            hover:border-gray-300
        `,
        filled: `
            bg-gray-100 border-2 border-transparent rounded-xl
            focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
            hover:bg-gray-200
        `
    };

    // Error styles
    const errorStyles = error
        ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/10'
        : '';

    return (
        <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
            {/* Label */}
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                </label>
            )}

            {/* Select Container */}
            <div className="relative">
                {/* Left Icon */}
                {leftIcon && (
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${iconSizes[selectSize]}`}>
                        {leftIcon}
                    </div>
                )}

                {/* Select */}
                <select
                    ref={ref}
                    className={`
                        w-full appearance-none cursor-pointer
                        ${sizes[selectSize]}
                        ${variants[variant]}
                        ${errorStyles}
                        ${leftIcon ? 'pl-10' : ''}
                        pr-10
                        transition-all duration-200
                        outline-none
                        disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-50
                    `.replace(/\s+/g, ' ').trim()}
                    disabled={disabled}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Right Icons */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                    {error && (
                        <AlertCircle className={`${iconSizes[selectSize]} text-rose-500`} />
                    )}
                    <ChevronDown className={`${iconSizes[selectSize]} text-gray-400`} />
                </div>
            </div>

            {/* Helper Text / Error Message */}
            {(helperText || error) && (
                <p className={`mt-1.5 text-xs ${error ? 'text-rose-500' : 'text-gray-500'}`}>
                    {error || helperText}
                </p>
            )}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;
