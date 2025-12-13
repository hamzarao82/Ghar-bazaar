import { Product, SupplierReference, CategoryReference } from '@/types';

// Helper function to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Common supplier references
const suppliers: Record<string, SupplierReference> = {
    techSound: {
        id: 'sup_001',
        name: 'TechSound Electronics Co., Ltd',
        location: 'Shenzhen, China',
        rating: 4.9,
        verified: true,
    },
    smartGear: {
        id: 'sup_002',
        name: 'SmartGear Industries',
        location: 'Seoul, South Korea',
        rating: 4.8,
        verified: true,
    },
    globalTech: {
        id: 'sup_003',
        name: 'Global Tech Solutions',
        location: 'Tokyo, Japan',
        rating: 4.7,
        verified: true,
    },
    premiumHome: {
        id: 'sup_004',
        name: 'Premium Home Goods Inc.',
        location: 'Los Angeles, USA',
        rating: 4.6,
        verified: false,
    },
    fashionWorld: {
        id: 'sup_005',
        name: 'Fashion World Trading',
        location: 'Milan, Italy',
        rating: 4.8,
        verified: true,
    },
};

// Common category references
const categories: Record<string, CategoryReference> = {
    electronics: { id: 'cat_001', name: 'Electronics', slug: 'electronics' },
    audio: { id: 'cat_002', name: 'Audio', slug: 'audio' },
    computers: { id: 'cat_003', name: 'Computers & Tech', slug: 'computers' },
    fashion: { id: 'cat_004', name: 'Fashion', slug: 'fashion' },
    home: { id: 'cat_005', name: 'Home & Garden', slug: 'home-garden' },
    sports: { id: 'cat_006', name: 'Sports & Outdoor', slug: 'sports' },
    automotive: { id: 'cat_007', name: 'Automotive', slug: 'automotive' },
    beauty: { id: 'cat_008', name: 'Beauty & Health', slug: 'beauty-health' },
};

// ==========================================
// Products Database
// ==========================================

export const products: Product[] = [
    // Electronics - Audio
    {
        id: 'prod_001',
        name: 'Premium Wireless Bluetooth Headphones with Active Noise Cancellation',
        slug: 'premium-wireless-headphones-anc',
        description: 'Experience crystal-clear audio with our premium wireless headphones featuring advanced active noise cancellation technology. Perfect for work, travel, and everyday listening.',
        shortDescription: 'Premium ANC headphones with 40h battery',
        price: 149.99,
        originalPrice: 249.99,
        currency: 'USD',
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        category: categories.audio,
        subcategory: 'Headphones',
        brand: 'TechSound Pro',
        sku: 'TSP-WH-001',
        stock: 150,
        minOrder: 2,
        rating: 4.8,
        reviewCount: 2847,
        soldCount: 12500,
        tags: ['headphones', 'wireless', 'bluetooth', 'anc', 'premium'],
        features: [
            'Active Noise Cancellation (ANC)',
            '40 Hours Battery Life',
            'Bluetooth 5.3 Technology',
            'Premium Memory Foam Ear Cushions',
            'Foldable Design for Portability',
        ],
        specifications: [
            { name: 'Driver Size', value: '40mm' },
            { name: 'Frequency Response', value: '20Hz - 20kHz' },
            { name: 'Impedance', value: '32 Ohms' },
            { name: 'Battery Life', value: '40 hours' },
            { name: 'Charging Time', value: '2 hours' },
            { name: 'Weight', value: '250g' },
        ],
        supplier: suppliers.techSound,
        isNew: false,
        isFeatured: true,
        isOnSale: true,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-03-20T15:30:00Z',
    },
    {
        id: 'prod_002',
        name: 'True Wireless Earbuds Pro with Transparency Mode',
        slug: 'true-wireless-earbuds-pro',
        description: 'Compact and powerful true wireless earbuds with immersive sound quality and seamless connectivity.',
        shortDescription: 'TWS earbuds with ANC & transparency mode',
        price: 89.99,
        originalPrice: 149.99,
        currency: 'USD',
        images: [
            'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
        category: categories.audio,
        subcategory: 'Earbuds',
        brand: 'TechSound',
        sku: 'TS-TWS-002',
        stock: 320,
        minOrder: 5,
        rating: 4.6,
        reviewCount: 1523,
        soldCount: 8900,
        tags: ['earbuds', 'wireless', 'tws', 'anc'],
        features: [
            'Active Noise Cancellation',
            'Transparency Mode',
            '30 Hours Total Battery',
            'IPX5 Water Resistant',
            'Touch Controls',
        ],
        specifications: [
            { name: 'Driver Size', value: '11mm' },
            { name: 'Battery Life', value: '8h + 22h case' },
            { name: 'Charging', value: 'USB-C & Wireless' },
        ],
        supplier: suppliers.techSound,
        isNew: true,
        isFeatured: true,
        isOnSale: true,
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z',
    },
    // Electronics - Wearables
    {
        id: 'prod_003',
        name: 'Smart Watch Series 5 GPS + Cellular',
        slug: 'smart-watch-series-5-gps',
        description: 'The ultimate smartwatch with GPS, cellular connectivity, health monitoring, and premium design.',
        shortDescription: 'Premium smartwatch with GPS & health tracking',
        price: 299.99,
        originalPrice: 399.99,
        currency: 'USD',
        images: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=600&fit=crop',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
        category: categories.electronics,
        subcategory: 'Smart Watches',
        brand: 'SmartGear',
        sku: 'SG-SW5-001',
        stock: 85,
        minOrder: 1,
        rating: 4.9,
        reviewCount: 3421,
        soldCount: 15600,
        tags: ['smartwatch', 'gps', 'fitness', 'health'],
        features: [
            'Always-On AMOLED Display',
            'GPS + Cellular Connectivity',
            'Heart Rate & Blood Oxygen Monitor',
            '50m Water Resistance',
            '7-Day Battery Life',
        ],
        specifications: [
            { name: 'Display', value: '1.4" AMOLED' },
            { name: 'Resolution', value: '454 x 454 pixels' },
            { name: 'Water Resistance', value: '5 ATM' },
            { name: 'Battery', value: '7 days typical use' },
        ],
        supplier: suppliers.smartGear,
        isNew: false,
        isFeatured: true,
        isOnSale: true,
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-03-18T10:00:00Z',
    },
    // Electronics - Computers
    {
        id: 'prod_004',
        name: 'Professional Mechanical Keyboard RGB Backlit',
        slug: 'mechanical-keyboard-rgb-pro',
        description: 'Premium mechanical keyboard with customizable RGB lighting and tactile switches for the best typing experience.',
        shortDescription: 'RGB mechanical keyboard with tactile switches',
        price: 129.99,
        originalPrice: 179.99,
        currency: 'USD',
        images: [
            'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop',
        category: categories.computers,
        subcategory: 'Keyboards',
        brand: 'TechGear',
        sku: 'TG-KB-RGB-001',
        stock: 200,
        minOrder: 3,
        rating: 4.7,
        reviewCount: 892,
        soldCount: 5400,
        tags: ['keyboard', 'mechanical', 'rgb', 'gaming'],
        features: [
            'Cherry MX Blue Switches',
            'Per-Key RGB Lighting',
            'Aircraft-Grade Aluminum Frame',
            'Detachable USB-C Cable',
            'N-Key Rollover',
        ],
        specifications: [
            { name: 'Switch Type', value: 'Cherry MX Blue' },
            { name: 'Backlight', value: 'Per-key RGB' },
            { name: 'Connection', value: 'USB-C' },
            { name: 'Layout', value: 'Full Size (104 keys)' },
        ],
        supplier: suppliers.globalTech,
        isNew: false,
        isFeatured: false,
        isOnSale: true,
        createdAt: '2024-01-20T10:00:00Z',
        updatedAt: '2024-03-10T10:00:00Z',
    },
    {
        id: 'prod_005',
        name: 'USB-C Hub Adapter 7-in-1 Multiport',
        slug: 'usb-c-hub-7in1-multiport',
        description: 'Expand your laptop connectivity with this versatile 7-in-1 USB-C hub featuring HDMI, USB-A, SD card slots, and more.',
        shortDescription: '7-in-1 USB-C hub with HDMI & card reader',
        price: 45.99,
        originalPrice: 69.99,
        currency: 'USD',
        images: [
            'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=600&h=600&fit=crop',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=300&h=300&fit=crop',
        category: categories.computers,
        subcategory: 'Accessories',
        brand: 'TechGear',
        sku: 'TG-HUB-7IN1',
        stock: 450,
        minOrder: 10,
        rating: 4.5,
        reviewCount: 567,
        soldCount: 3200,
        tags: ['usb-c', 'hub', 'adapter', 'multiport'],
        features: [
            'HDMI 4K@60Hz Output',
            '3x USB-A 3.0 Ports',
            'SD & MicroSD Card Reader',
            '100W Power Delivery',
            'Compact Aluminum Design',
        ],
        specifications: [
            { name: 'Ports', value: '7 total' },
            { name: 'HDMI', value: '4K@60Hz' },
            { name: 'Power Delivery', value: '100W' },
        ],
        supplier: suppliers.globalTech,
        isNew: false,
        isFeatured: false,
        isOnSale: true,
        createdAt: '2024-02-05T10:00:00Z',
        updatedAt: '2024-03-12T10:00:00Z',
    },
    // Electronics - Cameras
    {
        id: 'prod_006',
        name: 'Professional DSLR Camera with 24-70mm Lens Kit',
        slug: 'professional-dslr-camera-kit',
        description: 'Capture stunning photos and videos with this professional-grade DSLR camera complete with versatile lens kit.',
        shortDescription: 'Pro DSLR with 24-70mm lens kit',
        price: 1299.99,
        originalPrice: 1799.99,
        currency: 'USD',
        images: [
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop',
        category: categories.electronics,
        subcategory: 'Cameras',
        brand: 'ProCapture',
        sku: 'PC-DSLR-PRO-001',
        stock: 25,
        minOrder: 1,
        rating: 4.9,
        reviewCount: 423,
        soldCount: 890,
        tags: ['camera', 'dslr', 'photography', 'professional'],
        features: [
            '45.7 Megapixel Full-Frame Sensor',
            '4K 60fps Video Recording',
            '10 FPS Continuous Shooting',
            'Dual Card Slots',
            'Weather-Sealed Body',
        ],
        specifications: [
            { name: 'Sensor', value: '45.7MP Full-Frame' },
            { name: 'ISO Range', value: '64 - 25600' },
            { name: 'Video', value: '4K 60fps' },
            { name: 'Weight', value: '915g (body only)' },
        ],
        supplier: suppliers.globalTech,
        isNew: false,
        isFeatured: true,
        isOnSale: true,
        createdAt: '2024-01-25T10:00:00Z',
        updatedAt: '2024-03-05T10:00:00Z',
    },
    // Home & Garden
    {
        id: 'prod_007',
        name: 'Modern LED Desk Lamp with Wireless Charger',
        slug: 'led-desk-lamp-wireless-charger',
        description: 'Illuminate your workspace with this sleek LED desk lamp featuring built-in wireless charging pad.',
        shortDescription: 'LED desk lamp with wireless charging',
        price: 55.99,
        originalPrice: 79.99,
        currency: 'USD',
        images: [
            'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop',
        category: categories.home,
        subcategory: 'Lighting',
        brand: 'HomeStyle',
        sku: 'HS-LAMP-LED-001',
        stock: 180,
        minOrder: 5,
        rating: 4.4,
        reviewCount: 234,
        soldCount: 1560,
        tags: ['lamp', 'desk', 'led', 'wireless-charger'],
        features: [
            '5 Brightness Levels',
            '3 Color Temperature Modes',
            '15W Wireless Charging Pad',
            'Touch Controls',
            'Memory Function',
        ],
        specifications: [
            { name: 'Power', value: '12W LED' },
            { name: 'Color Temp', value: '2700K - 6500K' },
            { name: 'Charging', value: '15W Qi Wireless' },
        ],
        supplier: suppliers.premiumHome,
        isNew: true,
        isFeatured: false,
        isOnSale: true,
        createdAt: '2024-02-15T10:00:00Z',
        updatedAt: '2024-03-18T10:00:00Z',
    },
    // Fashion
    {
        id: 'prod_008',
        name: 'Premium Leather Travel Backpack',
        slug: 'premium-leather-travel-backpack',
        description: 'Stylish and functional leather backpack perfect for travel and daily commute.',
        shortDescription: 'Genuine leather travel backpack',
        price: 159.99,
        originalPrice: 229.99,
        currency: 'USD',
        images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
        category: categories.fashion,
        subcategory: 'Bags',
        brand: 'LeatherCraft',
        sku: 'LC-BP-TRAVEL-001',
        stock: 75,
        minOrder: 2,
        rating: 4.7,
        reviewCount: 456,
        soldCount: 2340,
        tags: ['backpack', 'leather', 'travel', 'fashion'],
        features: [
            'Genuine Full-Grain Leather',
            'Laptop Compartment (15.6")',
            'Anti-Theft Hidden Pocket',
            'Water-Resistant Lining',
            'Adjustable Straps',
        ],
        specifications: [
            { name: 'Material', value: 'Full-Grain Leather' },
            { name: 'Capacity', value: '25L' },
            { name: 'Laptop', value: 'Up to 15.6"' },
            { name: 'Dimensions', value: '45 x 30 x 15 cm' },
        ],
        supplier: suppliers.fashionWorld,
        isNew: false,
        isFeatured: true,
        isOnSale: true,
        createdAt: '2024-01-18T10:00:00Z',
        updatedAt: '2024-03-08T10:00:00Z',
    },
    // More products...
    {
        id: 'prod_009',
        name: 'Portable Bluetooth Speaker Waterproof',
        slug: 'portable-bluetooth-speaker-waterproof',
        description: 'Take your music anywhere with this rugged, waterproof Bluetooth speaker with 360° sound.',
        shortDescription: 'Waterproof 360° Bluetooth speaker',
        price: 79.99,
        originalPrice: 119.99,
        currency: 'USD',
        images: [
            'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
        category: categories.audio,
        subcategory: 'Speakers',
        brand: 'SoundWave',
        sku: 'SW-SPK-BT-001',
        stock: 220,
        minOrder: 5,
        rating: 4.6,
        reviewCount: 789,
        soldCount: 4560,
        tags: ['speaker', 'bluetooth', 'waterproof', 'portable'],
        features: [
            '360° Surround Sound',
            'IP67 Waterproof Rating',
            '24 Hours Battery Life',
            'Built-in Microphone',
            'Party Mode (Connect Multiple)',
        ],
        specifications: [
            { name: 'Output', value: '30W' },
            { name: 'Battery', value: '24 hours' },
            { name: 'Waterproof', value: 'IP67' },
        ],
        supplier: suppliers.techSound,
        isNew: false,
        isFeatured: false,
        isOnSale: true,
        createdAt: '2024-02-10T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z',
    },
    {
        id: 'prod_010',
        name: 'Wireless Gaming Mouse with RGB Lighting',
        slug: 'wireless-gaming-mouse-rgb',
        description: 'High-precision wireless gaming mouse with customizable RGB lighting and ergonomic design.',
        shortDescription: 'Wireless gaming mouse with RGB',
        price: 69.99,
        originalPrice: 99.99,
        currency: 'USD',
        images: [
            'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
        category: categories.computers,
        subcategory: 'Mice',
        brand: 'GamePro',
        sku: 'GP-MOUSE-RGB-001',
        stock: 300,
        minOrder: 10,
        rating: 4.5,
        reviewCount: 623,
        soldCount: 3890,
        tags: ['mouse', 'gaming', 'wireless', 'rgb'],
        features: [
            '16000 DPI Optical Sensor',
            '2.4GHz Wireless + Bluetooth',
            '70 Hours Battery Life',
            '8 Programmable Buttons',
            'Ergonomic Right-Hand Design',
        ],
        specifications: [
            { name: 'DPI', value: '100 - 16000' },
            { name: 'Buttons', value: '8 programmable' },
            { name: 'Battery', value: '70 hours' },
        ],
        supplier: suppliers.globalTech,
        isNew: true,
        isFeatured: false,
        isOnSale: true,
        createdAt: '2024-02-20T10:00:00Z',
        updatedAt: '2024-03-18T10:00:00Z',
    },
    {
        id: 'prod_011',
        name: 'Power Bank 20000mAh Fast Charging',
        slug: 'power-bank-20000mah-fast-charge',
        description: 'Never run out of power with this high-capacity power bank featuring fast charging technology.',
        shortDescription: '20000mAh power bank with 65W PD',
        price: 49.99,
        originalPrice: 79.99,
        currency: 'USD',
        images: [
            'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=600&fit=crop',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop',
        category: categories.electronics,
        subcategory: 'Power Banks',
        brand: 'PowerMax',
        sku: 'PM-PB-20K-001',
        stock: 400,
        minOrder: 10,
        rating: 4.6,
        reviewCount: 892,
        soldCount: 6780,
        tags: ['power-bank', 'charging', 'portable', 'fast-charge'],
        features: [
            '20000mAh Capacity',
            '65W Power Delivery',
            'Charge 3 Devices Simultaneously',
            'LED Power Indicator',
            'Airline Safe',
        ],
        specifications: [
            { name: 'Capacity', value: '20000mAh' },
            { name: 'Output', value: '65W PD' },
            { name: 'Ports', value: '2 USB-C, 1 USB-A' },
        ],
        supplier: suppliers.techSound,
        isNew: false,
        isFeatured: false,
        isOnSale: true,
        createdAt: '2024-01-30T10:00:00Z',
        updatedAt: '2024-03-12T10:00:00Z',
    },
    {
        id: 'prod_012',
        name: 'Designer Sunglasses UV Protection',
        slug: 'designer-sunglasses-uv-protection',
        description: 'Stylish designer sunglasses with 100% UV protection and polarized lenses.',
        shortDescription: 'Polarized designer sunglasses',
        price: 89.99,
        originalPrice: 149.99,
        currency: 'USD',
        images: [
            'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
        category: categories.fashion,
        subcategory: 'Eyewear',
        brand: 'SunStyle',
        sku: 'SS-SG-POL-001',
        stock: 150,
        minOrder: 5,
        rating: 4.3,
        reviewCount: 234,
        soldCount: 1890,
        tags: ['sunglasses', 'fashion', 'uv-protection', 'polarized'],
        features: [
            '100% UV400 Protection',
            'Polarized Lenses',
            'Lightweight Titanium Frame',
            'Anti-Scratch Coating',
            'Includes Carrying Case',
        ],
        specifications: [
            { name: 'Lens', value: 'Polarized UV400' },
            { name: 'Frame', value: 'Titanium' },
            { name: 'Weight', value: '25g' },
        ],
        supplier: suppliers.fashionWorld,
        isNew: true,
        isFeatured: false,
        isOnSale: true,
        createdAt: '2024-02-25T10:00:00Z',
        updatedAt: '2024-03-18T10:00:00Z',
    },
];

// ==========================================
// Helper Functions
// ==========================================

export const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
    return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
    return products.filter(p => p.category.slug === categorySlug);
};

export const getFeaturedProducts = (): Product[] => {
    return products.filter(p => p.isFeatured);
};

export const getNewProducts = (): Product[] => {
    return products.filter(p => p.isNew);
};

export const getOnSaleProducts = (): Product[] => {
    return products.filter(p => p.isOnSale && p.originalPrice);
};

export const searchProducts = (query: string): Product[] => {
    const lowerQuery = query.toLowerCase();
    return products.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
        p.category.name.toLowerCase().includes(lowerQuery)
    );
};

export const filterProducts = (filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    inStock?: boolean;
    onSale?: boolean;
}): Product[] => {
    return products.filter(p => {
        if (filters.category && p.category.slug !== filters.category) return false;
        if (filters.minPrice && p.price < filters.minPrice) return false;
        if (filters.maxPrice && p.price > filters.maxPrice) return false;
        if (filters.minRating && p.rating < filters.minRating) return false;
        if (filters.inStock && p.stock <= 0) return false;
        if (filters.onSale && !p.isOnSale) return false;
        return true;
    });
};

export default products;
