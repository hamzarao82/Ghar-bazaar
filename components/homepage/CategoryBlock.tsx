import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CategoryBlockProps {
    title: string;
    bgImage: string;
    href?: string;
}

const CategoryBlock = ({ title, bgImage, href = '#' }: CategoryBlockProps) => {
    const products = [
        { name: 'Smart Watch Pro', price: 'From $89', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop' },
        { name: 'Wireless Earbuds', price: 'From $39', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop' },
        { name: 'Laptop Stand', price: 'From $29', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop' },
        { name: 'Bluetooth Speaker', price: 'From $25', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop' },
        { name: 'Phone Holder', price: 'From $12', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=200&fit=crop' },
        { name: 'USB Hub', price: 'From $19', image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=200&h=200&fit=crop' },
        { name: 'Keyboard', price: 'From $45', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop' },
        { name: 'Mouse Pad', price: 'From $15', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop' },
    ];

    return (
        <div className="bg-white border border-gray-100 rounded-xl lg:rounded-2xl overflow-hidden shadow-sm">
            <div className="flex flex-col lg:flex-row h-auto lg:h-[320px]">
                {/* Left Banner Side */}
                <div
                    className="lg:w-[280px] h-48 lg:h-full flex-shrink-0 relative overflow-hidden"
                    style={{
                        backgroundImage: `url('${bgImage}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-6">
                        <div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-2">
                                {title}
                            </h3>
                            <p className="text-white/80 text-sm">
                                Top quality products at best prices
                            </p>
                        </div>

                        <Link
                            href={href}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors w-fit shadow-lg"
                        >
                            Source now
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Right Product Grid */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4">
                    {products.map((product, idx) => (
                        <Link key={idx} href={`/product/${idx + 1}`}>
                            <div className="group h-full p-4 border-l border-b border-gray-100 hover:bg-gradient-to-b hover:from-white hover:to-blue-50/50 transition-all duration-300 cursor-pointer flex flex-col">
                                {/* Product Info */}
                                <div className="mb-3">
                                    <p className="text-sm font-medium text-gray-800 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                        {product.name}
                                    </p>
                                    <p className="text-xs text-gray-500">{product.price}</p>
                                </div>

                                {/* Product Image */}
                                <div className="flex-1 flex items-end justify-end">
                                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden bg-gray-50 group-hover:scale-105 transition-transform duration-300">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryBlock;
