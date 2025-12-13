// ==========================================
// Core Product Types
// ==========================================

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    price: number;
    originalPrice?: number;
    currency: string;
    images: string[];
    thumbnail: string;
    category: CategoryReference;
    subcategory?: string;
    brand?: string;
    sku: string;
    stock: number;
    minOrder: number;
    rating: number;
    reviewCount: number;
    soldCount: number;
    tags: string[];
    features: string[];
    specifications: ProductSpecification[];
    supplier: SupplierReference;
    isNew?: boolean;
    isFeatured?: boolean;
    isOnSale?: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProductSpecification {
    name: string;
    value: string;
}

export interface CategoryReference {
    id: string;
    name: string;
    slug: string;
}

export interface SupplierReference {
    id: string;
    name: string;
    location: string;
    rating: number;
    verified: boolean;
}

// ==========================================
// Category Types
// ==========================================

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image: string;
    icon?: string;
    parentId?: string;
    subcategories?: Category[];
    productCount: number;
    featured?: boolean;
}

// ==========================================
// Supplier Types
// ==========================================

export interface Supplier {
    id: string;
    name: string;
    slug: string;
    logo?: string;
    banner?: string;
    description: string;
    location: {
        country: string;
        city: string;
        flag: string;
    };
    rating: number;
    reviewCount: number;
    verified: boolean;
    yearsInBusiness: number;
    responseTime: string;
    categories: string[];
    productCount: number;
    mainProducts: string[];
    contact: {
        email?: string;
        phone?: string;
        website?: string;
    };
    createdAt: string;
}

// ==========================================
// User & Authentication Types
// ==========================================

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    avatar?: string;
    phone?: string;
    accountType: 'buyer' | 'supplier';
    company?: string;
    addresses: Address[];
    defaultAddressId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Address {
    id: string;
    label: string; // "Home", "Office", etc.
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

// ==========================================
// Cart Types
// ==========================================

export interface CartItem {
    id: string;
    productId: string;
    product: Product;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    addedAt: string;
}

export interface Cart {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    shipping: number;
    tax: number;
    discount: number;
    total: number;
}

export interface CartState {
    cart: Cart;
    isLoading: boolean;
}

// ==========================================
// Wishlist Types
// ==========================================

export interface WishlistItem {
    id: string;
    productId: string;
    product: Product;
    addedAt: string;
}

export interface WishlistState {
    items: WishlistItem[];
    isLoading: boolean;
}

// ==========================================
// Order Types
// ==========================================

export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'refunded';

export type PaymentStatus =
    | 'pending'
    | 'paid'
    | 'failed'
    | 'refunded';

export interface Order {
    id: string;
    orderNumber: string;
    userId: string;
    items: OrderItem[];
    shippingAddress: Address;
    billingAddress?: Address;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    orderStatus: OrderStatus;
    subtotal: number;
    shipping: number;
    tax: number;
    discount: number;
    total: number;
    notes?: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface PaymentMethod {
    type: 'card' | 'paypal' | 'bank_transfer' | 'cod';
    last4?: string;
    brand?: string;
}

// ==========================================
// Review Types
// ==========================================

export interface Review {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    title?: string;
    content: string;
    images?: string[];
    helpful: number;
    verified: boolean;
    createdAt: string;
}

// ==========================================
// API & Response Types
// ==========================================

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
    };
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// ==========================================
// Filter & Search Types
// ==========================================

export interface ProductFilters {
    category?: string;
    subcategory?: string;
    priceMin?: number;
    priceMax?: number;
    rating?: number;
    brand?: string[];
    inStock?: boolean;
    onSale?: boolean;
    sortBy?: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'bestselling';
}

export interface SearchParams {
    query: string;
    filters?: ProductFilters;
    page?: number;
    pageSize?: number;
}

// ==========================================
// Notification Types
// ==========================================

export interface Notification {
    id: string;
    type: 'order' | 'promo' | 'system' | 'message';
    title: string;
    message: string;
    read: boolean;
    link?: string;
    createdAt: string;
}

// ==========================================
// Utility Types
// ==========================================

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface SelectOption {
    value: string;
    label: string;
}
