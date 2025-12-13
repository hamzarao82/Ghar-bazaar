import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    image?: string;
    href?: string;
    variant?: 'default' | 'featured' | 'minimal';
}

const ServiceCard = ({
    icon,
    title,
    description,
    image,
    href = '#',
    variant = 'default'
}: ServiceCardProps) => {
    // Featured variant - larger with image background
    if (variant === 'featured') {
        return (
            <Link href={href}>
                <div className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer">
                    {/* Background Image */}
                    {image && (
                        <img
                            src={image}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mb-4 group-hover:bg-white group-hover:text-blue-600 transition-all duration-300">
                            {icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                        <p className="text-sm text-white/80 line-clamp-2">{description}</p>

                        {/* Arrow */}
                        <div className="mt-4 flex items-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                            <span className="text-sm font-medium">Learn more</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    // Minimal variant - clean and simple
    if (variant === 'minimal') {
        return (
            <Link href={href}>
                <div className="group p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        {icon}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
                </div>
            </Link>
        );
    }

    // Default variant
    return (
        <Link href={href}>
            <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
                {/* Image Area */}
                <div className="relative h-36 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="relative px-6 pb-6 -mt-8">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                        {icon}
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                        {description}
                    </p>

                    {/* Link */}
                    <div className="flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ServiceCard;
