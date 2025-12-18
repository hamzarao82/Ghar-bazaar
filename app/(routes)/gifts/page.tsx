import { Metadata } from 'next';
import Link from 'next/link';
import { Gift, Heart, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'Gift Ideas | Ghar-Bazaar',
    description: 'Find the perfect gift for every occasion. Curated collections of the best gift products for family, friends, and colleagues.',
};

export default function GiftsPage() {
    const giftCollections = [
        { title: 'For Tech Lovers', image: 'https://images.unsplash.com/photo-1526733158208-59833e134a53?w=400&h=300&fit=crop', items: '120+ items', query: 'electronics' },
        { title: 'Home Decor', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&h=300&fit=crop', items: '80+ items', query: 'home-garden' },
        { title: 'Fashion Finds', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop', items: '200+ items', query: 'fashion' },
        { title: 'Fitness Gear', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop', items: '60+ items', query: 'fitness' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-blue-600">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-gray-900 font-medium">Gift Ideas</span>
                    </nav>

                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl mb-4">
                            <Gift className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">The Perfect Gift Awaits</h1>
                        <p className="text-gray-600">Discover handpicked gift ideas for every occasion, budget, and personality. Make their day special with a thoughtful choice from Ghar-Bazaar.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                        {giftCollections.map((col, idx) => (
                            <Link
                                key={idx}
                                href={`/categories/${col.query}`}
                                className="group relative h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                            >
                                <img src={col.image} alt={col.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-xl font-bold text-white mb-1">{col.title}</h3>
                                    <p className="text-white/70 text-sm mb-4">{col.items}</p>
                                    <div className="inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all underline decoration-rose-500 decoration-2 underline-offset-4">
                                        Shop Highlights
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Occasion Section */}
                    <div className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Shop by Occasion</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {['Birthday', 'Anniversary', 'Wedding', 'Corporate'].map((occ) => (
                                <Link
                                    key={occ}
                                    href={`/search?q=${occ.toLowerCase()}`}
                                    className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 hover:bg-rose-50 hover:text-rose-600 transition-all border border-transparent hover:border-rose-100"
                                >
                                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                                        <Heart className="w-6 h-6 text-rose-500" />
                                    </div>
                                    <span className="font-bold">{occ}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
