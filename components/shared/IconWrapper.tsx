import { ReactNode } from 'react';

interface IconWrapperProps {
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'gradient';
    rounded?: boolean;
    className?: string;
}

const IconWrapper = ({
    children,
    size = 'md',
    variant = 'default',
    rounded = true,
    className = ''
}: IconWrapperProps) => {
    // Size mappings
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    // Variant mappings
    const variants = {
        default: 'bg-gray-100 text-gray-600',
        primary: 'bg-blue-100 text-blue-600',
        success: 'bg-emerald-100 text-emerald-600',
        warning: 'bg-amber-100 text-amber-600',
        danger: 'bg-rose-100 text-rose-600',
        gradient: 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
    };

    return (
        <div
            className={`
                ${sizes[size]}
                ${variants[variant]}
                ${rounded ? 'rounded-full' : 'rounded-xl'}
                flex items-center justify-center
                transition-all duration-200
                ${className}
            `.replace(/\s+/g, ' ').trim()}
        >
            {children}
        </div>
    );
};

export default IconWrapper;
