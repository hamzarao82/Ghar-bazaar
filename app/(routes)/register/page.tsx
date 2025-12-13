"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Building2, Eye, EyeOff, Check, Chrome, Facebook, Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
    const router = useRouter();
    const { register, isAuthenticated, isLoading: authLoading } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        password: '',
        accountType: 'buyer' as 'buyer' | 'supplier',
        agreeTerms: false
    });

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validate password
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        if (!formData.agreeTerms) {
            setError('You must agree to the Terms of Service and Privacy Policy.');
            return;
        }

        setIsSubmitting(true);

        try {
            const success = await register({
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                accountType: formData.accountType,
                company: formData.company || undefined,
            });

            if (success) {
                router.push('/');
            } else {
                setError('Registration failed. This email may already be registered.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const passwordRequirements = [
        { label: 'At least 8 characters', met: formData.password.length >= 8 },
        { label: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
        { label: 'Contains number', met: /\d/.test(formData.password) },
    ];

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-20">

                    {/* Left Side - Branding */}
                    <div className="hidden lg:block max-w-md sticky top-32">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Join{' '}
                                <span className="text-blue-600">Ghar Bazaar</span>
                                <br />Today
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Create your free account and start connecting with millions of buyers and suppliers worldwide.
                            </p>
                        </div>

                        {/* Benefits */}
                        <div className="space-y-4">
                            {[
                                { title: 'Free to Join', desc: 'No hidden fees or commitments' },
                                { title: 'Global Network', desc: 'Access suppliers in 190+ countries' },
                                { title: 'Verified Suppliers', desc: 'Trade with confidence' },
                                { title: '24/7 Support', desc: 'We\'re here to help anytime' }
                            ].map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                                        <p className="text-sm text-gray-500">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Register Form */}
                    <div className="w-full max-w-md">
                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
                                <p className="text-gray-500">Fill in your details to get started</p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Account Type Selection */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {[
                                    { value: 'buyer', label: 'I\'m a Buyer', icon: User },
                                    { value: 'supplier', label: 'I\'m a Supplier', icon: Building2 }
                                ].map((type) => (
                                    <button
                                        key={type.value}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, accountType: type.value as 'buyer' | 'supplier' }))}
                                        className={`
                                            flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all
                                            ${formData.accountType === type.value
                                                ? 'border-blue-500 bg-blue-50 text-blue-600'
                                                : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                            }
                                        `}
                                    >
                                        <type.icon className="w-5 h-5" />
                                        <span className="font-medium text-sm">{type.label}</span>
                                    </button>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name Fields */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="John"
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all text-sm"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Doe"
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all text-sm"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="name@company.com"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all text-sm"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                {/* Company (Optional for suppliers) */}
                                {formData.accountType === 'supplier' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                placeholder="Your Company Ltd."
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all text-sm"
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all text-sm"
                                            required
                                            disabled={isSubmitting}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    {/* Password Requirements */}
                                    {formData.password && (
                                        <div className="mt-2 space-y-1">
                                            {passwordRequirements.map((req, idx) => (
                                                <p key={idx} className={`text-xs flex items-center gap-1.5 ${req.met ? 'text-emerald-600' : 'text-gray-400'}`}>
                                                    <Check className={`w-3 h-3 ${req.met ? 'text-emerald-600' : 'text-gray-300'}`} />
                                                    {req.label}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Terms Agreement */}
                                <label className="flex items-start gap-3 cursor-pointer py-2">
                                    <input
                                        type="checkbox"
                                        name="agreeTerms"
                                        checked={formData.agreeTerms}
                                        onChange={handleChange}
                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"
                                        disabled={isSubmitting}
                                    />
                                    <span className="text-sm text-gray-600">
                                        I agree to the{' '}
                                        <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                                        {' '}and{' '}
                                        <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                                    </span>
                                </label>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center gap-4 my-6">
                                <div className="flex-1 h-px bg-gray-200" />
                                <span className="text-sm text-gray-400">or</span>
                                <div className="flex-1 h-px bg-gray-200" />
                            </div>

                            {/* Social Login */}
                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 py-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                                    <Chrome className="w-5 h-5" />
                                    <span className="text-sm font-medium text-gray-700">Google</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 py-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                                    <Facebook className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm font-medium text-gray-700">Facebook</span>
                                </button>
                            </div>

                            {/* Login Link */}
                            <p className="text-center mt-6 text-gray-600">
                                Already have an account?{' '}
                                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
