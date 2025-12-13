import { User, ChevronRight, Gift, Zap } from 'lucide-react';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Topbar from '../components/layout/Topbar';
import Footer from '../components/layout/Footer';
import CategorySidebar from '../components/homepage/CategorySidebar';
import HeroBanner from '../components/homepage/HeroBanner';
import DealsSection from '../components/homepage/DealsSection';
import HotOffers from '../components/homepage/HotOffers';
import QuoteRequestSection from '../components/homepage/QuoteRequestSection';
import NewsletterSection from '../components/homepage/NewsletterSection';
import RecommendedItems from '../components/homepage/RecommendedItems';
import ExtraServices from '../components/homepage/ExtraServices';
import SuppliersByRegion from '../components/homepage/SuppliersByRegion';
import CategoryBlock from '../components/homepage/CategoryBlock';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

        {/* Hero Section: Sidebar + Banner + User Panel */}
        <section className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 p-4 lg:p-5 shadow-sm">
          <div className="flex gap-4 lg:gap-5">
            {/* Category Sidebar - Hidden on mobile */}
            <CategorySidebar />

            {/* Hero Banner - Flexible width */}
            <div className="flex-1 min-w-0">
              <HeroBanner />
            </div>

            {/* User Panel - Hidden on mobile/tablet */}
            <div className="w-56 hidden xl:flex flex-col gap-3 flex-shrink-0">
              {/* User Greeting Card */}
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

              {/* Promo Cards */}
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

        {/* Deals Section */}
        <section>
          <DealsSection />
        </section>

        {/* Hot Offers */}
        <section>
          <HotOffers />
        </section>

        {/* Category Block - Home and Outdoor */}
        <section>
          <CategoryBlock
            title="Home and Outdoor"
            bgImage="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1000&auto=format&fit=crop"
            href="/categories/home-outdoor"
          />
        </section>

        {/* Category Block - Consumer Electronics */}
        <section>
          <CategoryBlock
            title="Consumer Electronics"
            bgImage="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000&auto=format&fit=crop"
            href="/categories/electronics"
          />
        </section>

        {/* Quote Request Section */}
        <section>
          <QuoteRequestSection />
        </section>

        {/* Recommended Items */}
        <section>
          <RecommendedItems />
        </section>

        {/* Extra Services */}
        <section>
          <ExtraServices />
        </section>

        {/* Suppliers by Region */}
        <section>
          <SuppliersByRegion />
        </section>
      </main>

      {/* Footer Area */}
      <div className="mt-12">
        <NewsletterSection />
        <Footer />
      </div>
    </div>
  );
}
