"use client";

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
    color?: 'primary' | 'white' | 'gray';
    text?: string;
    fullScreen?: boolean;
}

const Loader = ({
    size = 'md',
    variant = 'spinner',
    color = 'primary',
    text,
    fullScreen = false
}: LoaderProps) => {
    // Size mappings
    const sizes = {
        sm: { spinner: 'w-4 h-4', dots: 'w-2 h-2', bars: 'w-1 h-4' },
        md: { spinner: 'w-8 h-8', dots: 'w-3 h-3', bars: 'w-1.5 h-6' },
        lg: { spinner: 'w-12 h-12', dots: 'w-4 h-4', bars: 'w-2 h-8' },
        xl: { spinner: 'w-16 h-16', dots: 'w-5 h-5', bars: 'w-2.5 h-10' }
    };

    // Color mappings
    const colors = {
        primary: 'text-blue-600',
        white: 'text-white',
        gray: 'text-gray-400'
    };

    const bgColors = {
        primary: 'bg-blue-600',
        white: 'bg-white',
        gray: 'bg-gray-400'
    };

    // Spinner Loader
    const SpinnerLoader = () => (
        <div className={`${sizes[size].spinner} ${colors[color]}`}>
            <svg
                className="animate-spin"
                viewBox="0 0 24 24"
                fill="none"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        </div>
    );

    // Dots Loader
    const DotsLoader = () => (
        <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className={`
                        ${sizes[size].dots}
                        ${bgColors[color]}
                        rounded-full
                        animate-bounce
                    `}
                    style={{
                        animationDelay: `${i * 0.15}s`,
                        animationDuration: '0.6s'
                    }}
                />
            ))}
        </div>
    );

    // Pulse Loader
    const PulseLoader = () => (
        <div className="relative flex items-center justify-center">
            <div className={`${sizes[size].spinner} ${bgColors[color]} rounded-full opacity-75 animate-ping absolute`} />
            <div className={`${sizes[size].spinner} ${bgColors[color]} rounded-full opacity-90`} />
        </div>
    );

    // Bars Loader
    const BarsLoader = () => (
        <div className="flex items-center gap-1">
            {[0, 1, 2, 3].map((i) => (
                <div
                    key={i}
                    className={`
                        ${sizes[size].bars}
                        ${bgColors[color]}
                        rounded-full
                        animate-pulse
                    `}
                    style={{
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '0.8s',
                        transform: `scaleY(${0.5 + (i % 2) * 0.5})`
                    }}
                />
            ))}
        </div>
    );

    const loaders = {
        spinner: SpinnerLoader,
        dots: DotsLoader,
        pulse: PulseLoader,
        bars: BarsLoader
    };

    const LoaderComponent = loaders[variant];

    const content = (
        <div className="flex flex-col items-center justify-center gap-3">
            <LoaderComponent />
            {text && (
                <p className={`text-sm font-medium ${colors[color]}`}>
                    {text}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                {content}
            </div>
        );
    }

    return content;
};

export default Loader;
