"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthState, Address } from '@/types';
import { useToast } from './ToastContext';

// ==========================================
// Types
// ==========================================

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (userData: RegisterData) => Promise<boolean>;
    logout: () => void;
    updateProfile: (updates: Partial<User>) => void;
    addAddress: (address: Omit<Address, 'id'>) => void;
    removeAddress: (addressId: string) => void;
    setDefaultAddress: (addressId: string) => void;
}

interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    accountType: 'buyer' | 'supplier';
    company?: string;
}

type AuthAction =
    | { type: 'LOGIN_START' }
    | { type: 'LOGIN_SUCCESS'; payload: User }
    | { type: 'LOGIN_FAILURE' }
    | { type: 'LOGOUT' }
    | { type: 'UPDATE_PROFILE'; payload: Partial<User> }
    | { type: 'LOAD_USER'; payload: User }
    | { type: 'SET_LOADING'; payload: boolean };

// ==========================================
// Initial State
// ==========================================

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
};

// ==========================================
// Reducer
// ==========================================

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                ...state,
                isLoading: true,
            };

        case 'LOGIN_SUCCESS':
            return {
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
            };

        case 'LOGIN_FAILURE':
            return {
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };

        case 'LOGOUT':
            return {
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };

        case 'UPDATE_PROFILE':
            if (!state.user) return state;
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                    updatedAt: new Date().toISOString(),
                },
            };

        case 'LOAD_USER':
            return {
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
            };

        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };

        default:
            return state;
    }
};

// ==========================================
// Context
// ==========================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ==========================================
// Mock User Database (for demo purposes)
// ==========================================

const mockUsers: Map<string, { user: User; password: string }> = new Map();

// ==========================================
// Provider
// ==========================================

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('ghar-bazaar-user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                dispatch({ type: 'LOAD_USER', payload: parsedUser });
            } catch (error) {
                console.error('Error loading user from localStorage:', error);
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        } else {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    // Save user to localStorage on changes
    useEffect(() => {
        if (state.user) {
            localStorage.setItem('ghar-bazaar-user', JSON.stringify(state.user));
        } else {
            localStorage.removeItem('ghar-bazaar-user');
        }
    }, [state.user]);

    const { showToast } = useToast();

    // Login function
    const login = async (email: string, password: string): Promise<boolean> => {
        dispatch({ type: 'LOGIN_START' });

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check mock database
        const storedUser = mockUsers.get(email.toLowerCase());

        if (storedUser && storedUser.password === password) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: storedUser.user });
            showToast(`Welcome back, ${storedUser.user.firstName}!`, 'success');
            return true;
        }

        // For demo: accept any email/password and create a demo user
        const demoUser: User = {
            id: `user_${Date.now()}`,
            email: email.toLowerCase(),
            firstName: 'Demo',
            lastName: 'User',
            fullName: 'Demo User',
            accountType: 'buyer',
            addresses: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        dispatch({ type: 'LOGIN_SUCCESS', payload: demoUser });
        showToast('Logged in successfully!', 'success');
        return true;
    };

    // Register function
    const register = async (userData: RegisterData): Promise<boolean> => {
        dispatch({ type: 'LOGIN_START' });

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if email already exists
        if (mockUsers.has(userData.email.toLowerCase())) {
            dispatch({ type: 'LOGIN_FAILURE' });
            showToast('Email already exists', 'error');
            return false;
        }

        // Create new user
        const newUser: User = {
            id: `user_${Date.now()}`,
            email: userData.email.toLowerCase(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: `${userData.firstName} ${userData.lastName}`,
            accountType: userData.accountType,
            company: userData.company,
            addresses: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // Store in mock database
        mockUsers.set(userData.email.toLowerCase(), {
            user: newUser,
            password: userData.password,
        });

        dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
        showToast('Registration successful!', 'success');
        return true;
    };

    // Logout function
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        showToast('Logged out successfully', 'info');
    };

    // Update profile
    const updateProfile = (updates: Partial<User>) => {
        dispatch({ type: 'UPDATE_PROFILE', payload: updates });
        showToast('Profile updated!', 'success');
    };

    // Add address
    const addAddress = (address: Omit<Address, 'id'>) => {
        if (!state.user) return;

        const newAddress: Address = {
            ...address,
            id: `addr_${Date.now()}`,
        };

        const updatedAddresses = [...state.user.addresses, newAddress];

        // If this is the first address or marked as default, set it as default
        if (updatedAddresses.length === 1 || newAddress.isDefault) {
            updatedAddresses.forEach(addr => {
                addr.isDefault = addr.id === newAddress.id;
            });
        }

        updateProfile({
            addresses: updatedAddresses,
            defaultAddressId: newAddress.isDefault ? newAddress.id : state.user.defaultAddressId,
        });
    };

    // Remove address
    const removeAddress = (addressId: string) => {
        if (!state.user) return;

        const updatedAddresses = state.user.addresses.filter(addr => addr.id !== addressId);

        // If removed address was default, set first remaining as default
        if (state.user.defaultAddressId === addressId && updatedAddresses.length > 0) {
            updatedAddresses[0].isDefault = true;
            updateProfile({
                addresses: updatedAddresses,
                defaultAddressId: updatedAddresses[0].id,
            });
        } else {
            updateProfile({ addresses: updatedAddresses });
        }
    };

    // Set default address
    const setDefaultAddress = (addressId: string) => {
        if (!state.user) return;

        const updatedAddresses = state.user.addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === addressId,
        }));

        updateProfile({
            addresses: updatedAddresses,
            defaultAddressId: addressId,
        });
    };

    const value: AuthContextType = {
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        removeAddress,
        setDefaultAddress,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ==========================================
// Hook
// ==========================================

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
