import { Metadata } from 'next';
import Link from 'next/link';
import { Grid3X3, ArrowRight, ChevronRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';
import { categories } from '@/data/categories';

export const metadata: Metadata = {
    title: 'All Categories | Ghar-Bazaar',
    description: 'Browse all product categories and find exactly what you are looking for on Ghar-Bazaar.',
};

export default function CategoriesPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-medium">All Categories</span>
                </nav>

                <div className="mb-10 text-center max-w-2xl mx-auto">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-4">
                        <Grid3X3 className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Browse by Category</h1>
                    <p className="text-gray-600">
                        Explore our wide range of products across all categories. From the latest electronics to trendy fashion, find everything you need in one place.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Category Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                                    <span className="text-3xl">{category.icon}</span>
                                    <div>
                                        <h2 className="text-xl font-bold text-white leading-none">{category.name}</h2>
                                        <p className="text-white/80 text-sm mt-1">{category.productCount.toLocaleString()} products</p>
                                    </div>
                                </div>
                            </div>

                            {/* Subcategories */}
                            <div className="p-6">
                                <div className="space-y-3 mb-6">
                                    {category.subcategories?.slice(0, 5).map((sub) => (
                                        <Link
                                            key={sub.id}
                                            href={`/categories/${sub.slug}`}
                                            className="flex items-center justify-between text-gray-600 hover:text-blue-600 transition-colors group/link"
                                        >
                                            <span className="text-sm">{sub.name}</span>
                                            <ChevronRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                        </Link>
                                    ))}
                                </div>

                                <Link
                                    href={`/categories/${category.slug}`}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all group/btn"
                                >
                                    View All {category.name}
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
