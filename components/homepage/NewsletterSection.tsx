"use client";

import { Mail, Bell, CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setEmail('');
            }, 3000);
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 py-12 lg:py-16 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                }} />
            </div>

            {/* Floating Elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-sm mb-4">
                            <Bell className="w-4 h-4" />
                            <span>Stay Updated</span>
                        </div>
                        <h4 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                            Subscribe to our newsletter
                        </h4>
                        <p className="text-blue-100 text-sm lg:text-base max-w-md">
                            Get daily news on upcoming offers from many suppliers all over the world
                        </p>
                    </div>

                    {/* Right Form */}
                    <div className="w-full lg:w-auto">
                        {isSubmitted ? (
                            <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-lg animate-scale-in">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Successfully subscribed!</p>
                                    <p className="text-sm text-gray-500">Check your inbox for confirmation</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1 min-w-[280px] lg:min-w-[320px]">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-white rounded-xl outline-none text-sm text-gray-700 placeholder:text-gray-400 shadow-lg focus:ring-4 focus:ring-white/30 transition-all"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 whitespace-nowrap"
                                >
                                    Subscribe
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        )}

                        {/* Trust badges */}
                        <div className="flex items-center justify-center lg:justify-start gap-4 mt-4 text-blue-200 text-xs">
                            <span>✓ No spam ever</span>
                            <span>✓ Unsubscribe anytime</span>
                            <span>✓ 50k+ subscribers</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsletterSection;
