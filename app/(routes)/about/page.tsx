"use client";

import Link from 'next/link';
import { ChevronRight, Users, Globe, Shield, Award, Heart, Zap, Target, TrendingUp, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
    const stats = [
        { value: '10M+', label: 'Products Listed' },
        { value: '500K+', label: 'Active Suppliers' },
        { value: '190+', label: 'Countries Served' },
        { value: '50M+', label: 'Buyers Worldwide' },
    ];

    const values = [
        { icon: Shield, title: 'Trust & Safety', desc: 'Verified suppliers and secure transactions for peace of mind' },
        { icon: Globe, title: 'Global Reach', desc: 'Connecting businesses across 190+ countries worldwide' },
        { icon: Zap, title: 'Innovation', desc: 'Cutting-edge technology powering seamless B2B trade' },
        { icon: Heart, title: 'Customer First', desc: 'Dedicated support and services tailored to your needs' },
    ];

    const team = [
        { name: 'Sarah Chen', role: 'CEO & Co-Founder', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
        { name: 'Michael Park', role: 'CTO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
        { name: 'Emily Rodriguez', role: 'COO', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
        { name: 'David Kim', role: 'VP of Engineering', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
    ];

    const timeline = [
        { year: '2018', title: 'Founded', desc: 'Ghar Bazaar was launched with a vision to democratize global trade' },
        { year: '2019', title: 'First Million', desc: 'Reached 1 million products and 50,000 suppliers' },
        { year: '2021', title: 'Global Expansion', desc: 'Expanded operations to 100+ countries' },
        { year: '2023', title: 'Industry Leader', desc: 'Became one of the leading B2B marketplaces globally' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main>
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 lg:py-28 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }} />
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <nav className="flex items-center gap-2 text-sm text-blue-200 mb-8">
                            <Link href="/" className="hover:text-white">Home</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white">About Us</span>
                        </nav>
                        <div className="max-w-3xl">
                            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                                Empowering Global Trade for Everyone
                            </h1>
                            <p className="text-xl text-blue-100 leading-relaxed">
                                Ghar Bazaar is a leading B2B e-commerce platform connecting millions of buyers and suppliers worldwide. We're on a mission to make global trade easier, safer, and more accessible.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-12 bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">{stat.value}</div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mission */}
                <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                                Our Mission
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                                Making Global Trade Accessible to All
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                We believe that every business, regardless of size, should have the opportunity to participate in global trade. Our platform breaks down barriers and creates a level playing field for buyers and suppliers around the world.
                            </p>
                            <ul className="space-y-3">
                                {['Connect with verified suppliers globally', 'Secure and transparent transactions', 'Dedicated support in 20+ languages', 'Trade finance solutions'].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-2xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
                                    alt="Team collaboration"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Award className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Trusted Platform</p>
                                        <p className="text-sm text-gray-500">Since 2018</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-16 bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                These principles guide everything we do at Ghar Bazaar
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                                    <div className="w-14 h-14 mx-auto mb-4 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <value.icon className="w-7 h-7 text-blue-600" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                                    <p className="text-sm text-gray-600">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Timeline */}
                <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
                        <p className="text-gray-600">From startup to global marketplace</p>
                    </div>
                    <div className="relative">
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />
                        <div className="space-y-8 lg:space-y-0">
                            {timeline.map((item, idx) => (
                                <div key={idx} className={`lg:flex items-center gap-8 ${idx % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                                    <div className={`flex-1 ${idx % 2 === 0 ? 'lg:text-right' : ''}`}>
                                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 inline-block">
                                            <span className="text-blue-600 font-bold text-lg">{item.year}</span>
                                            <h4 className="font-bold text-gray-900 mt-1">{item.title}</h4>
                                            <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div className="hidden lg:flex w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-md z-10" />
                                    <div className="flex-1" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="py-16 bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
                            <p className="text-gray-600">Meet the people behind Ghar Bazaar</p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {team.map((member, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="font-bold text-gray-900">{member.name}</h3>
                                    <p className="text-sm text-gray-500">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-blue-600">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Trading?</h2>
                        <p className="text-blue-100 mb-8">Join millions of businesses already growing with Ghar Bazaar</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                                    Create Free Account
                                </button>
                            </Link>
                            <Link href="/contact">
                                <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                                    Contact Sales
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
