import type { Metadata } from 'next';

// Base metadata for the entire site
export const siteConfig = {
    name: 'Ghar Bazaar',
    description: 'Leading B2B e-commerce marketplace connecting buyers and suppliers worldwide. Find quality products at competitive prices.',
    url: 'https://gharbazaar.com',
    ogImage: 'https://gharbazaar.com/og.jpg',
    keywords: [
        'B2B marketplace',
        'wholesale',
        'suppliers',
        'manufacturers',
        'bulk orders',
        'trade',
        'e-commerce',
        'business',
        'products',
        'global trade',
    ],
};

// Generate metadata for page
export function generatePageMetadata({
    title,
    description,
    image,
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    noIndex?: boolean;
}): Metadata {
    const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
    const pageDescription = description || siteConfig.description;
    const pageImage = image || siteConfig.ogImage;

    return {
        title: pageTitle,
        description: pageDescription,
        keywords: siteConfig.keywords,
        authors: [{ name: siteConfig.name }],
        creator: siteConfig.name,
        publisher: siteConfig.name,
        robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url: siteConfig.url,
            title: pageTitle,
            description: pageDescription,
            siteName: siteConfig.name,
            images: [
                {
                    url: pageImage,
                    width: 1200,
                    height: 630,
                    alt: pageTitle,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: pageDescription,
            images: [pageImage],
            creator: '@gharbazaar',
        },
        alternates: {
            canonical: siteConfig.url,
        },
        icons: {
            icon: '/favicon.ico',
            shortcut: '/favicon-16x16.png',
            apple: '/apple-touch-icon.png',
        },
        manifest: '/site.webmanifest',
    };
}

// Structured data for products (JSON-LD)
export function generateProductStructuredData(product: {
    name: string;
    description: string;
    image: string;
    price: number;
    currency?: string;
    rating?: number;
    reviewCount?: number;
    inStock?: boolean;
    brand?: string;
    sku?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image,
        sku: product.sku,
        brand: product.brand ? {
            '@type': 'Brand',
            name: product.brand,
        } : undefined,
        offers: {
            '@type': 'Offer',
            url: siteConfig.url,
            priceCurrency: product.currency || 'USD',
            price: product.price,
            availability: product.inStock !== false
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
        },
        aggregateRating: product.rating ? {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount || 0,
        } : undefined,
    };
}

// Structured data for organization
export const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
        'https://twitter.com/gharbazaar',
        'https://facebook.com/gharbazaar',
        'https://linkedin.com/company/gharbazaar',
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-800-123-4567',
        contactType: 'customer service',
        availableLanguage: ['English'],
    },
};

// Breadcrumb structured data
export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}
