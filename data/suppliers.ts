import { Supplier } from '@/types';

// ==========================================
// Suppliers Database
// ==========================================

export const suppliers: Supplier[] = [
    {
        id: 'sup_001',
        name: 'TechSound Electronics Co., Ltd',
        slug: 'techsound-electronics',
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
        banner: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&h=400&fit=crop',
        description: 'Leading manufacturer of premium audio equipment and electronic accessories. We specialize in wireless headphones, earbuds, and smart audio devices with a focus on quality and innovation.',
        location: {
            country: 'China',
            city: 'Shenzhen',
            flag: '🇨🇳',
        },
        rating: 4.9,
        reviewCount: 2847,
        verified: true,
        yearsInBusiness: 12,
        responseTime: '< 24h',
        categories: ['Audio', 'Electronics', 'Accessories'],
        productCount: 456,
        mainProducts: ['Wireless Headphones', 'TWS Earbuds', 'Bluetooth Speakers', 'Power Banks'],
        contact: {
            email: 'sales@techsound.com',
            phone: '+86 755 1234 5678',
            website: 'www.techsound-electronics.com',
        },
        createdAt: '2012-03-15T00:00:00Z',
    },
    {
        id: 'sup_002',
        name: 'SmartGear Industries',
        slug: 'smartgear-industries',
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
        banner: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=400&fit=crop',
        description: 'Innovation-driven company specializing in wearable technology and smart devices. Our products combine cutting-edge technology with sleek design.',
        location: {
            country: 'South Korea',
            city: 'Seoul',
            flag: '🇰🇷',
        },
        rating: 4.8,
        reviewCount: 1523,
        verified: true,
        yearsInBusiness: 8,
        responseTime: '< 12h',
        categories: ['Wearables', 'Electronics', 'Smart Devices'],
        productCount: 234,
        mainProducts: ['Smart Watches', 'Fitness Trackers', 'Smart Bands', 'Health Monitors'],
        contact: {
            email: 'contact@smartgear.kr',
            phone: '+82 2 1234 5678',
            website: 'www.smartgear-industries.kr',
        },
        createdAt: '2016-07-20T00:00:00Z',
    },
    {
        id: 'sup_003',
        name: 'Global Tech Solutions',
        slug: 'global-tech-solutions',
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
        banner: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=400&fit=crop',
        description: 'Your trusted partner for computer peripherals and tech accessories. We provide high-quality products at competitive prices with excellent customer service.',
        location: {
            country: 'Japan',
            city: 'Tokyo',
            flag: '🇯🇵',
        },
        rating: 4.7,
        reviewCount: 892,
        verified: true,
        yearsInBusiness: 15,
        responseTime: '< 24h',
        categories: ['Computers', 'Peripherals', 'Accessories'],
        productCount: 678,
        mainProducts: ['Mechanical Keyboards', 'Gaming Mice', 'USB Hubs', 'Monitors'],
        contact: {
            email: 'sales@globaltech.jp',
            phone: '+81 3 1234 5678',
            website: 'www.global-tech-solutions.jp',
        },
        createdAt: '2009-11-10T00:00:00Z',
    },
    {
        id: 'sup_004',
        name: 'Premium Home Goods Inc.',
        slug: 'premium-home-goods',
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
        banner: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&h=400&fit=crop',
        description: 'Curating premium home and lifestyle products that combine functionality with modern aesthetics. We source the best products from around the world.',
        location: {
            country: 'United States',
            city: 'Los Angeles',
            flag: '🇺🇸',
        },
        rating: 4.6,
        reviewCount: 567,
        verified: false,
        yearsInBusiness: 6,
        responseTime: '< 48h',
        categories: ['Home & Garden', 'Lighting', 'Decor'],
        productCount: 345,
        mainProducts: ['LED Lamps', 'Smart Home Devices', 'Home Decor', 'Kitchen Tools'],
        contact: {
            email: 'hello@premiumhome.com',
            phone: '+1 310 123 4567',
            website: 'www.premiumhomegoods.com',
        },
        createdAt: '2018-02-28T00:00:00Z',
    },
    {
        id: 'sup_005',
        name: 'Fashion World Trading',
        slug: 'fashion-world-trading',
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
        banner: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=400&fit=crop',
        description: 'Leading fashion and accessories supplier with a focus on quality craftsmanship and contemporary design. We work with the finest materials and artisans.',
        location: {
            country: 'Italy',
            city: 'Milan',
            flag: '🇮🇹',
        },
        rating: 4.8,
        reviewCount: 1234,
        verified: true,
        yearsInBusiness: 20,
        responseTime: '< 24h',
        categories: ['Fashion', 'Accessories', 'Leather Goods'],
        productCount: 890,
        mainProducts: ['Leather Bags', 'Wallets', 'Sunglasses', 'Watches'],
        contact: {
            email: 'info@fashionworld.it',
            phone: '+39 02 1234 5678',
            website: 'www.fashionworld-trading.it',
        },
        createdAt: '2004-05-15T00:00:00Z',
    },
    {
        id: 'sup_006',
        name: 'AutoParts Direct',
        slug: 'autoparts-direct',
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
        banner: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=400&fit=crop',
        description: 'Your one-stop shop for automotive parts and accessories. We offer OEM and aftermarket parts for all major vehicle brands.',
        location: {
            country: 'Germany',
            city: 'Munich',
            flag: '🇩🇪',
        },
        rating: 4.5,
        reviewCount: 678,
        verified: true,
        yearsInBusiness: 18,
        responseTime: '< 24h',
        categories: ['Automotive', 'Parts', 'Accessories'],
        productCount: 2345,
        mainProducts: ['Car Parts', 'Auto Accessories', 'Tools', 'Maintenance Kits'],
        contact: {
            email: 'orders@autoparts-direct.de',
            phone: '+49 89 1234 5678',
            website: 'www.autoparts-direct.de',
        },
        createdAt: '2006-09-01T00:00:00Z',
    },
    {
        id: 'sup_007',
        name: 'SportsPro Equipment',
        slug: 'sportspro-equipment',
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
        banner: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=400&fit=crop',
        description: 'Premium sports equipment and gear manufacturer. We design and produce high-performance products for athletes and fitness enthusiasts.',
        location: {
            country: 'Australia',
            city: 'Sydney',
            flag: '🇦🇺',
        },
        rating: 4.7,
        reviewCount: 456,
        verified: true,
        yearsInBusiness: 10,
        responseTime: '< 24h',
        categories: ['Sports', 'Fitness', 'Outdoor'],
        productCount: 567,
        mainProducts: ['Fitness Equipment', 'Sports Gear', 'Outdoor Equipment', 'Athletic Wear'],
        contact: {
            email: 'sales@sportspro.com.au',
            phone: '+61 2 1234 5678',
            website: 'www.sportspro-equipment.com.au',
        },
        createdAt: '2014-01-10T00:00:00Z',
    },
    {
        id: 'sup_008',
        name: 'BeautyBox Cosmetics',
        slug: 'beautybox-cosmetics',
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
        banner: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=400&fit=crop',
        description: 'Natural and organic beauty products manufacturer. We create safe, effective cosmetics using the finest natural ingredients.',
        location: {
            country: 'France',
            city: 'Paris',
            flag: '🇫🇷',
        },
        rating: 4.9,
        reviewCount: 789,
        verified: true,
        yearsInBusiness: 14,
        responseTime: '< 12h',
        categories: ['Beauty', 'Cosmetics', 'Skincare'],
        productCount: 432,
        mainProducts: ['Skincare', 'Makeup', 'Fragrances', 'Hair Care'],
        contact: {
            email: 'contact@beautybox.fr',
            phone: '+33 1 1234 5678',
            website: 'www.beautybox-cosmetics.fr',
        },
        createdAt: '2010-06-20T00:00:00Z',
    },
];

// ==========================================
// Helper Functions
// ==========================================

export const getSupplierById = (id: string): Supplier | undefined => {
    return suppliers.find(s => s.id === id);
};

export const getSupplierBySlug = (slug: string): Supplier | undefined => {
    return suppliers.find(s => s.slug === slug);
};

export const getVerifiedSuppliers = (): Supplier[] => {
    return suppliers.filter(s => s.verified);
};

export const getSuppliersByCategory = (category: string): Supplier[] => {
    return suppliers.filter(s =>
        s.categories.some(c => c.toLowerCase().includes(category.toLowerCase()))
    );
};

export const getSuppliersByCountry = (country: string): Supplier[] => {
    return suppliers.filter(s =>
        s.location.country.toLowerCase() === country.toLowerCase()
    );
};

export const searchSuppliers = (query: string): Supplier[] => {
    const lowerQuery = query.toLowerCase();
    return suppliers.filter(s =>
        s.name.toLowerCase().includes(lowerQuery) ||
        s.description.toLowerCase().includes(lowerQuery) ||
        s.categories.some(c => c.toLowerCase().includes(lowerQuery)) ||
        s.mainProducts.some(p => p.toLowerCase().includes(lowerQuery))
    );
};

export default suppliers;
