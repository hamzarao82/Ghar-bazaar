"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    helperText?: string;
    error?: string;
    success?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    inputSize?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'filled' | 'underlined';
    fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    helperText,
    error,
    success,
    leftIcon,
    rightIcon,
    inputSize = 'md',
    variant = 'default',
    fullWidth = true,
    type = 'text',
    className = '',
    disabled,
    ...props
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

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
        `,
        underlined: `
            bg-transparent border-b-2 border-gray-200 rounded-none
            focus:border-blue-500
            hover:border-gray-300
            px-0
        `
    };

    // State styles
    const stateStyles = error
        ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/10'
        : success
            ? 'border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/10'
            : '';

    return (
        <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
            {/* Label */}
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                </label>
            )}

            {/* Input Container */}
            <div className="relative">
                {/* Left Icon */}
                {leftIcon && (
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ${iconSizes[inputSize]}`}>
                        {leftIcon}
                    </div>
                )}

                {/* Input */}
                <input
                    ref={ref}
                    type={inputType}
                    className={`
                        w-full
                        ${sizes[inputSize]}
                        ${variants[variant]}
                        ${stateStyles}
                        ${leftIcon ? 'pl-10' : ''}
                        ${rightIcon || isPassword || error || success ? 'pr-10' : ''}
                        transition-all duration-200
                        outline-none
                        placeholder:text-gray-400
                        disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-50
                    `.replace(/\s+/g, ' ').trim()}
                    disabled={disabled}
                    {...props}
                />

                {/* Right Icon / Password Toggle / Status Icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {error && (
                        <AlertCircle className={`${iconSizes[inputSize]} text-rose-500`} />
                    )}
                    {success && !error && (
                        <CheckCircle2 className={`${iconSizes[inputSize]} text-emerald-500`} />
                    )}
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeOff className={iconSizes[inputSize]} />
                            ) : (
                                <Eye className={iconSizes[inputSize]} />
                            )}
                        </button>
                    )}
                    {rightIcon && !isPassword && !error && !success && rightIcon}
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

Input.displayName = 'Input';

export default Input;
