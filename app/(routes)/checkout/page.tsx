"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ChevronRight, ShoppingBag, MapPin, CreditCard, Check,
    Truck, Shield, ArrowLeft, ArrowRight, Plus, Loader2,
    Building2, Home, Briefcase
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Address } from '@/types';

type Step = 'shipping' | 'payment' | 'review';

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, clearCart } = useCart();
    const { user, isAuthenticated, isLoading: authLoading, addAddress } = useAuth();

    const [currentStep, setCurrentStep] = useState<Step>('shipping');
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<string>('');
    const [showNewAddressForm, setShowNewAddressForm] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'cod'>('card');
    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: '',
    });
    const [newAddress, setNewAddress] = useState({
        label: 'Home',
        fullName: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'United States',
        isDefault: false,
    });

    // Redirect if not authenticated or empty cart
    useEffect(() => {
        if (!authLoading) {
            if (!isAuthenticated) {
                router.push('/login?redirect=/checkout');
            } else if (cart.items.length === 0) {
                router.push('/cart');
            }
        }
    }, [isAuthenticated, authLoading, cart.items.length, router]);

    // Set default address
    useEffect(() => {
        if (user?.addresses && user.addresses.length > 0 && !selectedAddress) {
            const defaultAddr = user.addresses.find(a => a.isDefault) || user.addresses[0];
            setSelectedAddress(defaultAddr.id);
        }
    }, [user?.addresses, selectedAddress]);

    const steps: { id: Step; label: string; icon: React.ElementType }[] = [
        { id: 'shipping', label: 'Shipping', icon: MapPin },
        { id: 'payment', label: 'Payment', icon: CreditCard },
        { id: 'review', label: 'Review', icon: Check },
    ];

    const getCurrentStepIndex = () => steps.findIndex(s => s.id === currentStep);

    const handleNextStep = () => {
        const currentIndex = getCurrentStepIndex();
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1].id);
        }
    };

    const handlePrevStep = () => {
        const currentIndex = getCurrentStepIndex();
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1].id);
        }
    };

    const handleAddNewAddress = () => {
        if (!newAddress.fullName || !newAddress.street || !newAddress.city) return;
        addAddress(newAddress);
        setShowNewAddressForm(false);
        setNewAddress({
            label: 'Home',
            fullName: '',
            phone: '',
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: 'United States',
            isDefault: false,
        });
    };

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        // Simulate order processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Generate order ID
        const orderId = `GB-${Date.now().toString().slice(-8)}`;

        // Clear cart and redirect to confirmation
        clearCart();
        router.push(`/order-confirmation?orderId=${orderId}`);
    };

    const getSelectedAddressData = (): Address | undefined => {
        return user?.addresses.find(a => a.id === selectedAddress);
    };

    if (authLoading || cart.items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    const selectedAddressData = getSelectedAddressData();

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/cart" className="hover:text-blue-600">Cart</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-medium">Checkout</span>
                </nav>

                {/* Progress Steps */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
                    <div className="flex items-center justify-between max-w-2xl mx-auto">
                        {steps.map((step, idx) => {
                            const isActive = step.id === currentStep;
                            const isCompleted = getCurrentStepIndex() > idx;
                            const StepIcon = step.icon;

                            return (
                                <div key={step.id} className="flex items-center">
                                    <div className="flex flex-col items-center">
                                        <div className={`
                                            w-12 h-12 rounded-full flex items-center justify-center transition-all
                                            ${isCompleted ? 'bg-emerald-500 text-white' : ''}
                                            ${isActive ? 'bg-blue-600 text-white ring-4 ring-blue-100' : ''}
                                            ${!isActive && !isCompleted ? 'bg-gray-100 text-gray-400' : ''}
                                        `}>
                                            {isCompleted ? <Check className="w-6 h-6" /> : <StepIcon className="w-6 h-6" />}
                                        </div>
                                        <span className={`mt-2 text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                                            {step.label}
                                        </span>
                                    </div>
                                    {idx < steps.length - 1 && (
                                        <div className={`w-20 sm:w-32 h-1 mx-4 rounded ${isCompleted ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Shipping Step */}
                        {currentStep === 'shipping' && (
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Address</h2>

                                {/* Saved Addresses */}
                                {user?.addresses && user.addresses.length > 0 && !showNewAddressForm && (
                                    <div className="space-y-3 mb-6">
                                        {user.addresses.map((address) => (
                                            <label
                                                key={address.id}
                                                className={`
                                                    block p-4 border-2 rounded-xl cursor-pointer transition-all
                                                    ${selectedAddress === address.id
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                    }
                                                `}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <input
                                                        type="radio"
                                                        name="address"
                                                        checked={selectedAddress === address.id}
                                                        onChange={() => setSelectedAddress(address.id)}
                                                        className="mt-1 w-4 h-4 text-blue-600"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="font-semibold text-gray-900">{address.label}</span>
                                                            {address.isDefault && (
                                                                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                                                                    Default
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-gray-700">{address.fullName}</p>
                                                        <p className="text-gray-500 text-sm">{address.street}</p>
                                                        <p className="text-gray-500 text-sm">{address.city}, {address.state} {address.postalCode}</p>
                                                        <p className="text-gray-500 text-sm">{address.phone}</p>
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {/* Add New Address Button */}
                                {!showNewAddressForm && (
                                    <button
                                        onClick={() => setShowNewAddressForm(true)}
                                        className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Add New Address
                                    </button>
                                )}

                                {/* New Address Form */}
                                {showNewAddressForm && (
                                    <div className="border-2 border-blue-100 bg-blue-50 rounded-xl p-4">
                                        <h3 className="font-semibold text-gray-900 mb-4">Add New Address</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Full Name *"
                                                value={newAddress.fullName}
                                                onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                                                className="px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                            />
                                            <input
                                                type="tel"
                                                placeholder="Phone Number *"
                                                value={newAddress.phone}
                                                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                                className="px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Street Address *"
                                                value={newAddress.street}
                                                onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                                className="sm:col-span-2 px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                            />
                                            <input
                                                type="text"
                                                placeholder="City *"
                                                value={newAddress.city}
                                                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                                className="px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                            />
                                            <input
                                                type="text"
                                                placeholder="State/Province"
                                                value={newAddress.state}
                                                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                                className="px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Postal Code"
                                                value={newAddress.postalCode}
                                                onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                                                className="px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                            />
                                            <select
                                                value={newAddress.label}
                                                onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                                                className="px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                                            >
                                                <option value="Home">Home</option>
                                                <option value="Office">Office</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-3 mt-4">
                                            <button
                                                onClick={handleAddNewAddress}
                                                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                                            >
                                                Save Address
                                            </button>
                                            <button
                                                onClick={() => setShowNewAddressForm(false)}
                                                className="px-6 py-2.5 border-2 border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Payment Step */}
                        {currentStep === 'payment' && (
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>

                                {/* Payment Options */}
                                <div className="space-y-3 mb-6">
                                    {[
                                        { id: 'card', label: 'Credit/Debit Card', icon: CreditCard, desc: 'Pay securely with your card' },
                                        { id: 'paypal', label: 'PayPal', icon: Shield, desc: 'Fast and secure checkout' },
                                        { id: 'cod', label: 'Cash on Delivery', icon: Truck, desc: 'Pay when you receive' },
                                    ].map((method) => (
                                        <label
                                            key={method.id}
                                            className={`
                                                block p-4 border-2 rounded-xl cursor-pointer transition-all
                                                ${paymentMethod === method.id
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }
                                            `}
                                        >
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    checked={paymentMethod === method.id}
                                                    onChange={() => setPaymentMethod(method.id as any)}
                                                    className="w-4 h-4 text-blue-600"
                                                />
                                                <method.icon className="w-6 h-6 text-gray-600" />
                                                <div>
                                                    <p className="font-semibold text-gray-900">{method.label}</p>
                                                    <p className="text-sm text-gray-500">{method.desc}</p>
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>

                                {/* Card Details Form */}
                                {paymentMethod === 'card' && (
                                    <div className="border-t border-gray-100 pt-6">
                                        <h3 className="font-semibold text-gray-900 mb-4">Card Details</h3>
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                placeholder="Card Number"
                                                value={cardDetails.number}
                                                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Cardholder Name"
                                                value={cardDetails.name}
                                                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    value={cardDetails.expiry}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                                    className="px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="CVV"
                                                    value={cardDetails.cvv}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                                    className="px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-emerald-500" />
                                            Your payment information is encrypted and secure
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Review Step */}
                        {currentStep === 'review' && (
                            <div className="space-y-6">
                                {/* Shipping Address Summary */}
                                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-gray-900">Shipping Address</h3>
                                        <button
                                            onClick={() => setCurrentStep('shipping')}
                                            className="text-blue-600 text-sm font-medium hover:text-blue-700"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    {selectedAddressData && (
                                        <div className="text-gray-600">
                                            <p className="font-medium text-gray-900">{selectedAddressData.fullName}</p>
                                            <p>{selectedAddressData.street}</p>
                                            <p>{selectedAddressData.city}, {selectedAddressData.state} {selectedAddressData.postalCode}</p>
                                            <p>{selectedAddressData.phone}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Payment Summary */}
                                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-gray-900">Payment Method</h3>
                                        <button
                                            onClick={() => setCurrentStep('payment')}
                                            className="text-blue-600 text-sm font-medium hover:text-blue-700"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <p className="text-gray-600">
                                        {paymentMethod === 'card' && `Credit Card ending in ${cardDetails.number.slice(-4) || '****'}`}
                                        {paymentMethod === 'paypal' && 'PayPal'}
                                        {paymentMethod === 'cod' && 'Cash on Delivery'}
                                    </p>
                                </div>

                                {/* Order Items */}
                                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                    <h3 className="font-bold text-gray-900 mb-4">Order Items ({cart.itemCount})</h3>
                                    <div className="space-y-4">
                                        {cart.items.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
                                                    <img src={item.product.thumbnail} alt={item.product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-900 truncate">{item.product.name}</p>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                                <span className="font-medium text-gray-900">${item.totalPrice.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-6">
                            {currentStep !== 'shipping' ? (
                                <button
                                    onClick={handlePrevStep}
                                    className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    Back
                                </button>
                            ) : (
                                <Link href="/cart">
                                    <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                                        <ArrowLeft className="w-5 h-5" />
                                        Back to Cart
                                    </button>
                                </Link>
                            )}

                            {currentStep !== 'review' ? (
                                <button
                                    onClick={handleNextStep}
                                    disabled={currentStep === 'shipping' && !selectedAddress && !showNewAddressForm}
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Continue
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            ) : (
                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={isProcessing}
                                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-70"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Place Order
                                            <Check className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="w-full lg:w-[380px] flex-shrink-0">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                            {/* Items Preview */}
                            <div className="space-y-3 mb-6">
                                {cart.items.slice(0, 3).map((item) => (
                                    <div key={item.id} className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                            <img src={item.product.thumbnail} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                                            <p className="text-xs text-gray-500">x{item.quantity}</p>
                                        </div>
                                        <span className="text-sm font-medium">${item.totalPrice.toFixed(2)}</span>
                                    </div>
                                ))}
                                {cart.items.length > 3 && (
                                    <p className="text-sm text-gray-500 text-center">+{cart.items.length - 3} more items</p>
                                )}
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 border-t border-gray-100 pt-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium">${cart.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className={`font-medium ${cart.shipping === 0 ? 'text-emerald-600' : ''}`}>
                                        {cart.shipping === 0 ? 'FREE' : `$${cart.shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span className="font-medium">${cart.tax.toFixed(2)}</span>
                                </div>
                                <div className="h-px bg-gray-200" />
                                <div className="flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>${cart.total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Truck className="w-4 h-4 text-blue-600" />
                                    <span>Free shipping on orders over $50</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Shield className="w-4 h-4 text-emerald-500" />
                                    <span>Secure checkout guaranteed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
