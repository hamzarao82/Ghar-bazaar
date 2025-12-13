import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const HotOffers = () => {
    const offers = [
        {
            title: 'Home & Outdoor',
            subtitle: 'From USD 19',
            image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop',
            bg: 'from-amber-100 to-amber-50',
            textColor: 'text-amber-900',
            href: '/categories/home-outdoor'
        },
        {
            title: 'Consumer Electronics',
            subtitle: 'From USD 29',
            image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=300&fit=crop',
            bg: 'from-blue-100 to-blue-50',
            textColor: 'text-blue-900',
            href: '/categories/electronics'
        },
        {
            title: 'Computer & Tech',
            subtitle: 'From USD 49',
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
            bg: 'from-orange-100 to-orange-50',
            textColor: 'text-orange-900',
            href: '/categories/tech'
        },
        {
            title: 'Gaming Accessories',
            subtitle: 'From USD 15',
            image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=300&fit=crop',
            bg: 'from-teal-100 to-teal-50',
            textColor: 'text-teal-900',
            href: '/categories/gaming'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {offers.map((offer, idx) => (
                <Link key={idx} href={offer.href}>
                    <div className={`
                        group relative h-[180px] rounded-xl lg:rounded-2xl overflow-hidden
                        bg-gradient-to-br ${offer.bg}
                        cursor-pointer transition-all duration-300
                        hover:shadow-xl hover:-translate-y-1
                    `}>
                        {/* Content */}
                        <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                            <div>
                                <h4 className={`font-bold text-lg ${offer.textColor}`}>
                                    {offer.title}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">{offer.subtitle}</p>
                            </div>

                            {/* Arrow */}
                            <div className="flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                                <span>Shop now</span>
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </div>

                        {/* Image */}
                        <div className="absolute bottom-0 right-0 w-32 h-32">
                            <img
                                src={offer.image}
                                alt={offer.title}
                                className="w-full h-full object-cover rounded-tl-3xl group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default HotOffers;
