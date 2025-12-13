"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Mail, Phone, MapPin, Clock, Send, MessageSquare, Headphones, FileQuestion, Loader2, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactInfo = [
        { icon: Mail, label: 'Email', value: 'support@gharbazaar.com', href: 'mailto:support@gharbazaar.com' },
        { icon: Phone, label: 'Phone', value: '+1 (800) 123-4567', href: 'tel:+18001234567' },
        { icon: MapPin, label: 'Address', value: '123 Commerce Street, New York, NY 10001', href: '#' },
        { icon: Clock, label: 'Hours', value: 'Mon-Fri: 9AM-6PM EST', href: '#' },
    ];

    const supportOptions = [
        { icon: MessageSquare, title: 'Live Chat', desc: 'Chat with our support team', action: 'Start Chat', color: 'blue' },
        { icon: Headphones, title: 'Phone Support', desc: 'Speak directly with an agent', action: 'Call Now', color: 'emerald' },
        { icon: FileQuestion, title: 'Help Center', desc: 'Browse our FAQ and guides', action: 'Visit FAQ', color: 'purple', href: '/faq' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main>
                {/* Hero */}
                <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 lg:py-20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }} />
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <nav className="flex items-center gap-2 text-sm text-blue-200 mb-6">
                            <Link href="/" className="hover:text-white">Home</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white">Contact Us</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Get in Touch</h1>
                        <p className="text-xl text-blue-100 max-w-2xl">
                            Have a question or need help? Our team is here for you 24/7.
                        </p>
                    </div>
                </section>

                {/* Support Options */}
                <section className="py-12 -mt-8 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid sm:grid-cols-3 gap-4">
                            {supportOptions.map((option, idx) => (
                                <Link key={idx} href={option.href || '#'}>
                                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer group">
                                        <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${option.color === 'blue' ? 'bg-blue-100' :
                                                option.color === 'emerald' ? 'bg-emerald-100' : 'bg-purple-100'
                                            }`}>
                                            <option.icon className={`w-6 h-6 ${option.color === 'blue' ? 'text-blue-600' :
                                                    option.color === 'emerald' ? 'text-emerald-600' : 'text-purple-600'
                                                }`} />
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-1">{option.title}</h3>
                                        <p className="text-sm text-gray-500 mb-3">{option.desc}</p>
                                        <span className={`text-sm font-semibold ${option.color === 'blue' ? 'text-blue-600' :
                                                option.color === 'emerald' ? 'text-emerald-600' : 'text-purple-600'
                                            } group-hover:underline`}>
                                            {option.action} →
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Form & Info */}
                <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Form */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                                        <Check className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-600 mb-6">We'll get back to you within 24 hours.</p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-blue-600 font-medium hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Your name"
                                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="your@email.com"
                                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                                        <input
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            placeholder="How can we help?"
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tell us more about your inquiry..."
                                            rows={5}
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-70 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                            <div className="space-y-4 mb-8">
                                {contactInfo.map((info, idx) => (
                                    <a
                                        key={idx}
                                        href={info.href}
                                        className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
                                    >
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <info.icon className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">{info.label}</p>
                                            <p className="font-medium text-gray-900">{info.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-gray-200 rounded-xl h-64 overflow-hidden relative">
                                <img
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop"
                                    alt="Map"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent flex items-end p-6">
                                    <p className="text-white font-medium">New York, NY</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
