"use client";

import { Send, FileText, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const QuoteRequestSection = () => {
    const [formData, setFormData] = useState({
        item: '',
        details: '',
        quantity: '',
        unit: 'Pcs'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="relative rounded-xl lg:rounded-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Floating Shapes */}
            <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />

            {/* Content */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-6 lg:p-10">
                {/* Left Text */}
                <div className="max-w-lg text-white lg:pr-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                        <FileText className="w-4 h-4" />
                        <span>Request for Quote</span>
                    </div>

                    <h3 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                        An easy way to send<br />
                        <span className="text-blue-200">requests to all suppliers</span>
                    </h3>

                    <p className="text-white/80 text-base lg:text-lg mb-6 leading-relaxed">
                        Save time and find the best deals by sending your requirements to multiple verified suppliers at once.
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                        {[
                            'Get quotes from multiple suppliers',
                            'Compare prices instantly',
                            'Secure trade protection'
                        ].map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center">
                                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-white/90 text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Form */}
                <div className="w-full lg:w-[420px] bg-white rounded-2xl p-6 lg:p-8 shadow-2xl">
                    <h4 className="font-bold text-xl text-gray-900 mb-6">Send quote to suppliers</h4>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                What item do you need?
                            </label>
                            <input
                                type="text"
                                name="item"
                                value={formData.item}
                                onChange={handleChange}
                                placeholder="e.g., Wireless Headphones"
                                className="w-full p-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Additional details
                            </label>
                            <textarea
                                name="details"
                                value={formData.details}
                                onChange={handleChange}
                                placeholder="Type specifications, quantity requirements, etc."
                                rows={3}
                                className="w-full p-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
                            />
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    placeholder="100"
                                    className="w-full p-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                                />
                            </div>
                            <div className="w-28">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Unit
                                </label>
                                <select
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleChange}
                                    className="w-full p-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                                >
                                    <option>Pcs</option>
                                    <option>Kg</option>
                                    <option>Sets</option>
                                    <option>Meters</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4" />
                            Send Inquiry
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default QuoteRequestSection;
