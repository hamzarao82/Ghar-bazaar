"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Building2, MapPin, Edit3, Camera, LogOut, Package, Heart, Settings, ChevronRight, Plus, Trash2, Check, Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { Address } from '@/types';

export default function ProfilePage() {
    const router = useRouter();
    const { user, isAuthenticated, isLoading, logout, updateProfile, addAddress, removeAddress, setDefaultAddress } = useAuth();

    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [editForm, setEditForm] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        company: '',
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

    // Redirect if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    // Initialize edit form with user data
    useEffect(() => {
        if (user) {
            setEditForm({
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone || '',
                company: user.company || '',
            });
        }
    }, [user]);

    const handleSaveProfile = () => {
        updateProfile({
            firstName: editForm.firstName,
            lastName: editForm.lastName,
            fullName: `${editForm.firstName} ${editForm.lastName}`,
            phone: editForm.phone || undefined,
            company: editForm.company || undefined,
        });
        setIsEditing(false);
    };

    const handleAddAddress = () => {
        addAddress(newAddress);
        setShowAddAddress(false);
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

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (!user) return null;

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'addresses', label: 'Addresses', icon: MapPin },
        { id: 'orders', label: 'Orders', icon: Package },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-medium">My Account</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            {/* User Info */}
                            <div className="text-center mb-6">
                                <div className="relative w-20 h-20 mx-auto mb-4">
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                                    </div>
                                    <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-500 hover:text-blue-600 shadow-sm">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                                <h3 className="font-bold text-gray-900">{user.fullName}</h3>
                                <p className="text-sm text-gray-500 capitalize">{user.accountType}</p>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            if (tab.id === 'orders') {
                                                router.push('/orders');
                                            } else if (tab.id === 'wishlist') {
                                                router.push('/wishlist');
                                            } else {
                                                setActiveTab(tab.id);
                                            }
                                        }}
                                        className={`
                                            w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all
                                            ${activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}
                                        `}
                                    >
                                        <tab.icon className="w-5 h-5" />
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                ))}
                            </nav>

                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 mt-4 text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                                    {!isEditing && (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                            Edit
                                        </button>
                                    )}
                                </div>

                                {isEditing ? (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                                                <input
                                                    type="text"
                                                    value={editForm.firstName}
                                                    onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                                                <input
                                                    type="text"
                                                    value={editForm.lastName}
                                                    onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={editForm.phone}
                                                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                                placeholder="+1 (555) 000-0000"
                                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                                            />
                                        </div>
                                        {user.accountType === 'supplier' && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
                                                <input
                                                    type="text"
                                                    value={editForm.company}
                                                    onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                                                />
                                            </div>
                                        )}
                                        <div className="flex gap-3 pt-4">
                                            <button
                                                onClick={handleSaveProfile}
                                                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                                            >
                                                Save Changes
                                            </button>
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="px-6 py-2.5 border-2 border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                                <User className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Full Name</p>
                                                <p className="font-medium text-gray-900">{user.fullName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                                <Mail className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Email</p>
                                                <p className="font-medium text-gray-900">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                                <Phone className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Phone</p>
                                                <p className="font-medium text-gray-900">{user.phone || 'Not provided'}</p>
                                            </div>
                                        </div>
                                        {user.company && (
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                                    <Building2 className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Company</p>
                                                    <p className="font-medium text-gray-900">{user.company}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Addresses Tab */}
                        {activeTab === 'addresses' && (
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                                    <button
                                        onClick={() => setShowAddAddress(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Address
                                    </button>
                                </div>

                                {/* Add Address Form */}
                                {showAddAddress && (
                                    <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                        <h3 className="font-semibold text-gray-900 mb-4">Add New Address</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                value={newAddress.fullName}
                                                onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                                                className="px-4 py-2.5 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                            />
                                            <input
                                                type="tel"
                                                placeholder="Phone"
                                                value={newAddress.phone}
                                                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                                className="px-4 py-2.5 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Street Address"
                                                value={newAddress.street}
                                                onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                                className="sm:col-span-2 px-4 py-2.5 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="City"
                                                value={newAddress.city}
                                                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                                className="px-4 py-2.5 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="State"
                                                value={newAddress.state}
                                                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                                className="px-4 py-2.5 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Postal Code"
                                                value={newAddress.postalCode}
                                                onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                                                className="px-4 py-2.5 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                            />
                                            <select
                                                value={newAddress.label}
                                                onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                                                className="px-4 py-2.5 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                            >
                                                <option value="Home">Home</option>
                                                <option value="Office">Office</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-3 mt-4">
                                            <button
                                                onClick={handleAddAddress}
                                                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                                            >
                                                Save Address
                                            </button>
                                            <button
                                                onClick={() => setShowAddAddress(false)}
                                                className="px-6 py-2.5 border-2 border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Address List */}
                                {user.addresses.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500">
                                        <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p>No saved addresses yet.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {user.addresses.map((address) => (
                                            <div key={address.id} className="p-4 border-2 border-gray-100 rounded-xl hover:border-blue-100 transition-colors">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="font-semibold text-gray-900">{address.label}</span>
                                                            {address.isDefault && (
                                                                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                                                                    Default
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-gray-600">{address.fullName}</p>
                                                        <p className="text-gray-500 text-sm">{address.street}</p>
                                                        <p className="text-gray-500 text-sm">{address.city}, {address.state} {address.postalCode}</p>
                                                        <p className="text-gray-500 text-sm">{address.phone}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        {!address.isDefault && (
                                                            <button
                                                                onClick={() => setDefaultAddress(address.id)}
                                                                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                                                title="Set as default"
                                                            >
                                                                <Check className="w-5 h-5" />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => removeAddress(address.id)}
                                                            className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Settings Tab */}
                        {activeTab === 'settings' && (
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
                                <div className="space-y-4">
                                    <div className="p-4 border-2 border-gray-100 rounded-xl flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-gray-900">Email Notifications</h4>
                                            <p className="text-sm text-gray-500">Receive order updates and promotions</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                    <div className="p-4 border-2 border-gray-100 rounded-xl flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                                            <p className="text-sm text-gray-500">Add an extra layer of security</p>
                                        </div>
                                        <button className="px-4 py-2 border-2 border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
                                            Enable
                                        </button>
                                    </div>
                                    <div className="p-4 border-2 border-rose-100 bg-rose-50 rounded-xl">
                                        <h4 className="font-medium text-rose-700">Delete Account</h4>
                                        <p className="text-sm text-rose-600 mb-3">Permanently delete your account and all data</p>
                                        <button className="px-4 py-2 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-colors">
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
