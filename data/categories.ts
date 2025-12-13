import { Category } from '@/types';

// ==========================================
// Categories Database
// ==========================================

export const categories: Category[] = [
    {
        id: 'cat_001',
        name: 'Electronics',
        slug: 'electronics',
        description: 'Latest electronic devices and gadgets from top brands',
        image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=300&fit=crop',
        icon: '📱',
        productCount: 15420,
        featured: true,
        subcategories: [
            {
                id: 'cat_001_001',
                name: 'Smartphones',
                slug: 'smartphones',
                image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop',
                productCount: 3240,
            },
            {
                id: 'cat_001_002',
                name: 'Tablets',
                slug: 'tablets',
                image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop',
                productCount: 1560,
            },
            {
                id: 'cat_001_003',
                name: 'Smart Watches',
                slug: 'smart-watches',
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
                productCount: 2180,
            },
            {
                id: 'cat_001_004',
                name: 'Cameras',
                slug: 'cameras',
                image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop',
                productCount: 1890,
            },
            {
                id: 'cat_001_005',
                name: 'Power Banks',
                slug: 'power-banks',
                image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop',
                productCount: 980,
            },
        ],
    },
    {
        id: 'cat_002',
        name: 'Audio',
        slug: 'audio',
        description: 'Premium audio equipment for every listening experience',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
        icon: '🎧',
        productCount: 8750,
        featured: true,
        subcategories: [
            {
                id: 'cat_002_001',
                name: 'Headphones',
                slug: 'headphones',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
                productCount: 3450,
            },
            {
                id: 'cat_002_002',
                name: 'Earbuds',
                slug: 'earbuds',
                image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop',
                productCount: 2890,
            },
            {
                id: 'cat_002_003',
                name: 'Speakers',
                slug: 'speakers',
                image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop',
                productCount: 1680,
            },
            {
                id: 'cat_002_004',
                name: 'Microphones',
                slug: 'microphones',
                image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=200&h=200&fit=crop',
                productCount: 730,
            },
        ],
    },
    {
        id: 'cat_003',
        name: 'Computers & Tech',
        slug: 'computers',
        description: 'Computers, laptops, and tech accessories',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
        icon: '💻',
        productCount: 12340,
        featured: true,
        subcategories: [
            {
                id: 'cat_003_001',
                name: 'Laptops',
                slug: 'laptops',
                image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop',
                productCount: 2890,
            },
            {
                id: 'cat_003_002',
                name: 'Keyboards',
                slug: 'keyboards',
                image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop',
                productCount: 1560,
            },
            {
                id: 'cat_003_003',
                name: 'Mice',
                slug: 'mice',
                image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
                productCount: 980,
            },
            {
                id: 'cat_003_004',
                name: 'Monitors',
                slug: 'monitors',
                image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop',
                productCount: 1240,
            },
            {
                id: 'cat_003_005',
                name: 'Accessories',
                slug: 'accessories',
                image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=200&h=200&fit=crop',
                productCount: 3450,
            },
        ],
    },
    {
        id: 'cat_004',
        name: 'Fashion',
        slug: 'fashion',
        description: 'Trendy clothing, accessories, and footwear',
        image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop',
        icon: '👔',
        productCount: 25680,
        featured: true,
        subcategories: [
            {
                id: 'cat_004_001',
                name: 'Men\'s Clothing',
                slug: 'mens-clothing',
                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
                productCount: 8900,
            },
            {
                id: 'cat_004_002',
                name: 'Women\'s Clothing',
                slug: 'womens-clothing',
                image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=200&fit=crop',
                productCount: 9560,
            },
            {
                id: 'cat_004_003',
                name: 'Bags',
                slug: 'bags',
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
                productCount: 3450,
            },
            {
                id: 'cat_004_004',
                name: 'Eyewear',
                slug: 'eyewear',
                image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop',
                productCount: 1890,
            },
            {
                id: 'cat_004_005',
                name: 'Shoes',
                slug: 'shoes',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
                productCount: 4560,
            },
        ],
    },
    {
        id: 'cat_005',
        name: 'Home & Garden',
        slug: 'home-garden',
        description: 'Everything for your home, indoors and outdoors',
        image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop',
        icon: '🏠',
        productCount: 18920,
        featured: true,
        subcategories: [
            {
                id: 'cat_005_001',
                name: 'Furniture',
                slug: 'furniture',
                image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
                productCount: 5670,
            },
            {
                id: 'cat_005_002',
                name: 'Lighting',
                slug: 'lighting',
                image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=200&fit=crop',
                productCount: 2340,
            },
            {
                id: 'cat_005_003',
                name: 'Kitchen',
                slug: 'kitchen',
                image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop',
                productCount: 4560,
            },
            {
                id: 'cat_005_004',
                name: 'Garden',
                slug: 'garden',
                image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop',
                productCount: 3120,
            },
        ],
    },
    {
        id: 'cat_006',
        name: 'Sports & Outdoor',
        slug: 'sports',
        description: 'Equipment and gear for sports and outdoor activities',
        image: 'https://images.unsplash.com/photo-1461896836934- voices?w=400&h=300&fit=crop',
        icon: '⚽',
        productCount: 9870,
        featured: false,
        subcategories: [
            {
                id: 'cat_006_001',
                name: 'Fitness',
                slug: 'fitness',
                image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=200&fit=crop',
                productCount: 3450,
            },
            {
                id: 'cat_006_002',
                name: 'Cycling',
                slug: 'cycling',
                image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=200&h=200&fit=crop',
                productCount: 1890,
            },
            {
                id: 'cat_006_003',
                name: 'Camping',
                slug: 'camping',
                image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=200&h=200&fit=crop',
                productCount: 2340,
            },
        ],
    },
    {
        id: 'cat_007',
        name: 'Automotive',
        slug: 'automotive',
        description: 'Parts, accessories, and tools for vehicles',
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop',
        icon: '🚗',
        productCount: 7650,
        featured: false,
    },
    {
        id: 'cat_008',
        name: 'Beauty & Health',
        slug: 'beauty-health',
        description: 'Beauty products and health essentials',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
        icon: '💄',
        productCount: 14320,
        featured: false,
    },
];

// ==========================================
// Helper Functions
// ==========================================

export const getCategoryById = (id: string): Category | undefined => {
    return categories.find(c => c.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
    // Check main categories
    const mainCat = categories.find(c => c.slug === slug);
    if (mainCat) return mainCat;

    // Check subcategories
    for (const cat of categories) {
        if (cat.subcategories) {
            const subCat = cat.subcategories.find(sc => sc.slug === slug);
            if (subCat) return subCat;
        }
    }
    return undefined;
};

export const getFeaturedCategories = (): Category[] => {
    return categories.filter(c => c.featured);
};

export const getAllSubcategories = (categoryId: string): Category[] => {
    const category = getCategoryById(categoryId);
    return category?.subcategories || [];
};

export default categories;
