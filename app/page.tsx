import { User, ChevronRight, Gift, Zap } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Header from '../components/layout/Header';
import Topbar from '../components/layout/Topbar';
import Footer from '../components/layout/Footer';
import CategorySidebar from '../components/homepage/CategorySidebar';
import HeroBanner from '../components/homepage/HeroBanner';
import LazySection from '../components/shared/LazySection';
import {
  DealsSectionSkeleton,
  HotOffersSkeleton,
  CategoryBlockSkeleton,
  QuoteRequestSkeleton,
  ProductGridSkeleton,
  ExtraServicesSkeleton,
  SuppliersByRegionSkeleton
} from '../components/shared/Skeleton';

// Dynamic imports for sections below the fold
const DealsSection = dynamic(() => import('../components/homepage/DealsSection'), {
  loading: () => <DealsSectionSkeleton />
});

const HotOffers = dynamic(() => import('../components/homepage/HotOffers'), {
  loading: () => <HotOffersSkeleton />
});

const CategoryBlock = dynamic(() => import('../components/homepage/CategoryBlock'), {
  loading: () => <CategoryBlockSkeleton />
});

const QuoteRequestSection = dynamic(() => import('../components/homepage/QuoteRequestSection'), {
  loading: () => <QuoteRequestSkeleton />
});

const RecommendedItems = dynamic(() => import('../components/homepage/RecommendedItems'), {
  loading: () => <div className="space-y-6"><div className="h-8 w-48 bg-gray-200 rounded animate-pulse" /><ProductGridSkeleton count={5} /></div>
});

const ExtraServices = dynamic(() => import('../components/homepage/ExtraServices'), {
  loading: () => <ExtraServicesSkeleton />
});

const SuppliersByRegion = dynamic(() => import('../components/homepage/SuppliersByRegion'), {
  loading: () => <SuppliersByRegionSkeleton />
});

const NewsletterSection = dynamic(() => import('../components/homepage/NewsletterSection'), {
  loading: () => <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

        {/* Hero Section: Sidebar + Banner + User Panel - Static for SEO & LCP */}
        <section className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 p-4 lg:p-5 shadow-sm">
          <div className="flex gap-4 lg:gap-5">
            <CategorySidebar />
            <div className="flex-1 min-w-0">
              <HeroBanner />
            </div>

            <div className="w-56 hidden xl:flex flex-col gap-3 flex-shrink-0">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Hi, Guest</p>
                    <p className="text-xs text-gray-500">Welcome back!</p>
                  </div>
                </div>
                <Link href="/register">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm py-2.5 rounded-lg mb-2 hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30">
                    Join Now
                  </button>
                </Link>
                <Link href="/login">
                  <button className="w-full bg-white text-blue-600 border-2 border-blue-200 text-sm py-2 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all font-medium">
                    Log In
                  </button>
                </Link>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4 flex-1 flex flex-col justify-center cursor-pointer hover:shadow-lg hover:shadow-orange-500/30 transition-all group">
                <div className="flex items-center gap-2 mb-1">
                  <Gift className="w-5 h-5" />
                  <span className="font-semibold text-sm">Get $10 off</span>
                </div>
                <p className="text-xs text-white/80">With a new supplier</p>
                <ChevronRight className="w-4 h-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-xl p-4 flex-1 flex flex-col justify-center cursor-pointer hover:shadow-lg hover:shadow-teal-500/30 transition-all group">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-5 h-5" />
                  <span className="font-semibold text-sm">Quick RFQ</span>
                </div>
                <p className="text-xs text-white/80">Send quotes instantly</p>
                <ChevronRight className="w-4 h-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </section>

        {/* Following sections are loaded on demand as user scrolls */}
        <section>
          <LazySection fallback={<DealsSectionSkeleton />}>
            <DealsSection />
          </LazySection>
        </section>

        <section>
          <LazySection fallback={<HotOffersSkeleton />}>
            <HotOffers />
          </LazySection>
        </section>

        <section>
          <LazySection fallback={<CategoryBlockSkeleton />}>
            <CategoryBlock
              title="Home and Outdoor"
              bgImage="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1000&auto=format&fit=crop"
              href="/categories/home-outdoor"
            />
          </LazySection>
        </section>

        <section>
          <LazySection fallback={<CategoryBlockSkeleton />}>
            <CategoryBlock
              title="Consumer Electronics"
              bgImage="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000&auto=format&fit=crop"
              href="/categories/electronics"
            />
          </LazySection>
        </section>

        <section>
          <LazySection fallback={<QuoteRequestSkeleton />}>
            <QuoteRequestSection />
          </LazySection>
        </section>

        <section>
          <LazySection fallback={<div className="space-y-6"><div className="h-8 w-48 bg-gray-200 rounded animate-pulse" /><ProductGridSkeleton count={5} /></div>}>
            <RecommendedItems />
          </LazySection>
        </section>

        <section>
          <LazySection fallback={<ExtraServicesSkeleton />}>
            <ExtraServices />
          </LazySection>
        </section>

        <section>
          <LazySection fallback={<SuppliersByRegionSkeleton />}>
            <SuppliersByRegion />
          </LazySection>
        </section>
      </main>

      <div className="mt-12">
        <LazySection fallback={<div className="h-64 bg-gray-100 rounded-xl animate-pulse" />}>
          <NewsletterSection />
        </LazySection>
        <Footer />
      </div>
    </div>
  );
}

