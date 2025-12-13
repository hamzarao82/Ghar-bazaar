import { Search, Shield, Truck, Settings, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ExtraServices = () => {
    const services = [
        {
            icon: Search,
            title: 'Source from Industry Hubs',
            description: 'Find verified suppliers across global manufacturing centers',
            image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&h=200&fit=crop',
            href: '/services/sourcing',
            color: 'from-blue-500 to-indigo-600'
        },
        {
            icon: Settings,
            title: 'Customize Your Products',
            description: 'Work with manufacturers to create your own branded items',
            image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=200&fit=crop',
            href: '/services/customization',
            color: 'from-purple-500 to-pink-600'
        },
        {
            icon: Truck,
            title: 'Fast, Reliable Shipping',
            description: 'Door-to-door delivery with real-time tracking worldwide',
            image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=200&fit=crop',
            href: '/services/shipping',
            color: 'from-amber-500 to-orange-600'
        },
        {
            icon: Shield,
            title: 'Trade with Confidence',
            description: 'Secure payments and buyer protection on every order',
            image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=200&fit=crop',
            href: '/services/protection',
            color: 'from-emerald-500 to-teal-600'
        }
    ];

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Our Extra Services</h3>
                    <p className="text-sm text-gray-500 mt-1">Everything you need for successful trading</p>
                </div>
                <Link
                    href="/services"
                    className="hidden sm:flex items-center gap-2 text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
                >
                    View All
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {services.map((service, idx) => (
                    <Link key={idx} href={service.href}>
                        <div className="group bg-white rounded-xl lg:rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
                            {/* Image */}
                            <div className="relative h-32 lg:h-36 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative px-5 pb-5 -mt-8">
                                {/* Icon */}
                                <div className={`
                                    w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color}
                                    flex items-center justify-center
                                    shadow-lg mb-4
                                    group-hover:scale-110 transition-transform duration-300
                                `}>
                                    <service.icon className="w-6 h-6 text-white" />
                                </div>

                                <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {service.title}
                                </h4>
                                <p className="text-sm text-gray-500 line-clamp-2">
                                    {service.description}
                                </p>

                                {/* Arrow on hover */}
                                <div className="flex items-center text-blue-600 text-sm font-medium mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                                    <span>Learn more</span>
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ExtraServices;
